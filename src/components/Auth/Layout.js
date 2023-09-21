import Footer from "../Footer"
import Logo from "../Logo"

function Layout({ children }) {
    return (
        <>
            <header style={{ display: 'flex', justifyContent: 'center' }}>
                <Logo />
            </header>

            <main style={{ backgroundColor: '#F8F9F7' }}>{children}</main>
            <Footer />
        </>
    )
}

export default Layout
