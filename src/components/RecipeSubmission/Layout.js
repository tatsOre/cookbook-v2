import Link from "next/link"
import { useRouter } from "next/router"
import UnstyledButton from "../Button/UnstyledButton"
import NavBar from "../Navigation"
import MenuButton from "../Button/MenuButton"
import { IconArrowForward } from "../Icon"

import styles from './styles.module.scss'

function Layout({ children, title }) {
    const router = useRouter()

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
            </header>

            <main className={styles['recipe__form--wrapper']}>
                <h1 style={{
                    paddingInline: '1.5rem',
                    paddingBlockEnd: '1.25rem',
                    fontSize: '0.825rem'
                }}>
                    {title ? `Edit ${title}` : 'New Recipe'}
                </h1>

                <p style={{
                    paddingInline: '1.5rem',
                    paddingBlockEnd: '1.25rem',
                    fontSize: '0.825rem'
                }}>
                    <b>* Note:</b> An asterisk indicates that the field is required.
                </p>
                {children}
            </main>
        </>
    )
}

export default Layout
