import Head from 'next/head'
import RecipeSubmission from '@/components/RecipeSubmission'
import { default as PATHS } from '../../../config'

/**
 * Fetch initial values and assets for page form
 * @returns Initial props
 */

export const getServerSideProps = async ({ params }) => {
    try {
        const assetsRequest = fetch(PATHS.RECIPE_ASSETS)
        const recipeRequest = fetch(`${PATHS.RECIPES_ENDPOINT}/${params.id}`)

        const responses = await Promise.all([assetsRequest, recipeRequest])

        if (responses[0].ok && responses[1].ok) {
            const assets = await responses[0].json()
            const { data } = await responses[1].json()
            return { props: { assets, data } }
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
    return <>
        <Head>
            <title>Edit Recipe</title>
        </Head>
        <RecipeSubmission.Layout title={data?.title} mode='edit'>
            <RecipeSubmission
                endpoint={`${PATHS.RECIPES_ENDPOINT}/${data?._id}`}
                data={data}
                assets={assets}
                mode='edit'
            />
        </RecipeSubmission.Layout>
    </>
}

export default Page
