import React from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import Modal from '../Modal'
import Bookmark from '../Icon/icons/icon-bookmark-filled'
import UnstyledButton from '../Button/UnstyledButton'
import { default as PATHS } from '../../../config'

import styles from './RecipeCard.module.scss'
import cx from '../utils/cx'
import RecipeCardPhoto from './RecipeCardPhoto'

export const RecipeCardInfo = ({ recipe }) => {
    return (
        <>
            <div className={styles['card__image--wrapper']}>
                <RecipeCardPhoto recipe={recipe} />
            </div>
            <div className={styles['card__info--wrapper']}>
                <h3>{recipe.title}</h3>
                <span>By: Lipa Echeverry</span>
            </div>
        </>
    )
}

export const RecipeCardTag = ({ recipe }) => {
    {/** badge will be a link to recipes to tag/{:badge} */ }
    const badge = recipe.categories.length
        ? recipe.categories[0].label
        : recipe.cuisine.label ? recipe.cuisine.label : null

    const classes = cx([styles.card__tag, styles.card__badge])

    return badge ? <div className={classes}>{badge}</div> : null
}

function BookmarkRecipe({ id }) {
    const handleBookmarkClick = () => {
        console.log('Saved!', id)
    }
    return (
        <UnstyledButton
            aria-checked="true"
            ariaLabel="Save"
            role="switch"
            className={styles['card__control--bookmark']}
            onClick={handleBookmarkClick}
        >
            <Bookmark size={24} />
        </UnstyledButton>
    )
}

function RecipeCardBase({ recipe }) {
    return (
        <article className={styles.recipe__card}>
            <RecipeCardTag recipe={recipe} />

            <Link href={`/recipes/${recipe._id}`}>
                <RecipeCardInfo recipe={recipe} />
            </Link>

            <div className={styles['card__controls--base']}>
                <BookmarkRecipe id={recipe._id} />
            </div>
        </article>
    )
}

export default RecipeCardBase
