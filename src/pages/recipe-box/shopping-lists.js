import React from 'react'
import { useRouter } from 'next/router'
import useUser from '@/hooks/useUser'
import Layout from '@/components/Layout'

function Page() {
    const { user, loggedOut } = useUser()
    const router = useRouter()

    // if logged out, redirect to the homepage
    React.useEffect(() => {
        if (loggedOut) router.replace("/")
    }, [loggedOut])

    if (loggedOut) return "Redirecting..."

    return (
        <Layout>
            <p><b> Soon :)</b></p>
        </Layout>
    )
}

export default Page
