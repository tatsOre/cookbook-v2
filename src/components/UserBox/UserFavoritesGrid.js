import React from 'react'
import useSWR, { mutate } from 'swr'
import LoaderOverlay from '../Loader/LoaderOverlay'
import FavoriteCard from '../RecipeCard/FavoriteCard'

import { default as PATHS } from '../../../config'

function UserFavoritesGrid({ mutateUser }) {
    const [favorites, setFavorites] = React.useState([])

    const { data, error, isLoading } = useSWR(PATHS.USER.GET_FAVORITES)

    React.useEffect(() => {
        data && setFavorites(data.docs)
    }), [data]

    if (error) return <p>Failed to load your data</p>

    if (isLoading) return <LoaderOverlay />

    /** Removing from favs */
    const onUpdateFavorites = (id) => {
        const updated = favorites.filter(rec => rec._id !== id)
        setFavorites(updated)
        //  Used global mutate because the bound one is not working as desired
        mutate(PATHS.USER.GET_FAVORITES, null, {
            optimisticData: { docs: updated },
            revalidate: false
        })
        /* Update NavBar: */
        mutateUser()
    }

    const content = favorites.map((item) => (
        <FavoriteCard
            key={item._id}
            recipe={item}
            onUpdateFavorites={onUpdateFavorites}
        />
    ))

    const fallback = (
        <div>
            <p style={{ fontWeight: 'bold' }}>
                Looks like you haven't saved anything yet! If you like a recipe,
                simply tap on the bookmark icon to save it for later.
            </p>
        </div>
    )

    return content.length && !isLoading ? content : fallback
}

export default UserFavoritesGrid
