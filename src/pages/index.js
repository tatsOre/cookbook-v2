import Link from 'next/link'
import MenuButton from '@/components/Button/MenuButton'
import Logo from '@/components/Logo'
import Marquee from '@/components/Marquee'
import NavBar from '@/components/Navigation'
import Head from 'next/head'
import useUser from '@/lib/useUser'
import  Router  from 'next/router'
import useSWR from 'swr'
import { getRandomCardPattern } from '@/components/RecipeCard/utils'
import { default as PATHS } from '../../config'
import RecipeCard from '@/components/RecipeCard/RecipeCard'

export default function Home() {
    const { user, mutate } = useUser()

    const { data: items } = useSWR(PATHS.RECIPES.ENDPOINT)

    const recipes = items && items.docs.map((item) => {
        if (!item.photo) {
            item.photo = getRandomCardPattern()
        }
        return <RecipeCard key={item._id} recipe={item} primary withTag />
    })

    const logout = async () => {
        const response = await fetch(PATHS.LOGOUT, 
        { credentials: "include" })

        if (response.ok) {
            console.log('ok')
        }
    }

    const containerStyles = {
        display: 'flex',
        flexFlow: 'row wrap',
        gap: "1rem",
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
                    <h1>Welcome, {user?.email}</h1>

                    <div style={containerStyles}>
                        {recipes && recipes.length && recipes}
                    </div>
                </div>

            </main>
        </>
    )
}



