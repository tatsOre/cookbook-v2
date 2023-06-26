import Link from "next/link"
import Nav from "../Box/Nav"
import Button from "../Button"
import NavLink from "../Button/NavLink"

function Layout({ children }) {
    const title = "New Friend." // temporary, will come from context.

    return (
        <>
            <header>
                <Nav className='nav__bar'>
                    <Button>iii</Button>
                    <Link href='/' passHref legacyBehavior>
                        <NavLink label="Cookbook" uppercase />
                    </Link>

                    <Link href='/' passHref legacyBehavior>
                        <NavLink label="Cancel" style={{ marginLeft: 'auto' }} uppercase />
                    </Link>

                    <Button form="submit-recipe-form" type='submit' uppercase>
                        Save Recipe
                    </Button>
                </Nav>
            </header>
            <main>
                <h1 style={{ marginBlockStart: '6rem', marginBlockEnd: '0.75rem' }}>{title}</h1>
                <p style={{ marginBlockEnd: '1rem', fontSize: '14px' }}>
                    <b>* Note:</b> An asterisk indicates that the field is required.
                </p>
                {children}
            </main>

        </>
    )

}

export default Layout
