import React from 'react'
import Link from 'next/link'
import useSWRMutation from 'swr/mutation'
import { RecipeCardInfo, RecipeCardTag } from './RecipeCardElements'
import { IconBookmark } from '../Icon'
import UnstyledButton from '../Button/UnstyledButton'

import { default as PATHS } from '../../../config'

import styles from './RecipeCard.module.scss'

async function updateUser(url) {
    const response = await window.fetch(url, {
        method: 'PATCH',
        credentials: 'include'
    })
    if (!response.ok) {
        const error = new Error('An error occurred. Please try again later.')
        error.info = await response.json()
        error.status = response.status
        throw error
    }

    return response.json()
}


function FavoriteCard({ recipe, onUpdateFavorites }) {
    const { data, error, trigger } = useSWRMutation(
        PATHS.USER.UPDATE_FAVORITES + recipe._id, updateUser
    )

    React.useEffect(() => {
        data && onUpdateFavorites(recipe._id)
    }, [data])

    const onUpdateFavoritesClick = () => trigger()

    return (
        <article className={styles.recipe__card}>
            <RecipeCardTag recipe={recipe} />

            <Link href={`/recipes/${recipe._id}`}>
                <RecipeCardInfo recipe={recipe} />
            </Link>

            <div className={styles['card__controls--base']}>
                <UnstyledButton
                    aria-checked="true"
                    ariaLabel="Delete from your favorites"
                    role="switch"
                    className={styles['card__control--bookmark']}
                    onClick={onUpdateFavoritesClick}
                >
                    <IconBookmark />
                </UnstyledButton>
            </div>
        </article>
    )
}

export default FavoriteCard
