import React from "react"
import Link from "next/link"
import Image from "next/image"
import Button from "../Button"
import CheckboxInput from "../Checkbox"
import NavBar from "../Navigation"
import UnstyledButton from "../Button/UnstyledButton"

import styles from './styles.module.scss'
import MenuButton from "../Button/MenuButton"
import Logo from "../Logo"

import isAfter from "date-fns/isAfter"
import format from "date-fns/format"
import { IconShoppingList } from "../Icon"

function RecipeShowPhoto({ photo }) {
    return (
        photo ? (
            <figure>
                <Image fill={true} src={photo} alt={`${title} picture`} />
            </figure>
        ) : null
    )
}

function IngredientItem({ data, ...rest }) {
    const { quantity, fraction, measure, name, prepNote } = data

    const quantityElement = quantity ? quantity + ' ' : ''
    const fractionElement = fraction?.label ? fraction?.label + ' ' : ''
    const measureElement = measure?.label
        ? measure?.label + (quantity > 1 || (quantity && fractionElement) ? 's' : '') + ' '
        : ''
    const prepNoteElement = prepNote ? ' ' + prepNote : ''
    // todo fix label to add a coma if prep note exists
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
    const label = `Add ${count ? count : "ALL"} ingredient(s) selected to shopping list -- soon`

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
        author,
        title,
        description,
        servings,
        ingredients,
        instructions,
        categories,
        cuisine,
        comments,
        photo,
        createdAt,
        updatedAt
    } = data

    const created = new Date(createdAt)
    const updated = new Date(updatedAt)

    const isUpdateAfter = isAfter(updated, created)
    const date = isUpdateAfter
        ? `Last updated ${format(updated, "PPP")}`
        : `Published ${format(created, "PPP")}`

    const instructionsContent = instructions?.length
        && instructions.map((step, index) => (
            <li key={`step ${index + 1}`}>
                <p><b>{index + 1}. </b>{step}</p>
            </li>
        ))

    return (
        <>
            <header>
                <NavBar fixed>
                    <MenuButton />
                    <Logo />
                    <Link href="/login">Login</Link>
                </NavBar>

            </header>

            <main style={{ backgroundColor: '#F8F9F7' }}>
                <article
                    className={styles['recipe__view--wrapper']}
                    style={{ marginBlockStart: '90px', marginInline: 'auto' }}
                >
                    <section data-info="header">
                        <div className={styles.recipe__tags}>
                            <span>Recipe under:</span>
                            <ul>
                                {cuisine && cuisine.label !== 'other' && (
                                    <li key='cuisine-tag'>{cuisine.label}</li>
                                )}
                                {categories && categories.length ?
                                    categories.map(cat => <li key={`category-${cat._id}`} >{cat.label}</li>)
                                    : null}
                            </ul>
                        </div>
                        <h1>{title}</h1>
                        <p className={styles.recipe__description}>{description}</p>
                        <div>
                            <p>By <span>{author?.name || 'Unknown'}</span></p>
                            <p>{date}</p>
                            <p>Serves 12</p>
                            <p>Time 23 min</p>
                        </div>
                    </section>

                    <section data-info="ingredients">
                        <h2>Ingredients</h2>

                        {ingredients?.length && <IngredientsSubmission items={ingredients} />}
                    </section>

                    <section data-info="instructions">
                        <h2>Directions</h2>
                        <ul>{instructionsContent}</ul>
                    </section>

                    <section data-info="extra-info">
                        <h2>Cooking Notes:</h2>
                        <p>{comments}</p>
                    </section>
                </article>

            </main>
        </>
    )
}

export default RecipeView
