import React from 'react'
import Router from 'next/router'
import useSWR from 'swr'

import { default as PATHS } from '../../config'

/* export default function useUser() {
  const { data, isLoading, mutate, error } = useSWR(PATHS.USER.GET_CURRENT)

  const logout = async () => {
    const response = await fetch(PATHS.LOGOUT,
      { credentials: "include" })

    if (response.ok) {
      mutate(null)
      Router.replace("/")
    }
  }

  return {
    loading: isLoading,
    loggedOut: error && !isLoading,
    user: data,
    mutate,
    logout
  }
} */

export default function useUser({
    redirectTo = false,
    redirectIfFound = false,
} = {}) {
    const { data: user, mutate, isLoading, error } = useSWR(PATHS.USER.GET_CURRENT)
    console.log({ after: "before effect", user, error, redirectTo, redirectIfFound })
    React.useEffect(() => {
        // if no redirect needed, just return (example: already on /dashboard)
        // if user data not yet there (fetch in progress, logged in or not) then don't do anything yet
        if (!redirectTo || !user) {
            console.log("keep  loading")
            return
        }

        if (
            // If redirectTo is set, redirect if the user was not found.
            (redirectTo && !redirectIfFound && !user) ||
            // If redirectIfFound is also set, redirect if the user was found
            (redirectIfFound && user)
        ) {
            console.log("Condicional")
            console.log({ page: "use hook", user })
            Router.push(redirectTo)
        }
    }, [user, redirectIfFound, redirectTo])

    const logout = async () => {
        const response = await fetch(PATHS.LOGOUT,
            { credentials: "include" })

        if (response.ok) {
            mutate(null)
            Router.replace("/")
        }
    }

    return {
        isLoading,
        loggedOut: !user && !isLoading,
        user,
        mutateUser: mutate,
        logout
    }
}
