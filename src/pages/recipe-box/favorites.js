import React from 'react'
import { useRouter } from 'next/router'
import Layout from '@/components/UserBox/Layout'
import UserRecipes from '@/components/UserBox/UserFavorites'
import useUser from '@/lib/useUser'

function Page() {
    const { user } = useUser({ redirectTo: '/login' })
    const router = useRouter()
    const routes = router.asPath.split('/')

    if (!user) return 'Redirecting...'

// send endpoint?
    return (
        <Layout user={user}>
            <UserRecipes pathname={routes[routes.length - 1]} />
        </Layout>
    )
}

export default Page
