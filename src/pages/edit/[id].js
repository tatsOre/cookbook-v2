import Head from 'next/head'
import Alert from '@/components/Alert'
import RecipeSubmission from '@/components/RecipeSubmission'
import { default as PATHS } from '../../../config'

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
    return <>
        <Head>
            <title>Edit Recipe</title>
        </Head>
        <RecipeSubmission.Layout title={data?.title} mode='edit'>
            {/** If we do not have data || title, something happened with the API */}
            {!data || !data.title ? (
                <Alert
                    appearance="danger"
                    variant='light'
                    title={'Sorry, we could not load your data.'}
                    style={{ marginBottom: '1rem' }}
                />
            ) : null}

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
