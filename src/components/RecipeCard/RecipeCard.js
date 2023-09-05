import React from 'react'
import Link from 'next/link'
import useSWRMutation from 'swr/mutation'
import useUser from '@/lib/useUser'
import { IconLoader } from '../Icon'
import Modal from '../Modal'
import { RecipeCardInfo } from './RecipeCardElements'
import UnstyledButton from '../Button/UnstyledButton'
import cx from '../utils/cx'
import { default as PATHS } from '../../../config'

import styles from './RecipeCard.module.scss'
import { fetcher } from '@/pages/_app'

export const DeleteRecipe = ({ id, title, onDelete }) => {
    const [showModal, setShowModal] = React.useState(false)

    const DELETE_URL = PATHS.RECIPES_ENDPOINT + '/' + id

    const {
        data, error, isMutating, trigger
    } = useSWRMutation(DELETE_URL, () => fetcher(DELETE_URL, { method: 'DELETE' }))

    React.useEffect(() => {
        if (data && !error) console.log('Hola', data)
        if (data && !error) onDelete(id)
    }, [data, error])

    const onDeleteClick = () => trigger()

    const modalProps = {
        heading: 'Are you sure?',
        children: (
            <p>
                Deleting <i>{title}</i> means that you will{' '}
                <strong>permanently lose</strong> the data about this recipe.
            </p>
        ),
        onCancel: () => setShowModal(false),
        onConfirm: () => {
            setShowModal(false)
            onDeleteClick()
        }
    }
    // TODO: should the modal go at the grid level?
    return (
        <React.Fragment>
            {showModal && <Modal {...modalProps} />}

            <UnstyledButton onClick={() => setShowModal(true)} disabled={isMutating}>
                {isMutating ? <IconLoader size={20} /> : <span>Delete</span>}
            </UnstyledButton>
        </React.Fragment>
    )
}

function RecipeCard({ recipe, onPublish, onDelete }) {
    const { _id: id, title, public: isPublic } = recipe

    const PUBLISH_URL = PATHS.RECIPES.PUBLISH + id

    const {
        data, error, isMutating, trigger
    } = useSWRMutation(PUBLISH_URL, () => fetcher(PUBLISH_URL, { method: 'PATCH' }))

    React.useEffect(() => {
        data && onPublish(data.doc, data.public)
    }, [data])

    const onPublishClick = () => trigger()

    const EditRecipe = () => {
        const classes = cx([styles['card__controls--edit'], styles.card__badge])
        return <Link href={`/edit/${id}`} className={classes}>Edit</Link>
    }

    return (
        <article className={styles.recipe__card}>
            <EditRecipe />

            <Link href={`/recipes/${id}`}>
                <RecipeCardInfo recipe={recipe} />
            </Link>

            {error ? <p style={{ color: "red" }}>{error.message}</p> : null}

            <div className={styles['card__controls--box']}>
                <UnstyledButton onClick={onPublishClick} disabled={isMutating}>
                    {isMutating
                        ? <IconLoader size={20} />
                        : <span>Make {isPublic ? 'Private' : 'Public'}</span>}
                </UnstyledButton>

                <DeleteRecipe id={id} title={title} onDelete={onDelete} />
            </div>
        </article>
    )
}

export default RecipeCard
