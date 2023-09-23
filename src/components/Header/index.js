import React from 'react'
import useUser from '@/lib/useUser'
import AsideMenu from '../AsideMenu'
import Logo from '../Logo'
import { MenuButton } from '../Button'

import styles from './Header.module.scss'

function Header({ children }) {
    const [openMenu, setOpenMenu] = React.useState(false)

    const { user } = useUser()

    const toggleMenuState = () => setOpenMenu(!openMenu)

    return (
        <header className={styles.header}>
            {user && <MenuButton isOpen={openMenu} toggleState={toggleMenuState} />}
            <AsideMenu isOpen={openMenu} closeMenu={() => setOpenMenu(false)} />
            <Logo />
            <div className={styles.children__section}>{children}</div>
        </header>
    )
}

export default Header
