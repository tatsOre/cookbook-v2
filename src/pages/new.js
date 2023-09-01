import React from 'react'
import Router from "next/router";
import Head from 'next/head'
import useUser from '@/lib/useUser'
import RecipeSubmission from '@/components/RecipeSubmission'
import { NEW_RECIPE } from '@/components/RecipeSubmission/utils'
import { default as PATHS } from '../../config'

export const getStaticProps = async () => {
    try {
        const response = await fetch(PATHS.RECIPE_ASSETS)
        if (response.ok) {
            const assets = await response.json()
            return { props: { assets } }
        }
        return { notFound: true }
    } catch {
        return { notFound: true }
    }
}

/**
 * @returns Page for Create New Recipe
 */

function Page({ assets }) {
    const { user, loggedOut } = useUser();

    // if logged out, redirect to the login
    React.useEffect(() => {
        if (loggedOut) Router.replace("/login")
    }, [loggedOut])

    if (loggedOut) return "redirecting..."

    return <>
        <Head>
            <title>Create Recipe</title>
        </Head>
        <RecipeSubmission.Layout>
            <RecipeSubmission
                endpoint={PATHS.RECIPES_ENDPOINT}
                data={NEW_RECIPE}
                assets={assets} />
        </RecipeSubmission.Layout>
    </>
}

export default Page
