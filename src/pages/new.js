import React from 'react'
import Router from "next/router";
import Head from 'next/head'
import useUser from '@/hooks/useUser'
import RecipeSubmission from '@/components/RecipeSubmission'
import RecipeSubmissionProvider from '@/components/RecipeSubmission/context'
import Layout from '../components/Layout'
import Marquee from '@/components/Marquee';
import { UnstyledButton } from '@/components/Button';
import { default as PATHS } from '../../config'
import {
  default as RECIPE_FIELDS_ATTRIBUTES
} from '@/components/RecipeSubmission/constants'

export const getStaticProps = async () => {
  try {
    const response = await fetch(PATHS.RECIPE_ASSETS)
    if (response.ok) {
      const assets = await response.json()
      return { props: { assets } }
    }
    return { notFound: true }
  } catch {
    return { notFound: true }
  }
}

/**
 * @returns Page for Create New Recipe
 */

function Page({ assets }) {
  const { loggedOut } = useUser();

  // if logged out, redirect to the login
  React.useEffect(() => {
    if (loggedOut) Router.replace("/login")
  }, [loggedOut])

  if (loggedOut) return "redirecting..."

  return <>
    <Head>
      <title>Create Recipe</title>
    </Head>
    <Layout headerExtraContent={
      <UnstyledButton form="submit-recipe-form" type='submit' >
        Save
      </UnstyledButton>
    }>
      <Marquee text="what's cooking" />

      <h1 style={{ visibility: 'hidden', height: '0px' }}>Add New Recipe</h1>

      <RecipeSubmissionProvider
        value={{
          assets,
          fieldsAttributes: RECIPE_FIELDS_ATTRIBUTES,
          endpoint: PATHS.RECIPES_ENDPOINT
        }}
      >
        <RecipeSubmission endpoint={PATHS.RECIPES_ENDPOINT} />
      </RecipeSubmissionProvider>
    </Layout>
  </>
}

export default Page
