import React from 'react'
import Image from 'next/image'
import cx from '../utils/cx'

import styles from './Card.module.scss'

function CardTag({ data: { categories, cuisine } }) {
    if (!categories && !cuisine) return

    const badge = categories.length
        ? categories[0].label
        : cuisine?.label ? cuisine.label : null

    const classes = cx([styles.card__tag, styles.card__badge])

    return badge ? <div className={classes}>{badge}</div> : null
}

function CardInfo({ data: { photo, title }, children }) {
    return (
        <>
            <div className={styles['card__image--wrapper']}>
                <Image fill src={photo} alt={title} sizes='400px' />
            </div>
            <div className={styles['card__info--wrapper']}>
                <h3>{title}</h3>
                {children}
            </div>
        </>
    )
}

export { CardInfo, CardTag }
