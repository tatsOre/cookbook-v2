import React from 'react'
import Link from 'next/link'
import { CardInfo } from './CardElements'
import { DeleteRecipe, PublishRecipe } from './Actions'
import { getRecipeDate } from '../RecipeView/RecipeView.helpers'
import cx from '../utils/cx'

import styles from './Card.module.scss'

function RecipeCard({ recipe, onPublish, onDelete }) {
    const { _id: id, createdAt, updatedAt } = recipe

    const date = getRecipeDate(createdAt, updatedAt)

    return (
        <article className={styles.recipe__card}>
            <Link
                href={`/edit/${id}`}
                className={cx([styles['card__controls--edit'], styles.card__badge])}>
                Edit
            </Link>

            <Link href={`/recipes/${id}`}>
                <CardInfo data={recipe}>
                    {date && <span>{date}</span>}
                </CardInfo>
            </Link>

            <div className={styles['card__controls--box']}>
                <PublishRecipe recipe={recipe} onPublish={onPublish} />
                <DeleteRecipe recipe={recipe} onDelete={onDelete} />
            </div>
        </article>
    )
}

export default RecipeCard
