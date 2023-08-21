import React from 'react'
import { useRouter } from 'next/router'
import Modal from '../Modal'
import Bookmark from '../Icon/icons/icon-bookmark-filled'
import UnstyledButton from '../Button/UnstyledButton'

import styles from './RecipeCard.module.scss'
import cx from '../utils/cx'

export const BookmarkRecipe = ({ id }) => {
    const handleBookmarkClick = () => {
        console.log('Saved!', id)
    }
    return (
        <UnstyledButton
            aria-checked="true"
            ariaLabel="Save"
            role="switch"
            className={styles['card__control--bookmark']}
            onClick={handleBookmarkClick}
        >
            <Bookmark size={24} />
        </UnstyledButton>
    )
}


export const DeleteRecipe = ({ id, title }) => {
    const [showModal, setShowModal] = React.useState(false)
    const router = useRouter()


    const handleDeleteClick = async () => {
        router.replace(router.asPath);

        // send uri from API
        /**
                const response = await fetch(`${PATHS.RECIPES_ENDPOINT}/${id}`,
                    { method: 'DELETE' }
                )
        
                if (response.ok) {
                    //console.log(await response.json())
                    router.replace(router.asPath);
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
            <UnstyledButton
                onClick={() => setShowModal(true)}
                className={''}
            >
                <span>Delete</span>
            </UnstyledButton>
        </>
    )
}

export const EditRecipe = ({ id }) => {
    return (
        <UnstyledButton
            className={
                cx([styles['card__controls--edit'], styles.card__badge])
            }
        >
            Edit
        </UnstyledButton>
    )
}

export const PublishRecipe = ({ id, isPublic }) => {
    return (
        <UnstyledButton><span>Make {isPublic ? 'Private' : 'Public'}</span></UnstyledButton>
    )
}
