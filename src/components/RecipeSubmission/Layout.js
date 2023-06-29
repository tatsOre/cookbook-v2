import Link from "next/link"
import { useRouter } from "next/router"
import Nav from "../Box/Nav"
import Button from "../Button"
import NavLink from "../Button/NavLink"

function Layout({ children, title }) {
    const router = useRouter()

    return (
        <>
            <header>
                <Nav className='nav__bar'>
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
            <div style={{
                marginBlockStart: '4.1rem', height: '60px',
                background: 'black', fontSize: '3rem', overflow: 'hidden',
                fontWeight: 'bold'
            }}>
                <div style={{ color: 'white', opacity: '0.2' }}>new recipe ✘ new recipe ✘ new recipe ✘ new recipe ✘ new recipe ✘ new recipe</div>
            </div>
            <main>
                <div style={{ border: '2px dotted grey', marginBlock: '1rem', padding: '0.75rem 1.5rem' }}>
                    <p style={{ fontSize: '14px' }}>
                        <b>* Note:</b> An asterisk indicates that the field is required.
                    </p>
                </div>
                {children}
            </main>

        </>
    )

}

export default Layout
