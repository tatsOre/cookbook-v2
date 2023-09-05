import Link from 'next/link'
import MenuButton from '@/components/Button/MenuButton'
import Logo from '@/components/Logo'
import Marquee from '@/components/Marquee'
import NavBar from '@/components/Navigation'
import Head from 'next/head'
import useUser from '@/lib/useUser'
import Router from 'next/router'
import useSWR from 'swr'
import { default as PATHS } from '../../config'

export default function Home() {
    const { user, mutate } = useUser()

    const { data } = useSWR(PATHS.RECIPES.ENDPOINT)

    const recipes = data && data.docs.map((item) => {
        return <li key={item._id}><small>{item._id}:</small> <b>{item.title}</b></li>
    })

    const logout = async () => {
        const response = await fetch(PATHS.LOGOUT,
            { credentials: "include" })

        if (response.ok) {
            console.log('ok')
        }
    }

    const containerStyles = {
        marginBlockStart: "2rem",
    }

    return (
        <>
            <Head>
                <title>Cookbook</title>
            </Head>

            <header>
                <NavBar fixed>
                    {user ? (
                        <>
                            <MenuButton />
                            <Logo />
                            <Link href="/new">Create recipe</Link>
                            <Link href="/recipe-box">Your box</Link>
                            <button onClick={() => {
                                logout()
                                mutate(null)
                                Router.replace("/")
                            }}>Logout</button>
                        </>
                    ) : (
                        <>
                            <Logo />
                            <Link href="/login">Login</Link>
                        </>
                    )}
                </NavBar>
                <Marquee text="this is nonsense" />
            </header>

            <main>
                <div style={{
                    width: '100%',
                    height: '100%',
                    backgroundColor: '#F2F3EF',
                    padding: '2rem'
                }}>
                    <h1>Hello{user && ', '}{user?.email}!</h1>

                    <ul style={containerStyles}>
                        {recipes?.length && recipes}
                    </ul>
                </div>

            </main>
        </>
    )
}
