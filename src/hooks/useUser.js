import Router from 'next/router'
import useSWR from 'swr'

import { default as PATHS } from '../../config'

export default function useUser() {
  const { data, mutate, error } = useSWR(PATHS.USER.GET_CURRENT)

  const loading = !data && !error

  const loggedOut = error && (
    error.status === 401 || error.status === 403
  )
  //console.log({ loading, loggedOut, user: data })

  const logout = async () => {
    const response = await fetch(PATHS.LOGOUT,
      { credentials: "include" })

    if (response.ok) {
      mutate(null)
      Router.replace("/")
    }
  }

  return {
    loading,
    loggedOut,
    user: data,
    mutate,
    logout
  }
}
