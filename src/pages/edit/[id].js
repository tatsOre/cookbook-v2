import Head from 'next/head'
import RecipeSubmission from '@/components/RecipeSubmission'
import { default as PATHS } from '../../../config'

/**
 * Initial values and assets will come from API.
 * will be responsible for: send recipe schema, get assets
 * @returns Page for Create New Recipe
 */

export const getServerSideProps = async ({ params }) => {
    try {
        const assetsRequest = fetch(PATHS.RECIPE_ASSETS)
        const recipeRequest = fetch(`${PATHS.RECIPES_ENDPOINT}/${params.id}`)

        const responses = await Promise.all([assetsRequest, recipeRequest])

        if (responses[0].ok && responses[1].ok) {
            const assets = await responses[0].json()
            const data = await responses[1].json()
            return { props: { assets, data } }
        }
        return { notFound: true }

    } catch (err) {
        return { notFound: true }
    }
}

function Page({ assets, data }) {
    return <>
        <Head>
            <title>Edit {data?.title}</title>
        </Head>
        <RecipeSubmission.Layout title={data?.title}>
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
