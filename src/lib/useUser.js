import React from 'react'
import Router, { useRouter } from 'next/router'
import useSWR from 'swr'

import { default as PATHS } from '../../config'

export default function useUser({
    redirectTo = '',
    redirectIfFound = false,
} = {}) {
    const { data, mutate, error } = useSWR(PATHS.USER.GET_CURRENT)

    const router = useRouter()
// https://codesandbox.io/s/swr-auth-vl653w?from-embed=&file=/pages/dashboard.js
    const loading = !data && !error;
    const loggedOut = error && error.status === 403;
  
    console.log({ loading, loggedOut, user: data })

    React.useEffect(() => {
        if (redirectTo && loggedOut) router.push(redirectTo)
    }, [loggedOut])

    return {
      loading,
      loggedOut,
      user: data,
      mutate
    };
}
 