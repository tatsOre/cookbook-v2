import Head from 'next/head'
import SubmitRecipe from '@/components/SubmitRecipe/SubmitRecipe'
import SubmitRecipeLayout from '@/components/SubmitRecipe/Layout'
import { ASSETS, RECIPE_SCHEMA } from '@/components/RecipeForm/utils/constants'

const TESTING_EMPTY = {
    'ingredients': RECIPE_SCHEMA.ingredients,
    'instructions': RECIPE_SCHEMA.instructions
}

/**
 * Initial values and assets will come from API.
 * will be responsible for: send recipe schema, get assets
 * @returns Page for Create New Recipe
 */

function Page() {
    return <>
        <Head>
            <title>New Recipe</title>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <SubmitRecipeLayout title="New Recipe">
            <SubmitRecipe data={TESTING_EMPTY} assets={ASSETS} />
        </SubmitRecipeLayout>
    </>
}

export default Page
