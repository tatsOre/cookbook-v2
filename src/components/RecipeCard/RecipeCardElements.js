import Image from 'next/image'
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

function RecipeCardInfo({ recipe }) {
    const { photo, title, author } = recipe
    return (
        <>
            <div className={styles['card__image--wrapper']}>
                <Image fill src={photo} alt={title + ' picture'} sizes='400px' />
            </div>
            <div className={styles['card__info--wrapper']}>
                <h3>{title}</h3>
                <span>By: {author?.name || author?._id || 'No author'}</span>
            </div>
        </>
    )
}

export { RecipeCardInfo, RecipeCardTag }
