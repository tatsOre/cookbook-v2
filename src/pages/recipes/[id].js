import Head from 'next/head'
import RecipeView from '@/components/RecipeView/View'
import { default as PATHS } from '../../../config'

export const getServerSideProps = async ({ params, res }) => {
    res.setHeader(
        'Cache-Control',
        'public, s-maxage=10, stale-while-revalidate=59'
    )

    try {
        const response = await fetch(`${PATHS.RECIPES_ENDPOINT}/${params.id}`)

        if (response.ok) {
            const data = await response.json()
            return { props: { data } }
        }
        return { notFound: true }

    } catch (err) {
        return { notFound: true }
    }
}

/**
 * @returns Page for Create New Recipe
 */

function Page({ data }) {
    return <>
        <Head>
            <title>{data?.title}</title>
        </Head>
        <RecipeView data={data} />
    </>
}

export default Page
