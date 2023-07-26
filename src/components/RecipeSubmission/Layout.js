import Link from "next/link"
import { useRouter } from "next/router"
import UnstyledButton from "../Button/UnstyledButton"
import NavBar from "../Navigation"
import MenuButton from "../Button/MenuButton"
import { IconArrowForward } from "../Icon"

import styles from './styles.module.scss'

function Layout({ children, title }) {
    const router = useRouter()

    const heading = title ? `edit ${title.toLowerCase()}` : 'new recipe'

    return (
        <>
            <header>
                <NavBar className={styles.navigation__bar}>
                    <MenuButton />

                    <Link href='/' passHref legacyBehavior>
                        <UnstyledButton>My Cookbook</UnstyledButton>
                    </Link>

                    <UnstyledButton onClick={() => router.back()}>
                        <span><IconArrowForward /></span><span>go back</span>
                    </UnstyledButton>

                    <UnstyledButton form="submit-recipe-form" type='submit'>
                        Save
                    </UnstyledButton>
                </NavBar>

                <div className={styles.marquee} aria-hidden="true">
                    <div className={styles.marquee__content}>
                        {[... new Array(50)].map((_, index) => <span key={index}>{heading}</span>)}
                    </div>
                </div>

                <h1 style={{ visibility: 'hidden' }}>{heading}</h1>
            </header>

            <main className={styles['recipe__form--wrapper']}>
                <p><b>* Note:</b> An asterisk indicates that the field is required.</p>
                {children}
            </main>
        </>
    )
}

export default Layout
