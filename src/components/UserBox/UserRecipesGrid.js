import React from 'react'
import Link from 'next/link'
import useSWR, { mutate } from 'swr'
import LoaderOverlay from '../Loader/LoaderOverlay'
import RecipeCard from '@/components/RecipeCard/RecipeCard'
import { getRandomCardPattern } from '../RecipeCard/utils'
import { default as PATHS } from '../../../config'

function UserRecipesGrid() {
    const [recipes, setRecipes] = React.useState([])

    const { data, error, isLoading } = useSWR(PATHS.USER.RECIPES)

    React.useEffect(() => {
        data && setRecipes(data?.docs)
    }, [data])

    const onTogglePrivacy = (id, value) => {
        const updated = recipes.map(rec =>
            rec._id === id ? ({ ...rec, public: value }) : rec
        )
        setRecipes(updated)
        //  We use the global mutate because the bound one is not working as desired
        mutate(PATHS.USER.RECIPES, null, {
            optimisticData: { docs: updated },
            revalidate: false
        })
    }

    if (error) return <p>Failed to load your data</p>

    if (isLoading) return <LoaderOverlay />

    const content = recipes?.length && recipes.map((item) => {
        if (!item.photo) {
            item.photo = getRandomCardPattern()
        }
        return (
            <RecipeCard key={item._id} recipe={item} onPublish={onTogglePrivacy} />
        )
    })

    return (
        content?.length && !isLoading
            ? content
            : <div>
                <p>Your recipes will appear here. Tap/Click the 'create' link to begin your recipe</p>
                <Link href='/new'>create</Link>
            </div>
    )
}

export default UserRecipesGrid
