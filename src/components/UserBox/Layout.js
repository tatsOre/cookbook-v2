import React from 'react'
import Link from 'next/link'
import Logo from '../Logo'
import { IconBookmark, IconChefHat, IconShoppingList } from '../Icon'
import { MenuButton } from '../Button'
import NavBar from '../Navigation'

import styles from './UserBox.module.scss'

function Layout({ children, user }) {
    return (
        <React.Fragment>
            <header>
                <NavBar className={styles['recipe__box--navigation']} fixed>
                    <MenuButton />
                    <Logo />
                    <div className={styles.sub__menu}>
                        {[{
                            href: '/recipe-box',
                            label: 'Recipes',
                            count: user?.recipes ?? ':)',
                            data: 'recipes',
                            icon: <IconChefHat size={28} strokeWidth={1.35} />
                        }, {
                            href: '/recipe-box/favorites',
                            label: 'Favorites',
                            count: user?.favorites?.length ?? ':)',
                            data: 'bookmarks',
                            icon: <IconBookmark size={25} strokeWidth={1.75} />
                        }, {
                            href: '/recipe-box/shopping-lists',
                            label: 'Shopping Lists',
                            count: user?.shoppingLists ?? ':)',
                            data: "shopping-lists",
                            icon: <IconShoppingList />
                        }].map((item, index) => {
                            const { href, label, count, data, icon } = item
                            return (
                                <Link href={href} key={index}>
                                    <div data-count={count < 100 ? count : ':)'}>
                                        <span data-icon={data}>{icon}</span>
                                        <span>{label}</span>
                                    </div>
                                </Link>
                            )
                        })}
                    </div>
                </NavBar>
            </header>

            <main>
                <div className={styles.cards__section}>
                    {children}
                </div>
            </main>
        </React.Fragment>
    )
}

export default Layout
