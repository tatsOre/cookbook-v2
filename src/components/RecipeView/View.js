import Link from "next/link"
import Nav from "../Box/Nav"
import Button from "../Button"
import NavLink from "../Button/NavLink"
import Alert from "../Alert"

import styles from './styles.module.scss'
import CheckboxInput from "../Checkbox"
import Image from "next/image"

function IngredientItem({ data }) {
    const { quantity, fraction, measure, name, prepNote } = data

    const quantityElement = quantity ? quantity + ' ' : ''
    const fractionElement = fraction?.label ? fraction?.label + ' ' : ''
    const measureElement = measure?.label
        ? measure?.label + (quantity > 1 || (quantity && fractionElement) ? 's' : '') + ' '
        : ''
    const prepNoteElement = prepNote ? ' ' + prepNote : ''

    const label = <>
        {quantityElement}{fractionElement}{measureElement}<b>{name}</b>{prepNoteElement}
    </>
    return (
        <li><CheckboxInput className="ingredient--item" label={label} /></li>
    )
}

function RecipeView({ data }) {
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
    } = data

    return (
        <>
            <header>
                <Nav>
                    <Button variant='outline' appearance='secondary'>iii</Button>
                    <Link href='/' passHref legacyBehavior>
                        <NavLink label="Cookbook" uppercase variant='outline' appearance='secondary'/>
                    </Link>
                    <Button variant='outline' appearance='secondary'>?</Button>
                </Nav>
            </header>

            <main className={styles['recipe__view--wrapper']}>
                <div className={styles.recipe__tags}>
                    <span>Recipe under: </span>
                    <ul>
                        <li key='cuisine-tag'>{cuisine.label}</li>
                        {categories.map(cat => <li key={`category-${cat._id}`} >{cat.label}</li>)}
                    </ul>
                </div>

                <h1>{title}</h1>

                <section>
                    {photo ? (
                        <figure>
                            <Image fill={true} src={photo} alt={`${title} picture`} />
                        </figure>
                    ) : null}

                    <p className={styles.recipe__description}>{description}</p>

                    <div>
                        <span>by </span>
                        <a>Lipa Echeverry</a>
                        <span aria-hidden="true">&nbsp; &nbsp;•&nbsp; &nbsp;</span>
                        <span style={{ fontWeight: 300 }}>Published Mar. 07, 2023</span>
                    </div>
                </section>

                <section>
                    <h2>Ingredients</h2>
                    <ul>
                        {ingredients.map(item => <IngredientItem data={item} />)}
                    </ul>
                </section>

                <section>
                    <h2>How To Make</h2>
                    <ul>
                        {instructions.map((step, index) => (
                            <li>
                                <h3>{`${index < 10 ? '0' : ''}${index + 1}`}</h3>
                                <p>{step}</p>
                            </li>
                        ))}
                    </ul>
                </section>

                <section>
                    <h2>Cooking Notes</h2>
                    <p>{comments}</p>
                </section>

            </main>
        </>
    )
}

export default RecipeView
