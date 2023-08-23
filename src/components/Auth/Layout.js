import NavBar from "../Navigation"
import Footer from "../Footer"
import Logo from "../Logo"

function Layout({ children }) {
    return (
        <>
            <header>
                <NavBar>
                    <div style={{ margin: '1rem auto' }}><Logo /></div>
                </NavBar>
            </header>

            <main>{children}</main>
            <Footer />
        </>
    )
}

export default Layout
