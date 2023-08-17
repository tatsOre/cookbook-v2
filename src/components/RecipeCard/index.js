import React from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { default as PATHS } from '../../../config'

import styles from './RecipeCard.module.scss'
import Modal from '../Modal'
import Alert from '../Alert'

function SaveFavoriteControls() {
    return (
        <div className={styles['recipe__card--controls']}>
            {/** Keep in mind the following atts: */}
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
    )
}

function DeleteRecipe({ recipe }) {
    const [showModal, setShowModal] = React.useState(false)
    const { _id, title } = recipe

    const handleDeleteClick = async () => {
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

    const modalProps = {
        heading: 'Are you sure?',
        children: (
            <p>
                Deleting <i>{title}</i> means that you will{' '}
                <strong>permanently lose</strong> the data about this recipe.
            </p>
        ),
        onCancel: () => setShowModal(false),
        onConfirm: () => {
            setShowModal(false)
            //handleDeleteClick()
        }
    }

    return (
        <>
            {showModal && <Modal {...modalProps} />}
            <button onClick={() => setShowModal(true)}>Delete</button>
        </>
    )
}

function UserCardControls({ user, recipe }) {
    return (
        <div className={styles['recipe__card--controls']}>
            <button> Make Public </button>
            <DeleteRecipe recipe={recipe} />
        </div>
    )
}

const DynamicPicture = dynamic(import('./RecipeCardPhoto'), {
    ssr: false
})

function RecipeCard({ recipe }) {
    const badge = recipe.categories.length
        ? recipe.categories[0].label
        : recipe.cuisine.label ? recipe.cuisine.label : null

    return (
        <article className={styles.recipe__card}>
            {/** badge will be a link to recipes to tag/{:badge} */}
            {badge ? <div className={styles.recipe__tag}>{badge}</div> : null}

            <Link href={`/recipes/${recipe._id}`}>
                <div className={styles['card__image--wrapper']}>
                    <DynamicPicture recipe={recipe} />
                </div>
                <div className={styles['card__info--wrapper']}>
                    <h3>{recipe.title}</h3>
                    <span>By: Lipa Echeverry</span>
                </div>
            </Link>

            <UserCardControls recipe={recipe} />
        </article>
    )
}

export default RecipeCard
