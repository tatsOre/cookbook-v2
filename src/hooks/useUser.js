import React from 'react'
import Router from 'next/router'
import useSWR from 'swr'

import { default as PATHS } from '../../config'

export default function useUser() {
    const { data: user, mutate, isLoading, error } = useSWR(PATHS.USER.GET_CURRENT)

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
        loggedOut: !user && error,
        user,
        mutateUser: mutate,
        logout
    }
}
