import React from 'react'
import Router from "next/router"
import useUser from '@/hooks/useUser'
import AuthorizationSubmission from '@/components/Auth'
import Layout from '@/components/Layout'

function Page() {
    const { loggedOut } = useUser()

    // if logged in, redirect to dashboard
    React.useEffect(() => {
        window.document.title = 'Hello Friend.'

        if (!loggedOut) Router.replace("/recipe-box")
    }, [loggedOut])

    if (!loggedOut) return "redirecting..."

    return (
        <Layout>
            <AuthorizationSubmission />
        </Layout>
    )
}

export default Page
