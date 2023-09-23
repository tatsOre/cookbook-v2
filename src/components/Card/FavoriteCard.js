import React from 'react'
import Link from 'next/link'
import { BookmarkRecipe } from './Actions'
import { CardInfo, CardTag } from './CardElements'
import cx from '../utils/cx'

import styles from './Card.module.scss'

function FavoriteCard({ recipe, onUpdateFavorites }) {
    return (
        <article className={cx([styles.card, styles.favorite__card])}>
            <CardTag data={recipe} />

            <Link href={`/recipes/${recipe._id}`}>
                <CardInfo data={recipe}>
                    <span>By: {recipe.author?.name}</span>
                </CardInfo>
            </Link>

            <BookmarkRecipe
                recipe={recipe}
                onUpdateFavorites={onUpdateFavorites}
            />
        </article>
    )
}

export default FavoriteCard
