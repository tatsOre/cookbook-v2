import Head from 'next/head'
import SubmitRecipe from '@/components/RecipeSubmission/SubmitRecipe'
import SubmitRecipeLayout from '@/components/RecipeSubmission/Layout'
import { ASSETS } from '../new'

const TESTING_VALUES = {
    title: 'Mung Beans With Veggies',
    description: 'With the aid of a pressure cooker, this nourishing and satisfying soup cooks in just 20 minutes. Be sure to follow manufacturer instructions because different generations of pressure cookers require specific techniques.',
    mainIngredient: 'mung beans',
    time: {
        prep: 0,
        cook: 0,
        total: 0
    },
    photo: '',
    servings: 4,
    ingredients: [
        {
            quantity: 0,
            fraction: null,
            measure: ASSETS.MEASURE_OPTIONS[3],
            name: "dry mung beans",
            prepNote: ""
        },
        {
            quantity: 1,
            fraction: ASSETS.FRACTIONS_OPTIONS[2],
            measure: ASSETS.MEASURE_OPTIONS[1],
            name: "ground coriander",
            prepNote: ""
        },
        {
            quantity: 2,
            fraction: null,
            measure: null,
            name: "large sweet potato or yam",
            prepNote: "peeled and finely chopped"
        }
    ],
    instructions: [
        'Soak mung beans in water overnight. Drain.',
        'Heat oil or ghee in a heavy-bottomed pressure cooker. Sauté onions and garlic over medium heat for 2 to 3 minutes, stirring frequently until onions soften. Add turmeric, cumin, coriander, black pepper, fenugreek, and fennel seeds. Stir constantly over medium heat until spices are aromatic.'
    ],
    categories: [ASSETS.CATEGORIES_OPTIONS[0], ASSETS.CATEGORIES_OPTIONS[1]],
    cuisine: ASSETS.CUISINE_OPTIONS[0],
    public: true,
    comments: "Beans can be replaced with red lentils."
}

/**
 * Initial values and assets will come from API.
 * will be responsible for: send recipe schema, get assets
 * @returns Page for Create New Recipe
 */

function Page() {
    return <>
        <Head>
            <title>Edit Recipe</title>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <SubmitRecipeLayout title={TESTING_VALUES.title}>
            <SubmitRecipe data={TESTING_VALUES} assets={ASSETS} />
        </SubmitRecipeLayout>
    </>
}

export default Page
