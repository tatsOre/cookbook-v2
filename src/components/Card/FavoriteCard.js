import React from 'react'
import Link from 'next/link'
import clsx from 'clsx'
import { BookmarkRecipe } from './Actions'
import { CardInfo, CardTag } from './CardElements'

import styles from './Card.module.scss'

function FavoriteCard({ recipe, onUpdateFavorites }) {
  return (
    <article className={clsx(styles.card, styles.favorite__card)}>
      <CardTag data={recipe} />

      <Link href={`/recipes/${recipe._id}`}>
        <CardInfo data={recipe}>
          <span data-info="author">By: {recipe.author?.name}</span>
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
