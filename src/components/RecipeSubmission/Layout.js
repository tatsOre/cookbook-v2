import Footer from "../Footer"
import Header from "../Header"
import Marquee from "../Marquee"
import { UnstyledButton } from "../Button"

function Layout({ children, title, mode }) {
    const heading = mode == 'edit' ? title || 'edit recipe' : "what's cooking"

    return (
        <>
            <Header>
                <UnstyledButton form="submit-recipe-form" type='submit' >
                    Save
                </UnstyledButton>
            </Header>

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
