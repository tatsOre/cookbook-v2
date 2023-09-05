import React from 'react'
import Link from 'next/link'
import useSWRMutation from 'swr/mutation'
import { fetcher } from '@/pages/_app'
import { RecipeCardInfo, RecipeCardTag } from './RecipeCardElements'
import { IconBookmark } from '../Icon'
import UnstyledButton from '../Button/UnstyledButton'

import { default as PATHS } from '../../../config'

import styles from './RecipeCard.module.scss'

function FavoriteCard({ recipe, onUpdateFavorites }) {
    const UPDATE_FAV_URL = PATHS.USER.UPDATE_FAVORITES + recipe._id

    const {
        data, error, isMutating, trigger
    } = useSWRMutation(
        UPDATE_FAV_URL, () => fetcher(UPDATE_FAV_URL, { method: 'PATCH' })
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
                    disabled={isMutating}
                >
                    <IconBookmark />
                </UnstyledButton>
            </div>
        </article>
    )
}

export default FavoriteCard
