import Footer from "../Footer"
import Logo from "../Logo"

function Layout({ children }) {
    return (
        <>
            <header>
                <Logo />
            </header>

            <main>{children}</main>
            <Footer />
        </>
    )
}

export default Layout
