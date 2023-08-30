import React from 'react'
import useSWR from 'swr'
import Layout from '@/components/UserBox/Layout'
import RecipeCard from '@/components/RecipeCard/RecipeCardBase'

import { default as PATHS } from '../../../config'

function Page() {
    const { data: items, error, isLoading } = useSWR(PATHS.USER.FAVORITES)

    return (
        <Layout>
            {items?.data?.docs ? (
                items.data.docs.map((item) =>
                    <RecipeCard key={item._id} recipe={item} withTag primary />
                )
            ) : <p>Nothing here</p>}
        </Layout>
    )
}

export default Page
