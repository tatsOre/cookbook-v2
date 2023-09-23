import Link from 'next/link'
import Head from 'next/head'
import useUser from '@/lib/useUser'
import useSWR from 'swr'
import { default as PATHS } from '../../config'
import Header from '@/components/Header'

export default function Home() {
    const { user } = useUser()

    const { data } = useSWR(PATHS.RECIPES.ENDPOINT)

    const recipes = data && data.docs.map((item) => {
        return <li key={item._id}><small>{item._id}:</small> <b>{item.title}</b></li>
    })


    const containerStyles = {
        marginBlockStart: "2rem",
    }

    return (
        <>
            <Head>
                <title>Cookbook</title>
            </Head>

            <Header>
                {!user && <Link href="/login">Login</Link>}
            </Header>

            <main style={{ padding: '1rem' }}>
                <h1 style={{fontSize: '1.3rem'}}>Hello{user && ', '}
                    <span>{user?.email}!</span>
                </h1>
                <ul style={containerStyles}>
                    {recipes?.length && recipes}
                </ul>
            </main>
        </>
    )
}
