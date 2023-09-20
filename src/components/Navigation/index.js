import Logo from '../Logo'
import { MenuButton } from '../Button'
import useUser from '@/lib/useUser'
import cx from '../utils/cx'

import styles from './Navigation.module.scss'

function NavBar({ className, children }) {
    const { user } = useUser()
    return (
        <nav className={cx([className, styles.nav__bar])}>
            {user && <MenuButton />}
            <Logo />
            {children}
        </nav>
    )
}

export default NavBar
