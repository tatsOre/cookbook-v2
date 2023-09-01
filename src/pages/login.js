import React from 'react'
import Router from "next/router";
import Head from 'next/head'
import useUser from '@/lib/useUser'
import AuthorizationSubmission from '@/components/Auth'
import Layout from '@/components/Auth/Layout'

function Page() {
    const { user, loggedOut } = useUser()

    // if logged in, redirect to dashboard
    React.useEffect(() => {
        if (user && !loggedOut) Router.replace("/recipe-box")
    }, [user, loggedOut])

    if (user && !loggedOut) return "redirecting...";

    return <>
        <Head>
            <title>Login</title>
        </Head>
        <Layout>
            <AuthorizationSubmission />
        </Layout>
    </>
}

export default Page
