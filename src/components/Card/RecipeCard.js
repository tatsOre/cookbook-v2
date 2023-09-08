import React from 'react'
import Link from 'next/link'
import { format, isAfter } from 'date-fns'
import { CardInfo } from './CardElements'
import { DeleteRecipe, PublishRecipe } from './Actions'
import cx from '../utils/cx'

import styles from './Card.module.scss'

function RecipeCard({ recipe, onPublish, onDelete }) {
    const { _id: id, createdAt, updatedAt } = recipe
/* 
    const created = new Date(createdAt)
    const updated = new Date(updatedAt)

    const isUpdateAfter = isAfter(updated, created)

    const date = isUpdateAfter
        ? `Updated ${format(updated, "PPP")}`
        : `Published ${format(created, "PPP")}` */

    return (
        <article className={styles.recipe__card}>
            <Link
                href={`/edit/${id}`}
                className={cx([styles['card__controls--edit'], styles.card__badge])}>
                Edit
            </Link>

            <Link href={`/recipes/${id}`}>
                <CardInfo data={recipe}>
                    <span>Updated Dec 7 2023</span>
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
