import React from 'react'
import Link from 'next/link'
import useSWR from 'swr'
import LoaderOverlay from '../Loader/LoaderOverlay'
import RecipeCard from '@/components/RecipeCard/RecipeCardBase'

import { default as PATHS } from '../../../config'
import { getRandomCardPattern } from '../RecipeCard/utils'

function UserRecipes() {
    const { data: items, error, isLoading } = useSWR(PATHS.USER.RECIPES)

    if (error) return <p>Failed to load your data</p>

    if (isLoading) return <LoaderOverlay />

    const recipes = items?.data?.docs && items.data.docs.map((item) => {
        if (!item.photo) {
            item.photo = getRandomCardPattern()
        }
        return <RecipeCard key={item._id} recipe={item} />
    })

    return (
        recipes.length
            ? recipes
            : (
                <div>
                    <p>Ups! Nothing here</p>
                    <Link href='/new'>Add Recipe</Link>
                </div>
            )
    )
}

export default UserRecipes
