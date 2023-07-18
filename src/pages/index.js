import Head from 'next/head'
import Link from 'next/link'
import Image from "next/image"
import styles from '../components/RecipeView/styles.module.scss'

import { TESTING_VALUES } from './recipe/[id]'
import { IconArrowNarrowRight } from '@/components/Icon'

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
