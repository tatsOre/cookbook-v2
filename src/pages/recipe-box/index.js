import React from 'react'
import Router from "next/router"
import useUser from '@/hooks/useUser'
import Layout from '@/components/Layout'
import LoaderOverlay from '@/components/Loader/LoaderOverlay'
import UserRecipes from '@/components/UserRecipes'
import UserRecipesGrid from '@/components/UserBox/UserRecipesGrid'


function Page() {
  const { user, isLoading, loggedOut, mutateUser } = useUser()

  if (!user && isLoading) {
    return <LoaderOverlay />
  }

  if (loggedOut) Router.replace('/login')

  return user && (
    <Layout>
      {/* <UserRecipes mutateUser={mutateUser} /> */}
      <UserRecipesGrid mutateUser={mutateUser} />
    </Layout>
  )
}

export default Page
