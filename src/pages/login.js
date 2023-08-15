import Head from 'next/head'
import AuthorizationSubmission from '@/components/Auth'
import Layout from '@/components/Auth/Layout'
import { default as PATHS } from '../../config'

export const getServerSideProps = async (context) => {
    /*
    const token = context.req.cookies.foodie

    if (token) {
        try {
            const response = await fetch(PATHS.USER.GET_CURRENT, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            // If token is valid and there is a user:
            if (response.ok) {
                return {
                    redirect: {
                        destination: '/',
                        permanent: false
                    }
                }
            }
        } catch (err) {
            console.log(err.message)
            //return { notFound: true }
        }
    }
    */
    return { props: {} }
}

function Page() {
    return <>
        <Head>
            <title>Login</title>
        </Head>

        <Layout>
            <AuthorizationSubmission />
        </Layout>
    </>
}

export default Page
