import Link from "next/link"
import { useRouter } from "next/router"
import Button from "../Button"
import Nav from "../Box/Nav"
import NavLink from "../Button/NavLink"

import styles from './styles.module.scss'
import UnstyledButton from "../Button/UnstyledButton"

function Layout({ children }) {
    const router = useRouter()

    return (
        <>
            <header>
                <Nav>
                    <UnstyledButton variant='outline' appearance='secondary'>iii</UnstyledButton>

                    <Link href='/' passHref legacyBehavior>
                        <UnstyledButton>My Cookbook</UnstyledButton>
                    </Link>

                    <UnstyledButton
                        onClick={() => router.back()}
                        style={{ marginLeft: 'auto' }}
                    >
                        go back
                    </UnstyledButton>

                    <UnstyledButton
                        form="submit-recipe-form"
                        type='submit'
                    >
                        Save
                    </UnstyledButton>
                </Nav>
            </header>

            <main className={styles['recipe__form--wrapper']}>
                <p style={{ paddingInline: '1.5rem', paddingBlockEnd: '1.25rem', fontSize: '0.825rem' }}>
                    <b>* Note:</b> An asterisk indicates that the field is required.
                </p>
                {children}
            </main>
        </>
    )
}

export default Layout
