import Head from 'next/head'
import { Inter } from 'next/font/google'
import SubmitRecipe from '@/components/SubmitRecipe/SubmitRecipe'
import styles from '@/styles/Home.module.scss'
import { ASSETS, RECIPE_SCHEMA } from '@/components/RecipeForm/utils/constants'

const inter = Inter({ subsets: ['latin'] })

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
        <main className={`${styles.main} ${inter.className}`}>
            <h1 className={styles.heading}>What's Cooking?</h1>
            <SubmitRecipe data={TESTING_EMPTY} assets={ASSETS} />
        </main>
    </>
}

export default Page
