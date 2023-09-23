import React from 'react'
import { useRouter } from "next/router"
import useUser from '@/lib/useUser'
import Layout from '@/components/UserBox/Layout'
import LoaderOverlay from '@/components/Loader/LoaderOverlay'
// todo: fix imports:
import UserFavoritesGrid from '@/components/UserBox/UserFavoritesGrid'

function Page() {
    const { user, loading, loggedOut, mutate } = useUser()
    const router = useRouter()

    // if logged out, redirect to the homepage
    React.useEffect(() => {
        if (loggedOut) router.replace("/")
    }, [loggedOut])

    if (loading) return <LoaderOverlay />

    if (loggedOut) return "Redirecting..."

    return (
        <Layout user={user}>
            <UserFavoritesGrid mutateUser={mutate} />
        </Layout>
    )
}

export default Page
