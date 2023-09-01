import React from 'react'
import useSWR from 'swr'
import Layout from '@/components/UserBox/Layout'

import { default as PATHS } from '../../../config'
import { useRouter } from 'next/router'
import useUser from '@/lib/useUser'

function Page() {
    const { user } = useUser({ redirectTo: '/login' })
    const router = useRouter()
    const routes = router.asPath.split('/')

    if (!user) return 'Redirecting...'

    // send endpoint?
    return (
        <Layout user={user}>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: '0 auto' }}>
                Soon :)
            </p>
        </Layout>
    )
}

export default Page
