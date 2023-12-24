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

  const tempLinkClasses = "text-xs font-semibold tracking-wider justify-center items-center gap-2 border transition-all inline-flex bg-neutral-700 border-neutral-700 text-white px-3.5 h-8 sm:h-7"

  return (
    <article className={clsx(styles.card, styles.recipe__card)}>
      <div className='flex-1'>
        <Link href={`/recipes/${id}`}>
          <CardInfo data={recipe}>
            {date && <span data-info="date">Last updated: {date}</span>}
          </CardInfo>
        </Link>
      </div>

      <div className='flex flex-wrap gap-1.5 p-1.5'>
        <PublishRecipe recipe={recipe} onPublish={onPublish} />

        <Link href={`/edit/${id}`} className={tempLinkClasses}>
          Edit
        </Link>

        <DeleteRecipe recipe={recipe} onDelete={onDelete} />
      </div>
    </article>
  )
}

export default RecipeCard
