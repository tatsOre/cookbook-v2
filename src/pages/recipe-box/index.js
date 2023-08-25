import Layout from '@/components/UserBox'
import { default as PATHS } from '../../../config'

export const getServerSideProps = async (context) => {
    try {
        const response = await fetch(PATHS.RECIPES_ENDPOINT, {
            credentials: "include"
        })

        if (response.ok) {
            const { data } = await response.json()
            return { props: { data } }
        }
        return { notFound: true }

    } catch (err) {
        console.log(err.message)
        return { notFound: true }
    }
}

function Page({ data }) {
    return (
        <>
            <Layout recipes={data} />
        </>
    )
}

export default Page
