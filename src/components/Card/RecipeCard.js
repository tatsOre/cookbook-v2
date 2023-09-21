import React from 'react'
import Link from 'next/link'
import { CardInfo } from './CardElements'
import { DeleteRecipe, PublishRecipe } from './Actions'
import { IconEdit } from '../Icon'
import { getRecipeDate } from '../RecipeView/RecipeView.helpers'
import cx from '../utils/cx'

import styles from './Card.module.scss'

function RecipeCard({ recipe, onPublish, onDelete }) {
    const { _id: id, createdAt, updatedAt } = recipe

    const date = getRecipeDate(createdAt, updatedAt)

    return (
        <article className={cx([styles.card, styles.recipe__card])}>
            <div className={styles['card__controls--box']}>
                <PublishRecipe recipe={recipe} onPublish={onPublish} />

                <Link href={`/edit/${id}`} data-action="edit">
                    <IconEdit strokeWidth={1.5} />
                </Link>

                <DeleteRecipe recipe={recipe} onDelete={onDelete} />
            </div>

            <Link href={`/recipes/${id}`}>
                <CardInfo data={recipe}>
                    {date && <span data-info="date">{date}</span>}
                </CardInfo>
            </Link>
        </article>
    )
}

export default RecipeCard
