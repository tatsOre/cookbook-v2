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
    console.log(token)

    /*     try {
            const assetsRequest = fetch(PATHS.RECIPE_ASSETS)
            const userRequest = fetch(PATHS.USER.GET_CURRENT, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            const responses = await Promise.all([assetsRequest, userRequest])
    
            if (responses[0].ok && responses[1].ok) {
                const assets = await responses[0].json()
                const { data } = await responses[1].json()
    
                return { props: { assets, user: data, token } }
            }
        } catch {
            return { notFound: true }
        } */

    return { props: { token } }
}

function Page({ assets, user, token }) {
    console.log({ tokenNewPage: token })
    return <>
        <Head>
            <title>New Recipe</title>
        </Head>
        <h1>{token ? token : 'undefined'}</h1>
        {/*         <RecipeSubmission.Layout>
            <RecipeSubmission
                endpoint={PATHS.RECIPES_ENDPOINT}
                data={NEW_RECIPE}
                assets={assets} />
        </RecipeSubmission.Layout> */}
    </>
}

export default Page
