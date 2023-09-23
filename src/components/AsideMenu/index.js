import React from 'react'
import Link from 'next/link'
import Router from 'next/router'
import useClickOutside from '@/lib/useClickOutside'
import useUser from '@/lib/useUser'
import { IconBookmark, IconChecklist, IconChefHat, IconShoppingList } from '../Icon'
import { default as PATHS } from '../../../config'
import cx from '../utils/cx'

import styles from './AsideMenu.module.scss'

function AsideMenu({ isOpen, closeMenu }) {
    const { user, mutate } = useUser()

    const menuRef = React.useRef()

    useClickOutside(menuRef, closeMenu)

    const logout = async () => {
        const response = await fetch(PATHS.LOGOUT,
            { credentials: "include" })

        if (response.ok) {
            closeMenu()
            console.log('ok')
            mutate(null)
            Router.replace("/")
        }
    }

    return (
        <div
            ref={menuRef}
            className={cx([
                styles.menu__aside, isOpen && styles['menu__aside--open']])
            }
        >
            <nav>
                <ul>
                    {[{
                        href: '/recipe-box',
                        label: 'Recipes',
                        count: user?.recipes ?? ':)',
                        data: 'recipes',
                        icon: <IconChefHat size={22} strokeWidth={1.5} />
                    }, {
                        href: '/recipe-box/favorites',
                        label: 'Favorites',
                        count: user?.favorites?.length ?? ':)',
                        data: 'bookmarks',
                        icon: <IconBookmark size={20} strokeWidth={1.75} />
                    }, {
                        href: '/recipe-box/shopping-lists',
                        label: 'Shopping Lists',
                        count: user?.shoppingLists ?? ':)',
                        data: "shopping-lists",
                        icon: <IconChecklist size={24} strokeWidth={1.5} />
                    }].map((item, index) => {
                        const { href, label, count, data, icon } = item
                        return (
                            <li key={data}>
                                <Link href={href} key={index}>
                                    <div data-count={count < 100 ? count : ':)'}>
                                        <span data-icon={data}>{icon}</span>
                                    </div>
                                    <span>{label}</span>
                                </Link>
                            </li>
                        )
                    })}

                    <li>
                        <Link href="/new">Create recipe</Link>
                    </li>

                    <li className={styles['logout']}>
                        <button onClick={logout}>Logout</button>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default AsideMenu
