import React from 'react'
import { useRouter } from "next/router"
import useUser from '@/hooks/useUser'
import Layout from '@/components/Layout'
import LoaderOverlay from '@/components/Loader/LoaderOverlay'
// todo: fix imports:
import UserFavoritesGrid from '@/components/UserBox/UserFavoritesGrid'

function Page() {
    const { user, loading, loggedOut } = useUser()
    const router = useRouter()

    // if logged out, redirect to the homepage
    React.useEffect(() => {
        if (loggedOut) router.replace("/")
    }, [loggedOut])

    if (loading) return <LoaderOverlay />

    if (loggedOut) return "Redirecting..."

    return (
        <Layout>
            <UserFavoritesGrid />
        </Layout>
    )
}

export default Page
