import React from 'react'
import Link from 'next/link'
import { IconBookmark, IconChefHat, IconShoppingList } from '../Icon'
import NavBar from '../Navigation'

import styles from './UserBox.module.scss'

function Layout({ children, user }) {
    return (
        <React.Fragment>
            <header>
                <NavBar />
            </header>

            <div className={styles.menu__aside}>
                {[{
                    href: '/recipe-box',
                    label: 'Recipes',
                    count: user?.recipes ?? ':)',
                    data: 'recipes',
                    icon: <IconChefHat size={29} strokeWidth={1.35} />
                }, {
                    href: '/recipe-box/favorites',
                    label: 'Favorites',
                    count: user?.favorites?.length ?? ':)',
                    data: 'bookmarks',
                    icon: <IconBookmark size={26} strokeWidth={1.75} />
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
                            </div>
                            {/** <span>{label}</span> */}
                        </Link>
                    )
                })}
            </div>
            <main>
                <section className={styles.cards__section}>
                    {children}
                </section>
            </main>

        </React.Fragment>
    )
}
/**
 
 */
export default Layout
