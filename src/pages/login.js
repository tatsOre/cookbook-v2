import Head from 'next/head'
import AuthSubmission from '@/components/Auth/AuthSubmission'
import { default as PATHS } from '../../config'

function Page() {
    return <>
        <Head>
            <title>Welcome Again.</title>
        </Head>
        <AuthSubmission.Layout heading='Welcome Back'>
            <AuthSubmission
                endpoint={PATHS.LOGIN}
                mode='login'
            />
        </AuthSubmission.Layout>
    </>
}

export default Page
