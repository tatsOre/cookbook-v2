import Link from "next/link"
import UnstyledButton from "../Button/UnstyledButton"
import Footer from "../Box/Footer"

import styles from './styles.module.scss'

function Layout({ children }) {
    return (
        <>
            <header style={{ textAlign: 'center' }}>
                <nav style={{ borderBottom: '1px solid black' }}>
                    <Link href='/' passHref legacyBehavior>
                        <UnstyledButton>My Cookbook</UnstyledButton>
                    </Link>
                </nav>
            </header>

            <main style={{ width: '340px', margin: '0 auto' }}>
                {children}
            </main>
            <Footer />
        </>
    )
}

export default Layout
