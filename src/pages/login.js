import React from 'react'
import Router from "next/router";
import Head from 'next/head'
import useUser from '@/lib/useUser'
import AuthorizationSubmission from '@/components/Auth'
import Layout from '@/components/Auth/Layout'

function Page() {
    const { loggedOut } = useUser()

    // if logged in, redirect to dashboard
    React.useEffect(() => {
        if (!loggedOut) Router.replace("/recipe-box")
    }, [loggedOut])

    if (!loggedOut) return "redirecting...";

    return <>
        <Head>
            <title>Hello Friend.</title>
        </Head>
        <Layout>
            <AuthorizationSubmission />
        </Layout>
    </>
}

export default Page
