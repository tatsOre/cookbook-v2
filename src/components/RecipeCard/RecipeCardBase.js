import Link from 'next/link'
import { RecipeCardPhoto, RecipeCardTag } from './RecipeCardElements'
import {
    BookmarkRecipe,
    DeleteRecipe,
    EditRecipe,
    PublishRecipe
} from './RecipeCardControls'

import styles from './RecipeCard.module.scss'

function RecipeCard({ recipe, primary, withTag }) {
    const { _id: id, title, public: isPublic } = recipe

    return (
        <article className={styles.recipe__card}>
            {withTag ? <RecipeCardTag recipe={recipe} /> : null}

            {primary ? null : <EditRecipe id={id} />}

            <Link href={`/recipes/${id}`}>
                <div className={styles['card__image--wrapper']}>
                    <RecipeCardPhoto recipe={recipe} />
                </div>
                <div className={styles['card__info--wrapper']}>
                    <h3>{title}</h3>
                    <span>By: Lipa Echeverry</span>
                </div>
            </Link>

            {primary ? (
                <div className={styles['card__controls--base']}>
                    <BookmarkRecipe id={id} />
                </div>
            ) : (
                <div className={styles['card__controls--box']}>
                    <PublishRecipe id={id} isPublic={isPublic}/>
                    <DeleteRecipe id={id} title={title} />
                </div>
            )}
        </article>
    )
}

export default RecipeCard
