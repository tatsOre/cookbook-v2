import Head from 'next/head'
import RecipeView from '@/components/RecipeView/View'
import { default as PATHS } from '../../../config'

// todo: getstaticprops with staticPaths and blocking flag
export const getServerSideProps = async ({ params }) => {
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
