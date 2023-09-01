import React from 'react'
import Link from 'next/link'
import useSWR, { mutate } from 'swr'
import LoaderOverlay from '../Loader/LoaderOverlay'
import RecipeCard from '@/components/RecipeCard/RecipeCard'
import useSWRMutation from 'swr/mutation'
import { default as PATHS } from '../../../config'
import { getRandomCardPattern } from '../RecipeCard/utils'

function UserRecipesGrid() {
    const [recipes, setRecipes] = React.useState([])

    const { data, error, isLoading } = useSWR(PATHS.USER.RECIPES)

    React.useEffect(() => {
        data && setRecipes(data?.data?.docs)
    }, [data])

    const onTogglePrivacy = (id, value) => {
        const updated = recipes.map(rec =>
            rec._id === id ? ({ ...rec, public: value }) : rec
        )
        console.log({ id, value })
        setRecipes(updated)
        //  We use the global mutate because the bound one is not working as desired
        mutate(PATHS.USER.RECIPES, null, {
            optimisticData: { data: { docs: updated } },
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
        content?.length
            ? content
            : <div>
                <p>Your recipes will appear here. Tap/Click the 'create' link to begin your recipe</p>
                <Link href='/new'>create</Link>
            </div>
    )
}

export default UserRecipesGrid
