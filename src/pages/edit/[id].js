import React from 'react'
import Router from "next/router";
import Head from 'next/head'
import useUser from '@/lib/useUser'
import RecipeSubmission from '@/components/RecipeSubmission'
import RecipeSubmissionProvider from '@/components/RecipeSubmission/context'
import { default as PATHS } from '../../../config'
import { default as RECIPE_FIELDS_ATTRIBUTES } from '@/components/RecipeSubmission/constants'

/**
 * Fetches initial values and form assets.
 * @returns Initial Props || Error Page
 */

export const getServerSideProps = async ({ params }) => {
    try {
        const assetsRequest = fetch(PATHS.RECIPE_ASSETS)
        const recipeRequest = fetch(`${PATHS.RECIPES_ENDPOINT}/${params.id}`)

        const responses = await Promise.all([assetsRequest, recipeRequest])

        if (responses[0].ok && responses[1].ok) {
            const assets = await responses[0].json()
            const { doc } = await responses[1].json()
            return { props: { assets, data: doc } }
        }
        return { notFound: true }

    } catch {
        return { notFound: true }
    }
}

/**
 * @returns Edit Recipe Page
 */

function Page({ assets, data }) {
    const { loggedOut } = useUser();

    // if logged out, redirect to the login
    React.useEffect(() => {
        if (loggedOut) Router.replace("/login")
    }, [loggedOut])

    if (loggedOut) return "redirecting..."

    return <>
        <Head>
            <title>Edit Recipe</title>
        </Head>
        <RecipeSubmission.Layout title={data?.title} mode='edit'>
            <RecipeSubmissionProvider
                value={{
                    assets,
                    fieldsAttributes: RECIPE_FIELDS_ATTRIBUTES
                }}
            >
                <RecipeSubmission
                    endpoint={`${PATHS.RECIPES_ENDPOINT}/${data?._id}`}
                    data={data}
                    mode='edit'
                />

            </RecipeSubmissionProvider>
        </RecipeSubmission.Layout>
    </>
}

export default Page
