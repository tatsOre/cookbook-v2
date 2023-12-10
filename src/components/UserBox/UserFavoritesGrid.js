import React from 'react'
import LoaderOverlay from '../Loader/LoaderOverlay'
import FavoriteCard from '../Card/FavoriteCard'
import { getRandomCardPattern } from '../Card/Card.helpers'
import { default as PATHS } from '../../../config'

import styles from './UserBox.module.scss'

/**
 * This structure applies for User Favs.
 * I decided to remove swr because it was only being used once. 
 * TODO: client service to reduce boilerplate
 */
function UserFavoritesGrid() {
  const [favorites, setFavorites] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState(null)

  React.useEffect(() => {
    const getUserFavorites = async () => {
      setIsLoading(true)
      setError(null)

      const response = await window.fetch(PATHS.USER.GET_FAVORITES, {
        credentials: "include"
      })

      if (response.ok) {
        const data = await response.json()
        setFavorites(data.docs)

        setIsLoading(false)
      } else {
        setError("Failed to load your data")
        setIsLoading(false)
      }

    }
    getUserFavorites()
  }, [])

  if (error) return <p>Failed to load your data</p>

  if (isLoading) return <LoaderOverlay />

  /** Removing from favs */
  const onUpdateFavorites = (id) => {
    const updated = favorites.filter(rec => rec._id !== id)
    setFavorites(updated)
  }

  const content = favorites.map((item) => {
    if (!item.photo?.url) {
      item.photo = { url: getRandomCardPattern() }
    }

    return <FavoriteCard
      key={item._id}
      recipe={item}
      onUpdateFavorites={onUpdateFavorites}
    />
  })

  const fallback = (
    <div className={styles['user__box---fallback']}>
      <p>
        Looks like you haven&apos;t saved anything yet! If you like a recipe,
        simply tap on the bookmark icon to save it for later.
      </p>
    </div>
  )

  return (
    <section data-section="favorites" className={styles.cards__section}>
      {content?.length ? <>
        <h2>Saved Recipes:</h2>
        {content}
      </> : fallback}
    </section>
  )
}

export default UserFavoritesGrid
