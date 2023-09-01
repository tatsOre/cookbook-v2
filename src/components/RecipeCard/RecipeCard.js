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

export const DeleteRecipe = ({ id, title }) => {
    const [showModal, setShowModal] = React.useState(false)
    const { mutate } = useUser()

    const handleDeleteClick = async () => {
        console.log('Delete...')
        //mutate()
        /**
                const response = await fetch(`${PATHS.RECIPES_ENDPOINT}/${id}`,
                    { method: 'DELETE' }
                )
        
                if (response.ok) {
                    //console.log(await response.json())
                    
                } else {
                    console.log('something happened')
                }
         */
    }

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
            handleDeleteClick()
        }
    }

    return (
        <>
            {showModal && <Modal {...modalProps} />}
            <UnstyledButton onClick={() => setShowModal(true)}>
                <span>Delete</span>
            </UnstyledButton>
        </>
    )
}

function RecipeCard({ recipe, onPublish }) {
    const { _id: id, title, public: isPublic } = recipe

    const {
        data, error, isMutating, trigger
    } = useSWRMutation(`${PATHS.RECIPES.PUBLISH}/${id}`)

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

            <div className={styles['card__controls--box']}>
                <UnstyledButton onClick={onPublishClick} disabled={isMutating}>
                    {isMutating
                        ? <IconLoader size={20} />
                        : <span>Make {isPublic ? 'Private' : 'Public'}</span>}
                </UnstyledButton>

                <DeleteRecipe id={id} title={title} />
            </div>
        </article>
    )
}

export default RecipeCard
