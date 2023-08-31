import React from 'react'
import useUser from '@/lib/useUser'
import Layout from '@/components/UserBox/Layout'
import UserRecipes from '@/components/UserBox/UserRecipes'

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
