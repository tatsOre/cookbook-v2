import Head from 'next/head'
import AuthorizationSubmission from '@/components/Auth'
import Layout from '@/components/Auth/Layout'

function Page() {
    return <>
        <Head>
            <title>Welcome to Cookbook</title>
        </Head>
        <Layout>
            <AuthorizationSubmission />
        </Layout>
    </>
}

export default Page
