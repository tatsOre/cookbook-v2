import Link from "next/link"
import { useRouter } from "next/router"
import Alert from "../Alert"
import Button from "../Button"
import Nav from "../Box/Nav"
import NavLink from "../Button/NavLink"

function Layout({ children, title }) {
    const router = useRouter()

    return (
        <>
            <header>
                <Nav className='nav__bar nav__bar--fixed'>
                    <Button>iii</Button>
                    <Link href='/' passHref legacyBehavior>
                        <NavLink label="Cookbook" uppercase />
                    </Link>

                    <Button onClick={() => router.back()} uppercase style={{ marginLeft: 'auto' }}>
                        Cancel
                    </Button>

                    <Button form="submit-recipe-form" type='submit' uppercase>
                        Save Recipe
                    </Button>
                </Nav>
            </header>

            <main>
                <Alert
                    style={{ marginTop: '6rem', marginBottom: '1rem' }}
                    appearance="info" title="* Note:" variant="outline">
                    An asterisk indicates that the field is required.
                </Alert>
                {children}
            </main>

        </>
    )
}

export default Layout
