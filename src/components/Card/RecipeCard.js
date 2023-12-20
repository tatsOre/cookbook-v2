import React from 'react'
import Link from 'next/link'
import clsx from 'clsx'
import { CardInfo } from './CardElements'
import { DeleteRecipe, PublishRecipe } from './Actions'
import { IconEdit } from '../Icon'
import { getRecipeDate } from '../../utils/recipe-format'

import styles from './Card.module.scss'

function RecipeCard({ recipe, onPublish, onDelete }) {
  const { _id: id, createdAt, updatedAt } = recipe

  const date = getRecipeDate(createdAt, updatedAt)

  return (
    <article className={clsx(styles.card, styles.recipe__card)}>
      <Link href={`/recipes/${id}`}>
        <CardInfo data={recipe}>
          {date && <span data-info="date">{date}</span>}
        </CardInfo>
      </Link>

      <div className={styles['card__controls--box']}>
        <Link href={`/edit/${id}`} data-action="edit">
          <IconEdit size={20} strokeWidth={1.5} />
        </Link>
        <DeleteRecipe recipe={recipe} onDelete={onDelete} />
      </div>

      <PublishRecipe recipe={recipe} onPublish={onPublish} />
    </article>
  )
}

export default RecipeCard
