import React from 'react'
import Link from 'next/link'
import useSWRMutation from 'swr/mutation'
import { RecipeCardInfo, RecipeCardTag } from './RecipeCardElements'
import { IconBookmark } from '../Icon'
import UnstyledButton from '../Button/UnstyledButton'

import { default as PATHS } from '../../../config'

import styles from './RecipeCard.module.scss'

function FavoriteCard({ recipe }) {
    const { _id: id } = recipe

    const { data, error, trigger } = useSWRMutation('')

    return (
        <article className={styles.recipe__card}>
            <RecipeCardTag recipe={recipe} />

            <Link href={`/recipes/${id}`}>
                <RecipeCardInfo recipe={recipe} />
            </Link>

            <div className={styles['card__controls--base']}>
                <UnstyledButton
                    aria-checked="true"
                    ariaLabel="Delete from your favorites"
                    role="switch"
                    className={styles['card__control--bookmark']}
                    onClick={() => console.log('triggered')}
                >
                    <IconBookmark />
                </UnstyledButton>
            </div>
        </article>
    )
}

export default FavoriteCard
