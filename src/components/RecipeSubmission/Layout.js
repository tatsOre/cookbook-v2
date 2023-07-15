import Link from "next/link"
import { useRouter } from "next/router"
import Alert from "../Alert"
import Button from "../Button"
import Nav from "../Box/Nav"
import NavLink from "../Button/NavLink"

import styles from './styles.module.scss'

function Layout({ children }) {
    const router = useRouter()

    return (
        <>
            <header>
                <Nav>
                    <Button variant='outline' appearance='secondary'>iii</Button>
                    <Link href='/' passHref legacyBehavior>
                        <NavLink variant='outline' appearance='secondary' label="Cookbook" uppercase />
                    </Link>

                    <Button
                        onClick={() => router.back()} u
                        ppercase
                        style={{ marginLeft: 'auto' }}
                        variant='outline'
                        appearance='secondary'
                    >
                        Cancel
                    </Button>

                    <Button
                        variant='outline'
                        appearance='secondary'
                        form="submit-recipe-form"
                        type='submit'
                        uppercase
                    >
                        Save Recipe
                    </Button>
                </Nav>
            </header>

            <main className={styles['recipe__form--wrapper']}>
                <Alert
                    style={{ marginBottom: '1rem' }}
                    appearance="info" title="* Note:" variant="outline">
                    An asterisk indicates that the field is required.
                </Alert>
                {children}
            </main>

        </>
    )
}

export default Layout
