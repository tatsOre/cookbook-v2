import React from 'react'
import useSWR from 'swr'
import LoaderOverlay from '../Loader/LoaderOverlay'
import FavoriteCard from '../RecipeCard/FavoriteCard'
import { getRandomCardPattern } from '../RecipeCard/utils'

import { default as PATHS } from '../../../config'

function UserFavoritesGrid() {
    const { data, error, isLoading } = useSWR(PATHS.USER.FAVORITES)

    if (error) return <p>Failed to load your data</p>

    if (isLoading) return <LoaderOverlay />

    const recipes = data.docs && data.docs.map((item) => {
        if (!item.photo) {
            item.photo = getRandomCardPattern()
        }
        return <FavoriteCard key={item._id} recipe={item} />
    })

    const fallback = (
        <div>
            <p style={{ fontSize: '1rem', fontWeight: 'bold'}}>
                Looks like you haven't saved anything yet! If you like a recipe,
                simply tap on the bookmark icon to save it for later.
            </p>
        </div>
    )

    return recipes.length && !isLoading ? recipes : fallback
}

export default UserFavoritesGrid
