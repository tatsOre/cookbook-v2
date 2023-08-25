import React from 'react'
import Logo from '../Logo'
import MenuButton from '../Button/MenuButton'
import NavBar from '../Navigation'
import RecipeCard from '@/components/RecipeCard/RecipeCardBase'

import { IconChefHat, IconNotebook, IconShoppingList } from '../Icon'

import { default as PATHS } from '../../../config'

import styles from './UserBox.module.scss'

function Layout({ recipes }) {
    const [count, setCount] = React.useState(0)

    React.useEffect(() => {
        async function fetchData() {
            const response = await fetch(PATHS.RECIPES_ENDPOINT, {
                credentials: 'include'
            })

            if (response.ok) {
                const { data } = await response.json()
                setCount(data.length)

            } else {
                console.log('something happened in the useEffect')
            }
        }
        fetchData()
    }, [])

    return (
        <>
            <header>
                <NavBar className={styles['recipe__box--navigation']} fixed>
                    <MenuButton />
                    <Logo />
                    <div className={styles.sub__menu}>
                        <a>
                            <div data-count={count < 100 ? count : ':)'}>
                                <IconChefHat size={27} strokeWidth={1.35} />
                                <span>Recipes</span>
                            </div>
                        </a>
                        <a>
                            <div data-count={count < 100 ? count : ':)'}>
                                <IconNotebook size={27} strokeWidth={1.35} />
                                <span>Favorites</span>
                            </div>
                        </a>
                        <a>
                            <div data-count={count < 100 ? count : ':)'}>
                                <IconShoppingList />
                                <span>Shopping Lists</span>
                            </div>
                        </a>
                    </div>
                </NavBar>
            </header>

            <main className={styles['recipe__form--wrapper']}>
                <div style={{ width: '100%', backgroundColor: '#F2F3EF' }}>
                    <h2>This is your recipe box: {count}</h2>
                    <div className={styles.cards__section}>
                        {recipes.map((recipe) => <RecipeCard key={recipe._id} recipe={recipe} withTag primary />)}
                    </div>
                    <div className={styles.cards__section}>
                        {recipes.map((recipe) => <RecipeCard key={recipe._id} recipe={recipe} />)}
                    </div>
                </div>
            </main>
        </>
    )
}

export default Layout
