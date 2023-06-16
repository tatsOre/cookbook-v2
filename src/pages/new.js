import Head from 'next/head'
import { Inter } from 'next/font/google'
import SubmitRecipe from '@/components/SubmitRecipe/SubmitRecipe'
import styles from '@/styles/Home.module.scss'

const inter = Inter({ subsets: ['latin'] })

const INGR_SCHEMA = {
    quantity: 0,
    fraction: null,
    measure: null,
    name: "",
    prepNote: ""
}

const CUISINE_OPTIONS = [
    { _id: '00001', label: 'indian' },
    { _id: '00002', label: 'cuban' },
    { _id: '00003', label: 'some' },
    { _id: '00004', label: 'latino' },
    { _id: '00005', label: 'american' },
    { _id: '00006', label: 'thai' },
    { _id: '00000', label: 'other' },
]

const CATEGORIES_OPTIONS = [
    { _id: '0000A', label: 'vegetarian' },
    { _id: '0000B', label: 'easy' },
    { _id: '0000C', label: 'for two' },
    { _id: '0000D', label: 'bread' },
    { _id: '0000E', label: 'dessert' },
    { _id: '0000F', label: 'cookies and pastries' },
]

const FRACTIONS_OPTIONS = [
    { _id: 'X0001', label: "0", decimal: 0 },
    { _id: 'X0002', label: "⅛", decimal: 0.125 }, // 1/8  ⅛ &#8539;
    { _id: 'X0003', label: "¼", decimal: 0.25 }, // 1/4 ¼  &#188;
    { _id: 'X0004', label: "⅓", decimal: 0.33333333333333 }, // 1/3  ⅓  &#8531;
    { _id: 'X0005', label: "½", decimal: 0.5 }, // 1/2 ½  &#189;
    { _id: 'X0006', label: "⅔", decimal: 0.66666666666667 }, // 2/3 ⅔  &#8532;
    { _id: 'X0007', label: "¾", decimal: 0.75 }, // 3/4 ¾ &#190;
]

const MEASURE_OPTIONS = [
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

const ASSETS = {
    CUISINE_OPTIONS: CUISINE_OPTIONS,
    CATEGORIES_OPTIONS: CATEGORIES_OPTIONS,
    MEASURE_OPTIONS: MEASURE_OPTIONS,
    FRACTIONS_OPTIONS: FRACTIONS_OPTIONS
}

const TESTING_EMPTY = {
    title: '',
    description: '',
    mainIngredient: '',
    time: {
        prep: 0,
        cook: 0,
        total: 0
    },
    photo: '',
    servings: 0,
    ingredients: [
        INGR_SCHEMA
    ],
    instructions: [],
    categories: [],
    cuisine: null,
    public: false,
    comments: ""
}

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
            measure: MEASURE_OPTIONS[3],
            name: "dry mung beans",
            prepNote: ""
        },
        {
            quantity: 1,
            fraction: FRACTIONS_OPTIONS[2],
            measure: MEASURE_OPTIONS[1],
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
    categories: [CATEGORIES_OPTIONS[0], CATEGORIES_OPTIONS[1]],
    cuisine: CUISINE_OPTIONS[0],
    public: false,
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
            <title>New Recipe</title>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className={`${styles.main} ${inter.className}`}>
            <h1 className={styles.heading}>What's Cooking?</h1>
            <SubmitRecipe data={TESTING_EMPTY} assets={ASSETS} />
        </main>
    </>
}

export default Page
