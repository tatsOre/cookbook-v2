import cx from '../utils/cx'
import styles from './Navigation.module.scss'

function NavBar({ className, children, fixed }) {
    const classes = cx([
        className,
        styles.nav__bar,
        fixed && styles['nav__bar--fixed']
    ])
    return <nav className={classes}>{children}</nav>
}

export default NavBar
