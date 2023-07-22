
import Button from '@/components/Button'
import TextInput from '@/components/Form/TextInput'
import Login from '@/components/Login/Form'
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
              <Login />
            </main>
        </header>

    </>
}

export default Page
