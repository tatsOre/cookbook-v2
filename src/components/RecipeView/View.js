import React from "react"
import Link from "next/link"
import Image from "next/image"
import Button from "../Button"
import CheckboxInput from "../Checkbox"


import NavLink from "../Button/NavLink"

import styles from './styles.module.scss'

function IngredientItem({ data, ...rest }) {
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
        <li>
            <CheckboxInput className="ingredient--item" label={label} {...rest} />
        </li>
    )
}

function IngredientsSubmission({ items }) {
    const initialState = Array.isArray(items)
        ? items.map(ingredient => ({
            ...ingredient, checked: false
        }))
        : []

    const [checked, setChecked] = React.useState(initialState)

    const selected = checked && checked.filter(ingredient => ingredient.checked)
    const count = selected.length ?? 0
    const label = `Add ${count ? count : "ALL"} ingredient(s) selected to shopping listt -- soon`

    const handleInputChange = (ev) => {
        const updatedState = checked.map((ingredient, index) =>
            ev.target.value == index
                ? { ...ingredient, checked: !ingredient.checked }
                : ingredient
        )
        setChecked(updatedState)
    }

    const handleSubmit = (ev) => ev.preventDefault()

    return (
        <form onSubmit={handleSubmit}>
            <ul>
                {items.map((item, index) => (
                    <IngredientItem
                        key={index} // change to id
                        data={item}
                        name={item.name}
                        value={index}
                        onChange={handleInputChange}
                    />
                ))}
            </ul>
            <Button type="submit" variant='outline' appearance='secondary'>
                {label}
            </Button>
        </form>
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
                    <IngredientsSubmission items={ingredients} />
                </section>

                <section>
                    <h2>How To Make</h2>
                    <ul>
                        {instructions.map((step, index) => (
                            <li key={`step ${index}`}>
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
