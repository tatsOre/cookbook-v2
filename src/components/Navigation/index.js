import cx from '../utils/cx'
import styles from './styles.module.scss'

function NavBar({ className, children }) {
    return <nav className={cx([styles.nav__bar, className])}>{children}</nav>
}

export default NavBar
// const NavTabs