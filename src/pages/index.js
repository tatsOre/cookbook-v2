import Head from 'next/head'
import Link from 'next/link'
import Image from "next/image"
import styles from '../components/RecipeView/styles.module.scss'
import { IconArrowNarrowRight } from '@/components/Icon'

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
            measure: null,
            name: "dry mung beans",
            prepNote: ""
        },
        {
            quantity: 1,
            fraction: null,
            measure: null,
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
    categories: [],
    cuisine: {},
    public: true,
    comments: "Beans can be replaced with red lentils."
}

export default function Home() {
    const {
        title,
        description,
        servings,
        ingredients,
        instructions,
        categories,
        cuisine,
        comments,
        photo
    } = TESTING_VALUES

    return (
        <>
            <Head>
                <title>Cookbook V2</title>
            </Head>
            <main>
                <Link href="/new">Create recipe</Link>
                <Link href="/login">Login</Link>


                <section className={styles.cards__section}>
                    <article>
                        <header>
                            <Image fill={true} src={photo} />
                        </header>
                        <div>
                            <div className={styles.categories__tags}>
                                {categories.map(cat => <span>{cat.label}</span>)}
                                <span>{cuisine.label}</span>
                            </div>

                            <h3>{title}</h3>
                            <div className={styles.arrow__wrapper}><IconArrowNarrowRight /></div>
                            <span>By: Lipa Echeverry</span>

                        </div>
                    </article>

                    <article>
                        <header>
                            <Image fill={true} src={photo} />
                        </header>
                        <div>
                            <div>---</div>
                            <div>
                                {categories.map(cat => <span>{cat.label}</span>)}
                                <span>{cuisine.label}</span>
                            </div>

                            <h3>{title}</h3>

                            <span>By: Lipa Echeverry</span>
                        </div>
                    </article>
                    <article>
                        <header>
                            <Image fill={true} src={photo} />
                        </header>
                        <div>
                            <div>---</div>
                            <div>
                                {categories.map(cat => <span>{cat.label}</span>)}
                                <span>{cuisine.label}</span>
                            </div>

                            <h3>{title}</h3>

                            <span>By: Lipa Echeverry</span>
                        </div>
                    </article>

                    <article >
                        <header>
                            <Image fill={true} src={photo} />
                        </header>
                        <div>
                            <div>---</div>
                            <div>
                                {categories.map(cat => <span>{cat.label}</span>)}
                                <span>{cuisine.label}</span>
                            </div>

                            <h3>{title}</h3>

                            <span>By: Lipa Echeverry</span>
                        </div>
                    </article>
                </section>
            </main>
        </>
    )
}
