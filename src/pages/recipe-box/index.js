import React from 'react'
import Router from "next/router"
import useUser from '@/hooks/useUser'
import Layout from '@/components/Layout'
import LoaderOverlay from '@/components/Loader/LoaderOverlay'
// todo: fix imports:
// It has been decided to separate the pages to unmount the floating menu.
import UserRecipesGrid from '@/components/UserBox/UserRecipesGrid'

function Page() {
  const { user, isLoading, loggedOut, mutateUser } = useUser()

  if (!user && isLoading) {
    return <LoaderOverlay />
  }

  if (loggedOut) Router.replace('/login')

  return user && (
    <Layout>
      <UserRecipesGrid mutateUser={mutateUser} />
    </Layout>
  )
}

export default Page
