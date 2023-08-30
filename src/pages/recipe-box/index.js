import React from 'react'
import useSWR from 'swr'
import Layout from '@/components/UserBox/Layout'
import RecipeCard from '@/components/RecipeCard/RecipeCardBase'

import { default as PATHS } from '../../../config'
import useUser from '@/lib/useUser'

function UserRecipes({ user }) {
    const { data: items, error, isLoading } = useSWR(PATHS.USER.RECIPES)
    //console.log({ isLoading, error, items })

    // fetching at component level
//console.log(error)
    if (error) return <p>'Failed to load your recipes'</p>

    if (isLoading) return <p>Loading...</p>

    return (
        <>
            {items?.data?.docs ? (
                items.data.docs.map((item) =>
                    <RecipeCard key={item._id} recipe={item} />
                )
            ) : <p>Nothing here</p>}
        </>
    )
}
function Page() {
    const { user } = useUser({
        redirectTo: '/login',
    })

    if (!user) return 'redirecting...'

    return (
        <Layout user={user}>
            <UserRecipes user={user} />
        </Layout>
    )
}

export default Page
