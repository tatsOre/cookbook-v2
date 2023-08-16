import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'

import { default as PATHS } from '../../../config'

import styles from './RecipeCard.module.scss'

function RecipeCard({ recipe }) {
    const router = useRouter()

    const def = 'https://res.cloudinary.com/dshl3pgv4/image/upload/v1634436530/cookbook/36f888d8a2ce3b4a1448563f1eb9b53d_hq3nu7.jpg'

    const deleteRecipe = async () => {
        // send uri from API
        const response = await fetch(`${PATHS.RECIPES_ENDPOINT}/${recipe._id}`,
            { method: 'DELETE' }
        )

        if (response.ok) {
            //console.log(await response.json())
            router.replace(router.asPath);
        } else {
            console.log('something happened')
        }
    }

    const badge = recipe.categories.length
        ? recipe.categories[0].label
        : recipe.cuisine.label ? recipe.cuisine.label : null

    return (
        <article className={styles.recipe__card}>
            {/** badge will be a link to recipes to tag/{:badge} */}
            {badge ? <div className={styles.recipe__tag}>{badge}</div> : null}

            <Link href={`/recipes/${recipe._id}`}>
                <div className={styles['card__image--wrapper']}>
                    <Image
                        fill
                        priority
                        src={recipe.photo || def}
                        alt={`${recipe.title} picture`}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                </div>
                <div className={styles['card__info--wrapper']}>
                    <h3>{recipe.title}</h3>
                    <span>By: Lipa Echeverry</span>
                </div>
            </Link>

            {/** Keep in mind the following atts: */}
            <div className={styles['recipe__card--controls']}>
                <button
                    aria-checked="true"
                    aria-label="Save"
                    className="card--control"
                    role="switch"
                    type="button"
                >
                    Save
                </button>
                <button onClick={deleteRecipe}>Delete</button>
            </div>
        </article>
    )
}

export default RecipeCard
