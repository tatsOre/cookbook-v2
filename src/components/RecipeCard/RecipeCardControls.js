import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Modal from '../Modal'
import { IconBookmark, IconBookmarkFilled } from '../Icon'
import UnstyledButton from '../Button/UnstyledButton'
import cx from '../utils/cx'
import { default as PATHS } from '../../../config'

import styles from './RecipeCard.module.scss'

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
            <IconBookmark />
            <IconBookmarkFilled />
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
    const classes = cx([styles['card__controls--edit'], styles.card__badge])
    return (
        <Link href={`/edit/${id}`} className={classes}>Edit</Link>
    )
}

export const PublishRecipe = ({ id, isPublic }) => {
    const [published, setPublished] = React.useState(isPublic)
    const [loading, setLoading] = React.useState(false)

    const handlePrivacyClick = async () => {
        setLoading(true)
        const url = `${PATHS.RECIPES.PUBLISH}/${id}`
        const response = await fetch(url)

        if (response.ok) {
            const result = await response.json()
            setPublished(result.data.public)
            setLoading(false)
        } else {
            // setAlert('Ups')
            setLoading(false)
            console.log('something happened')
        }
    }

    return (
        <UnstyledButton onClick={handlePrivacyClick} disabled={loading}>
            <span>Make {published ? 'Private' : 'Public'}</span>
        </UnstyledButton>
    )
}
