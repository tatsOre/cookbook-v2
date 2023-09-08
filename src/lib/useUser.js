import useSWR from 'swr'

import { default as PATHS } from '../../config'

export default function useUser() {
    const { data, mutate, error } = useSWR(PATHS.USER.GET_CURRENT)

    const loading = !data && !error

    const loggedOut = error && (
        error.status === 401 || error.status === 403
    )
    //console.log({ loading, loggedOut, user: data })
    return {
        loading,
        loggedOut,
        user: data,
        mutate
    }
}
