import React from 'react'
import Link from 'next/link'
import { CardInfo } from './CardElements'
import { DeleteRecipe, PublishRecipe } from './Actions'
import { getRecipeDate } from '../RecipeView/RecipeView.helpers'
import cx from '../utils/cx'

import styles from './Card.module.scss'
import { IconEdit, IconTrash } from '../Icon'

function RecipeCard({ recipe, onPublish, onDelete }) {
    const { _id: id, createdAt, updatedAt } = recipe

    const date = getRecipeDate(createdAt, updatedAt)

    return (
        <article className={styles.recipe__card}>
            <div className={styles['card__controls--box']}>
                <Link
                    href={`/edit/${id}`}
                    className={cx([styles['card__controls--edit'], styles.card__badge])}>
                    <IconEdit strokeWidth={1.5} />
                </Link>

                <DeleteRecipe recipe={recipe} onDelete={onDelete} />
            </div>

            <Link href={`/recipes/${id}`}>
                <CardInfo data={recipe}>
                    {date && <span data-info="date">{date}</span>}
                </CardInfo>
            </Link>

            <PublishRecipe recipe={recipe} onPublish={onPublish} />
        </article>
    )
}

export default RecipeCard
