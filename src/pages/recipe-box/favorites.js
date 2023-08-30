import React from 'react'
import { useRouter } from 'next/router'
import Layout from '@/components/UserBox/Layout'
import UserFavorites from '@/components/UserBox/UserFavorites'

function Page() {
    const router = useRouter()
    const routes = router.asPath.split('/')
// send endpoint?
    return (
        <Layout user={{}}>
            <UserFavorites pathname={routes[routes.length - 1]} />
        </Layout>
    )
}

export default Page
