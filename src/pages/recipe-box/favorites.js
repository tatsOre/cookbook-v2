import React from 'react'
import Router from "next/router"
import useUser from '@/hooks/useUser'
import Layout from '@/components/Layout'
import LoaderOverlay from '@/components/Loader/LoaderOverlay'
// todo: fix imports:
import UserFavoritesGrid from '@/components/UserBox/UserFavoritesGrid'

function Page() {
  const { user, isLoading, loggedOut, mutateUser } = useUser()

  if (!user && isLoading) {
    return <LoaderOverlay />
  }

  if (loggedOut) Router.replace('/login')

  return user && (
    <Layout>
      <UserFavoritesGrid />
    </Layout>
  )
}

export default Page
