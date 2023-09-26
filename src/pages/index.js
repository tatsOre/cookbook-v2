import Link from 'next/link'
import Head from 'next/head'
import useUser from '@/lib/useUser'
import useSWR from 'swr'
import Layout from '@/components/Layout'
import { default as PATHS } from '../../config'
import FavoriteCard from '@/components/Card/FavoriteCard'
import { getRandomCardPattern } from '@/components/Card/Card.helpers'

export default function Home() {
    const { user } = useUser()

    const { data } = useSWR(PATHS.RECIPES.ENDPOINT)

    const content = data && data.docs.map((item) => {
        !item.photo && (item.photo = getRandomCardPattern())
        return <FavoriteCard key={item._id} recipe={item} />
    })

    const containerStyles = {
        width: '100%',
        display: 'flex',
        flexFlow: 'row wrap',
        gap: '0.75rem',
        padding: '1rem'
    }

    return (
        <>
            <Head>
                <title>Cookbook</title>
            </Head>

            <Layout headerExtraContent={!user && <Link href="/login">Login</Link>}>
                <h1 style={{ fontSize: '1.3rem', marginBlockStart: '1rem' }}>Hello{user && ', '}
                    <span>{user?.email}!</span>
                </h1>
                <div style={containerStyles}>{content}</div>
            </Layout>
        </>
    )
}
