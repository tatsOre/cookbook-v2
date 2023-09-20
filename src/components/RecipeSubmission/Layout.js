import Marquee from "../Marquee"
import NavBar from "../Navigation"
import Footer from "../Footer"
import { UnstyledButton } from "../Button"

function Layout({ children, title, mode }) {
    const heading = mode == 'edit' ? title || 'edit recipe' : "what's cooking"

    return (
        <>
            <header>
                <NavBar>
                    <UnstyledButton form="submit-recipe-form" type='submit' >
                        Save
                    </UnstyledButton>
                </NavBar>
            </header>

            <main>
                <Marquee text={heading} />

                <h1 style={{ visibility: 'hidden', height: '0px' }}>{heading}</h1>

                {children}
            </main>
            <Footer />
        </>
    )
}

export default Layout
