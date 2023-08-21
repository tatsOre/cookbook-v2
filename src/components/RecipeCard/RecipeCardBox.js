import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Button from '../Button'
import { RecipeCardInfo } from './RecipeCardBase'
import Modal from '../Modal'
import { default as PATHS } from '../../../config'

import styles from './RecipeCard.module.scss'
import UnstyledButton from '../Button/UnstyledButton'
import cx from '../utils/cx'

const DeleteRecipe = ({ id, title }) => {
    const [showModal, setShowModal] = React.useState(false)

    const handleDeleteClick = async () => {
        // send uri from API
        const response = await fetch(`${PATHS.RECIPES_ENDPOINT}/${id}`,
            { method: 'DELETE' }
        )

        if (response.ok) {
            //console.log(await response.json())
            router.replace(router.asPath);
        } else {
            console.log('something happened')
        }
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
            //handleDeleteClick()
        }
    }

    return (
        <>
            {showModal && <Modal {...modalProps} />}
            <UnstyledButton
                onClick={() => setShowModal(true)}
                className={cx([styles.card__badge])}
            >
                Delete
            </UnstyledButton>
        </>
    )
}

const PublishRecipe = () => {
    return (
        <UnstyledButton className={cx([styles.card__badge])}>Make Public</UnstyledButton>
    )
}

function RecipeCardBox({ recipe }) {
    return (
        <article className={styles.recipe__card}>
            <UnstyledButton className={cx([styles.card__edit, styles.card__badge])}>
                Edit &#9998;
            </UnstyledButton>
            <Link href={`/recipes/${recipe._id}`}>
                <RecipeCardInfo recipe={recipe} />
            </Link>
            <div className={styles['card__controls--box']}>
                <PublishRecipe id={recipe._id} />
                <DeleteRecipe id={recipe._id} title={recipe.title} />
            </div>
        </article>
    )
}

export default RecipeCardBox
