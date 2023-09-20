import Link from 'next/link'
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
                <NavBar>
                    {!user && <Link href="/login">Login</Link>}
                </NavBar>
            </header>

            <main>
                <div>

                    <Link href="/new">Create recipe</Link>
                    <Link href="/recipe-box">Your box</Link>

                    <button onClick={() => {
                        logout()
                        mutate(null)
                        Router.replace("/")
                    }}>Logout</button>
                </div>

                <h1>Hello{user && ', '}{user?.email}!</h1>
                <ul style={containerStyles}>
                    {recipes?.length && recipes}
                </ul>
            </main>
        </>
    )
}
