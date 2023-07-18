
import LoginSubmission from '@/components/Login/LoginSubmission'
import Head from 'next/head'
import Link from 'next/link'

function Page() {
    return <>
        <Head>
            <title>Welcome</title>
        </Head>
        <header>
            <main>
                <h1 style={{ marginBlockStart: '6rem', marginBlockEnd: '0.75rem' }}>Register Page</h1>
                <LoginSubmission />
            </main>
        </header>

    </>
}

export default Page
