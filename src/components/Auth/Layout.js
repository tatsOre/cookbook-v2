import Link from "next/link"
import { useRouter } from "next/router"
import UnstyledButton from "../Button/UnstyledButton"
import NavBar from "../Navigation"
import Footer from "../Box/Footer"

import styles from './styles.module.scss'

function Layout({ children, heading }) {
    return (
        <>
            <header style={{ width: '340px', margin: '0 auto' }}>
                <nav>
                    <Link href='/' passHref legacyBehavior>
                        <UnstyledButton>My Cookbook</UnstyledButton>
                    </Link>
                </nav>

                <h1>{heading}</h1>
            </header>

            <main style={{ width: '340px', margin: '0 auto' }}>
                {children}
            </main>
            <Footer />
        </>
    )
}

export default Layout
