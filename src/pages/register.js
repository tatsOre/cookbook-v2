import Nav from '@/components/Box/Nav'
import NavLink from '@/components/Button/NavLink'
import LoginSubmission from '@/components/Login/LoginSubmission'
import Head from 'next/head'
import Link from 'next/link'

function Page() {
    return <>
        <Head>
            <title>New Recipe</title>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <header>
            <Nav className='nav__bar'>
                <Link href='/' passHref legacyBehavior>
                    <NavLink label="Cookbook" uppercase />
                </Link>
            </Nav>
            <main>
                <h1 style={{ marginBlockStart: '6rem', marginBlockEnd: '0.75rem' }}>Register Page</h1>
                <LoginSubmission />
            </main>
        </header>

    </>
}

export default Page
