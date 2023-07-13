import Head from 'next/head'

import { ASSETS } from '../new'
import RecipeView from '@/components/RecipeView/View'

export const TESTING_VALUES = {
    title: 'Mung Beans With Veggies',
    description: 'With the aid of a pressure cooker, this nourishing and satisfying soup cooks in just 20 minutes. Be sure to follow manufacturer instructions because different generations of pressure cookers require specific techniques.',
    mainIngredient: 'mung beans',
    time: {
        prep: 0,
        cook: 0,
        total: 0
    },
    photo: 'https://res.cloudinary.com/dshl3pgv4/image/upload/v1634436530/cookbook/36f888d8a2ce3b4a1448563f1eb9b53d_hq3nu7.jpg',
    servings: 4,
    ingredients: [
        {
            quantity: 0,
            fraction: null,
            measure: null,
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
            measure: ASSETS.MEASURE_OPTIONS[3],
            name: "large sweet potato or yam",
            prepNote: "peeled and finely chopped"
        },
        {
            quantity: 1,
            fraction: null,
            measure: ASSETS.MEASURE_OPTIONS[1],
            name: "onions",
            prepNote: "chopped finely"
        },
    ],
    instructions: [
        'Soak mung beans in water overnight. Drain.',
        'Heat oil or ghee in a heavy-bottomed pressure cooker. Sauté onions and garlic over medium heat for 2 to 3 minutes, stirring frequently until onions soften. Add turmeric, cumin, coriander, black pepper, fenugreek, and fennel seeds. Stir constantly over medium heat until spices are aromatic.',
        'Add sweet potato, mung beans, water or vegetable stock, ginger, kombu, and salt.'
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
            <title>{TESTING_VALUES.title}</title>
        </Head>
        <RecipeView data={TESTING_VALUES} />
    </>
}

export default Page
