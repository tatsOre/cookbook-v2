import React from 'react'
import Link from 'next/link'
import useSWR from 'swr'
import useUser from '@/lib/useUser'
import Layout from '@/components/UserBox/Layout'
import RecipeCard from '@/components/RecipeCard/RecipeCardBase'

import { default as PATHS } from '../../../config'
import { getRandomCardPattern } from '@/components/RecipeCard/utils'


function UserRecipes() {
    const { data: items, error, isLoading } = useSWR(PATHS.USER.RECIPES)

    if (error) return <p>'Failed to load your recipes'</p>

    if (isLoading) return <p>Loading...</p>

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
// todo: si combinas todos los components, el fallback debe ir a PAGE LEVEL
function Page() {
    const { user } = useUser({ redirectTo: '/login' })

    if (!user) return 'Redirecting...'

    return (
        <Layout user={user}>
            <UserRecipes />
        </Layout>
    )
}

export default Page
