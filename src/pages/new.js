import Head from 'next/head'
import RecipeSubmission from '@/components/RecipeSubmission'
import { NEW_RECIPE } from '@/components/RecipeSubmission/utils'
import { default as PATHS } from '../../config'

/**
 * Initial values and assets will come from API.
 * will be responsible for: get recipe schema, get assets
 * @returns Page for Create New Recipe
 */

export const getServerSideProps = async (context) => {
    const token = context.req.cookies.foodie

    if (!token) {
        return {
            redirect: {
                destination: '/login?next-route=new',
                permanent: false
            }
        }
    }

    try {
        const assetsRequest = fetch(PATHS.RECIPE_ASSETS)
        // make a getUserFromToken
        const userRequest = fetch(PATHS.USER.GET_CURRENT, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        const responses = await Promise.all([assetsRequest, userRequest])

        if (responses[0].ok && responses[1].ok) {
            const assets = await responses[0].json()
            const { data } = await responses[1].json()

            return { props: { assets, user: data } }
        } // If not, what? login? Todo: build a fetcher
    } catch {
        return { notFound: true }
    }
}

function Page({ assets, user }) {
    console.log(user)
    return <>
        <Head>
            <title>New Recipe</title>
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
