import Footer from "../Footer"
import Logo from "../Logo"

import styles from './styles.module.scss'

function Layout({ children }) {
    return (
        <>
            <header className={styles['auth__page--header']}>
                <Logo />
            </header>

            <main className={styles['auth__page--main']}>{children}</main>
            
            <Footer />
        </>
    )
}

export default Layout
