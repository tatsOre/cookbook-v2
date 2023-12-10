import React from 'react'
import Image from 'next/image'
import clsx from 'clsx'

import styles from './Card.module.scss'

function CardTag({ data: { categories, cuisine } }) {
  if (!categories && !cuisine) return

  const badge = categories.length
    ? categories[0].label
    : cuisine?.label ? cuisine.label : null

  const classes = clsx(
    styles.card__tag, styles.card__badge
  )

  return badge ? <div className={classes}>{badge}</div> : null
}

function CardInfo({ data: { photo, title }, children }) {
  return (
    <>
      <div className={styles['card__image--wrapper']}>
        <Image fill src={photo.url} alt={title} sizes='400px' />
      </div>
      <div className={styles['card__info--wrapper']}>
        <h3>{title}</h3>
        {children}
      </div>
    </>
  )
}

export { CardInfo, CardTag }
