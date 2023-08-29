import Head from 'next/head'
import AuthorizationSubmission from '@/components/Auth'
import Layout from '@/components/Auth/Layout'

export const getServerSideProps = async (context) => {
    const token = context.req.cookies
    console.log({ loginToken: token })
    /*
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
    return { props: { token } }
}

function Page({ token }) {
    return <>
        <Head>
            <title>Login</title>
        </Head>
        <Layout>
            <small>TOKEN: {token?.foodie}</small>
            <AuthorizationSubmission />
        </Layout>
    </>
}

export default Page
