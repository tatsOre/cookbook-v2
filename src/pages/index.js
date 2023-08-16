import Head from 'next/head'
import Link from 'next/link'

export default function Home() {


    return (
        <>
            <Head>
                <title>Cookbook V2</title>
            </Head>
            <main>
                <nav>
                    <Link href="/new">Create recipe</Link>
                    <Link href="/login">Login</Link>
                    <Link href="/recipe-box">Your box</Link>
                </nav>
            </main>
        </>
    )
}
