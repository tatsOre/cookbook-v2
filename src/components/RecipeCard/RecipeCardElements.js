import Image from 'next/image'
import { getRandomCardPattern } from "./utils"
import cx from '../utils/cx'

import styles from './RecipeCard.module.scss'

function RecipeCardTag({ recipe }) {
    if (!recipe.categories && !recipe.cuisine) return

    const badge = recipe.categories.length
        ? recipe.categories[0].label
        : recipe.cuisine?.label ? recipe.cuisine.label : null

    const classes = cx([styles.card__tag, styles.card__badge])

    return badge ? <div className={classes}>{badge}</div> : null
}


function RecipeCardPhoto({ recipe }) {
    const src = recipe.photo || getRandomCardPattern()
    const alt = recipe.photo ? `${recipe.title} dish picture` : 'pattern'
    return (
        <Image fill src={src} alt={alt} sizes='400px' />
    )
}

export { RecipeCardPhoto, RecipeCardTag }
