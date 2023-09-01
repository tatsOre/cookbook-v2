import React from 'react'
import { useRouter } from "next/router"
import useUser from '@/lib/useUser'
import Layout from '@/components/UserBox/Layout'
// todo: fix imports:
import UserRecipesGrid from '@/components/UserBox/UserRecipesGrid'
import UserFavoritesGrid from '@/components/UserBox/UserFavoritesGrid'

function Page() {
    const { user, loggedOut } = useUser()
    const router = useRouter()

    // if logged out, redirect to the homepage
    React.useEffect(() => {
        if (loggedOut) router.replace("/")
    }, [loggedOut])

    if (loggedOut) return "Redirecting..."

    const route = router.asPath.split('/')
    const routeKey = route[route.length - 1]

    const grids = {
        "recipe-box": UserRecipesGrid,
        "favorites": UserFavoritesGrid
    }

    const Component = grids[routeKey]

    return (
        <Layout user={user}>
            <Component />
        </Layout>
    )
}

export default Page
