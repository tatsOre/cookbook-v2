import React from 'react'
import Link from 'next/link'
import LoaderOverlay from '../Loader/LoaderOverlay'
import RecipeCard from '@/components/Card/RecipeCard'
import { getRandomCardPattern } from '../Card/Card.helpers'

import { default as PATHS } from '../../../config'

function UserRecipesGrid({ mutateUser }) {
    const [recipes, setRecipes] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(false)
    const [error, setError] = React.useState(null)

    React.useEffect(() => {
        const getUserRecipes = async () => {
            setIsLoading(true)
            setError(null)

            const response = await window.fetch(PATHS.USER.RECIPES, {
                credentials: "include"
            })

            if (response.ok) {
                const data = await response.json()
                setRecipes(data.docs)

                setIsLoading(false)
            } else {
                setError("Failed to load your data")
                setIsLoading(false)
            }

        }
        getUserRecipes()
    }, [])

    if (error) return <p>{error}</p>

    if (isLoading) return <LoaderOverlay />

    const onTogglePrivacy = (id, value) => {
        const updated = recipes.map(rec =>
            rec._id === id ? ({ ...rec, public: value }) : rec
        )
        setRecipes(updated)
    }

    const onDeleteRecipe = (id) => {
        const updated = recipes.filter(rec => rec._id !== id)
        setRecipes(updated)
        /* Update NavBar: */
        mutateUser()
    }

    const content = recipes.map((item) => {
        !item.photo && (item.photo = getRandomCardPattern())

        return <RecipeCard
            key={item._id}
            recipe={item}
            onPublish={onTogglePrivacy}
            onDelete={onDeleteRecipe}
        />
    })

    const fallback = (
        <div>
            <p>Your recipes will appear here. Tap/Click the 'create' link to begin your recipe</p>
            <Link href='/new'>create</Link>
        </div>
    )

    return content?.length ? content : fallback
}

export default UserRecipesGrid
