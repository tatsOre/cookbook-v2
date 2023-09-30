import Head from 'next/head'
import RecipeView from '@/components/RecipeView/View'
import { default as PATHS } from '../../../config'

export async function getStaticPaths() {
    const response = await fetch(PATHS.RECIPES_ENDPOINT)
    const { docs } = await response.json()

    // Get the paths we want to pre-render based on docs
    const paths = docs.map((recipe) => ({
        params: { id: recipe._id }
    }))

    return { paths, fallback: 'blocking' }
}

export async function getStaticProps({ params }) {
    try {
        const response = await fetch(`${PATHS.RECIPES_ENDPOINT}/${params.id}`)

        if (response.ok) {
            const { doc } = await response.json()
            return { props: { data: doc } }
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
