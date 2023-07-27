import Head from 'next/head'
import AuthSubmission from '@/components/Auth/AuthSubmission'
import { default as PATHS } from '../../config'

function Page() {
    return <>
        <Head>
            <title>Welcome to Cookbook</title>
        </Head>
        <AuthSubmission.Layout heading='Join Cookbook'>
            <AuthSubmission
                endpoint={PATHS.REGISTER}
                mode='register'
            />
        </AuthSubmission.Layout>
    </>
}

export default Page
