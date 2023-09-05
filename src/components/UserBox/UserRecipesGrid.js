import React from 'react'
import Link from 'next/link'
import useSWR, { mutate } from 'swr'
import LoaderOverlay from '../Loader/LoaderOverlay'
import RecipeCard from '@/components/RecipeCard/RecipeCard'

import { default as PATHS } from '../../../config'

function UserRecipesGrid({ mutateUser }) {
    const [recipes, setRecipes] = React.useState([])

    const { data, error, isLoading } = useSWR(PATHS.USER.RECIPES)

    React.useEffect(() => {
        data && setRecipes(data.docs)
    }), [data]

    if (error) return <p>Failed to load your data</p>

    if (isLoading) return <LoaderOverlay />

    const onTogglePrivacy = (id, value) => {
        const updated = recipes.map(rec =>
            rec._id === id ? ({ ...rec, public: value }) : rec
        )
        setRecipes(updated)
        //  Used global mutate because the bound one is not working as desired
        mutate(PATHS.USER.RECIPES, null, {
            optimisticData: { docs: updated },
            revalidate: false
        })
    }

    const onDeleteRecipe = (id) => {
        const updated = recipes.filter(rec => rec._id !== id)
        setRecipes(updated)
        /* Used global mutate because the bound one is not working as desired */
        mutate(PATHS.USER.RECIPES, null, {
            optimisticData: { docs: updated },
            revalidate: true
        })
        /* Update NavBar: */
        mutateUser()
    }

    const content = recipes.map((item) => (
        <RecipeCard
            key={item._id}
            recipe={item}
            onPublish={onTogglePrivacy}
            onDelete={onDeleteRecipe}
        />
    ))

    const fallback = (
        <div>
            <p>Your recipes will appear here. Tap/Click the 'create' link to begin your recipe</p>
            <Link href='/new'>create</Link>
        </div>
    )

    return content.length && !isLoading ? content : fallback

}

export default UserRecipesGrid
