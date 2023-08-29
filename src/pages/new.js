import Head from 'next/head'
import RecipeSubmission from '@/components/RecipeSubmission'
import { NEW_RECIPE } from '@/components/RecipeSubmission/utils'
import { default as PATHS } from '../../config'

/**
 * Initial values and assets will come from API.
 * will be responsible for: get recipe schema, get assets
 * @returns Page for Create New Recipe
 */

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

function Page({ assets }) {
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
