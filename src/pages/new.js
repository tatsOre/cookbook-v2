import Head from 'next/head'
import RecipeSubmission from '@/components/RecipeSubmission'
import { default as PATHS } from '../../config'

const RECIPE_SCHEMA = {
    title: '',
    description: '',
    mainIngredient: '',
    time: {
        prep: '', /** Number */
        cook: '', /** Number */
        total: '' /** Number */
    },
    photo: '',
    servings: '', /** Number */
    ingredients: [
        {
            quantity: '', /** Number */
            fraction: null, /** Object */
            measure: null, /** Object */
            name: '',
            prepNote: ''
        }
    ],
    instructions: [{ text: '' }],
    categories: [], /** [Object] */
    cuisine: null, /** Object */
    public: false,
    comments: ''
}

const NEW_RECIPE = {
    'ingredients': RECIPE_SCHEMA.ingredients,
    'instructions': RECIPE_SCHEMA.instructions
}

/**
 * Initial values and assets will come from API.
 * will be responsible for: get recipe schema, get assets
 * @returns Page for Create New Recipe
 */

export const getStaticProps = async () => {
    try {
        const response = await fetch(PATHS.RECIPE_ASSETS)
        const assets = await response.json()
        return { props: { assets } }
    } catch (err) {
        return { notFound: true }
    }
}

function Page({ assets }) {
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
