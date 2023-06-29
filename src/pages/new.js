import Head from 'next/head'
import RecipeSubmission from '@/components/RecipeSubmission'

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

export const CUISINE_OPTIONS = [
    { _id: '00001', label: 'indian' },
    { _id: '00002', label: 'cuban' },
    { _id: '00003', label: 'some' },
    { _id: '00004', label: 'latino' },
    { _id: '00005', label: 'american' },
    { _id: '00006', label: 'thai' },
    { _id: '00000', label: 'other' },
]

export const CATEGORIES_OPTIONS = [
    { _id: '0000A', label: 'vegetarian' },
    { _id: '0000B', label: 'easy' },
    { _id: '0000C', label: 'for two' },
    { _id: '0000D', label: 'bread' },
    { _id: '0000E', label: 'dessert' },
    { _id: '0000F', label: 'cookies and pastries' },
]

export const FRACTIONS_OPTIONS = [
    { _id: 'X0001', label: "0", decimal: 0 },
    { _id: 'X0002', label: "⅛", decimal: 0.125 }, // 1/8  ⅛ &#8539;
    { _id: 'X0003', label: "¼", decimal: 0.25 }, // 1/4 ¼  &#188;
    { _id: 'X0004', label: "⅓", decimal: 0.33333333333333 }, // 1/3  ⅓  &#8531;
    { _id: 'X0005', label: "½", decimal: 0.5 }, // 1/2 ½  &#189;
    { _id: 'X0006', label: "⅔", decimal: 0.66666666666667 }, // 2/3 ⅔  &#8532;
    { _id: 'X0007', label: "¾", decimal: 0.75 }, // 3/4 ¾ &#190;
]

export const MEASURE_OPTIONS = [
    { _id: "MO001", label: "teaspoon" },
    { _id: "MO002", label: "tablespoon" },
    { _id: "MO003", label: "cup" },
    { _id: "MO004", label: "gallon" },
    { _id: "MO005", label: "gram" },
    { _id: "MO006", label: "pound" },
    { _id: "MO007", label: "kilogram" },
    { _id: "MO008", label: "ounce" },
    { _id: "MO009", label: "litre" }
]

export const ASSETS = {
    CUISINE_OPTIONS: CUISINE_OPTIONS,
    CATEGORIES_OPTIONS: CATEGORIES_OPTIONS,
    MEASURE_OPTIONS: MEASURE_OPTIONS,
    FRACTIONS_OPTIONS: FRACTIONS_OPTIONS,
    RECIPE_SCHEMA: RECIPE_SCHEMA,
    INGR_SCHEMA: RECIPE_SCHEMA.ingredients[0]
}

/**
 * Initial values and assets will come from API.
 * will be responsible for: get recipe schema, get assets
 * @returns Page for Create New Recipe
 */

function Page() {
    return <>
        <Head>
            <title>New Recipe</title>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <RecipeSubmission.Layout title="Hello Friend.">
            <RecipeSubmission
                endpoint={''}
                data={{
                    title: 'test',
                    description: 'test',
                    mainIngredient: 'test',
                    'ingredients': RECIPE_SCHEMA.ingredients,
                    'instructions': RECIPE_SCHEMA.instructions,
                    'photo': 'https://res.cloudinary.com/dshl3pgv4/image/upload/v1634436530/cookbook/36f888d8a2ce3b4a1448563f1eb9b53d_hq3nu7.jpg'
                }}
                assets={ASSETS} />
        </RecipeSubmission.Layout>
    </>
}

export default Page
