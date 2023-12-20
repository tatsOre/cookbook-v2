import React from 'react'
import Router from "next/router"
import useUser from '@/hooks/useUser'
import AuthorizationSubmission from '@/components/Auth'
import Layout from '@/components/Layout'

function Page() {
  const { user, loggedOut } = useUser()

  if (user) Router.replace('/recipe-box')

  return loggedOut && (
    <Layout>
      <AuthorizationSubmission />
    </Layout>
  )
}

export default Page
