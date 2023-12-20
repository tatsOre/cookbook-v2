import Head from 'next/head'
import { SWRConfig } from 'swr'
import ThemeContextProvider, { useThemeContext } from '@/context/ThemeContext'

import '@/styles/globals.scss'

export const fetcher = async (url, arg) => {
    // wait for .5s to test loading state
    process.env.NEXT_PUBLIC_NODE_ENV_FE === "development"
        && await new Promise((res) => setTimeout(res, 500))

    let options = {
        method: arg?.method || 'GET',
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    }

    if (arg?.body) {
        options = { ...options, body: arg.body }
    }

    const response = await fetch(url, options)

    if (!response.ok) {
        const error = new Error('An unexpected error has occurred. Please try later.')
        error.info = await response.json()
        error.status = response.status
        throw error
    }

    return response.json()
}

const WrappedApp = ({ Component, pageProps }) => {
    const { theme } = useThemeContext()

    return (
        <div className={`theme--${theme}`} data-theme={`theme--${theme}`}>
            <Component {...pageProps} />
        </div>
    )
}

export default function MyApp(props) {
    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <SWRConfig value={{
                fetcher: fetcher,
                revalidateOnFocus: false,
                onError: (error, key) => {
                    if (![401, 403, 404].includes(error.status)) {
                        console.log({ Err: error.message, key })
                    }
                    // handle error with UI
                }
            }}>
                <ThemeContextProvider>
                    <WrappedApp {...props} />
                </ThemeContextProvider>

            </SWRConfig>
        </>
    )
}
