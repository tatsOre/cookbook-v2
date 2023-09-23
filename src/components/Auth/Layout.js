import Footer from "../Footer"
import Logo from "../Logo"

function Layout({ children }) {
    return (
        <>
            <header style={{ position: 'fixed', display: 'flex', justifyContent: 'center', height: '55px', width: '100%' }}>
                <Logo />
            </header>

            <main style={{ backgroundColor: '#F8F9F7' }}>{children}</main>
            <Footer />
        </>
    )
}

export default Layout
