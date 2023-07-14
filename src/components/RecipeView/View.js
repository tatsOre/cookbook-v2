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
                <Nav className='nav__bar'>
                    <Button>iii</Button>
                    <Link href='/' passHref legacyBehavior>
                        <NavLink label="Cookbook" uppercase />
                    </Link>
                    <Button>?</Button>
                </Nav>
            </header>

            <main className={styles['recipe__view--wrapper']}>
                <h1>{title}</h1>

                <section>
                    {photo ? (
                        <figure>
                            <Image fill={true} src={photo} />
                        </figure>
                    ) : null}
                    <div>
                        <p className={styles.recipe__description}>{description}</p>
                        <ul className={styles.recipe__tags}>
                            <li>{cuisine.label}</li>
                            {categories.map(cat => <li>{cat.label}</li>)}
                        </ul>
                    </div>
                    <div>
                        <span>By Lipa Echeverry</span>
                        <span aria-hidden="true">&nbsp; &nbsp; • &nbsp; &nbsp;</span>
                        <span>Published Mar. 07, 2023</span>
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
