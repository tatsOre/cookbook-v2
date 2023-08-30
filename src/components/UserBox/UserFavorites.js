import React from 'react'
import useSWR from 'swr'

import RecipeCard from '@/components/RecipeCard/RecipeCardBase'

import { default as PATHS } from '../../../config'


function UserFavorites() {
    const { data: items, error, isLoading } = useSWR(PATHS.USER.FAVORITES)
    
    if (error) return <p>'Failed to load'</p>

    if (isLoading) return <p>Loading...</p>

    const renderContent = () => {
        const pathname = ''
        
        switch(pathname) {
            default:
                return []
        }
        
    }

    return (
        <>
            {items?.data?.docs ? (
                items.data.docs.map((item) =>
                    <RecipeCard key={item._id} recipe={item} withTag primary />
                )
            ) : <p>Nothing here</p>}
        </>
    )
}

export default UserFavorites
