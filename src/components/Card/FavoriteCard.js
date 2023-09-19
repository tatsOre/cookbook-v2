import React from 'react'
import Link from 'next/link'
import { BookmarkRecipe } from './Actions'
import { CardInfo, CardTag } from './CardElements'

import styles from './CardB.module.scss'

function FavoriteCard({ recipe, onUpdateFavorites }) {
    return (
        <article className={styles.recipe__card}>
            <CardTag data={recipe} />

            <Link href={`/recipes/${recipe._id}`}>
                <CardInfo data={recipe}>
                    <span>By: {recipe.author?.name}</span>
                </CardInfo>
            </Link>

            <div className={styles['card__controls--base']}>
                <BookmarkRecipe
                    className={styles['card__control--bookmark']}
                    recipe={recipe}
                    onUpdateFavorites={onUpdateFavorites}
                />
            </div>
        </article>
    )
}

export default FavoriteCard
