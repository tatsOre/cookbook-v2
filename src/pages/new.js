import React from 'react'
import Head from 'next/head'
import Router from "next/router"
import useUser from '@/hooks/useUser';

import RecipeSubmissionProvider from '@/components/RecipeSubmission/context'
import Layout from '@/components/Layout';
import { UnstyledButton } from '@/components/Button';
import Marquee from '@/components/Marquee'
import RecipeSubmission from '@/components/RecipeSubmission';
import LoaderOverlay from '@/components/Loader/LoaderOverlay';

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
  const { user, loggedOut } = useUser();

  if (loggedOut) Router.replace('/login')

  return <>
    <Head>
      <title>Cookbook - Create New Recipe</title>
    </Head>
    <RecipeSubmissionProvider
      value={{
        assets,
        fieldsAttributes: RECIPE_FIELDS_ATTRIBUTES,
        endpoint: PATHS.RECIPES_ENDPOINT
      }}
    >
      <Layout headerExtraContent={
        user
          ? <UnstyledButton form="submit-recipe-form" type="submit" >
            Save
          </UnstyledButton>
          : null
      }>
        <h1 className='sr-only'>Add New Recipe</h1>
        {user ? (
          <>
            <Marquee text="what's cooking" />
            <RecipeSubmission endpoint={PATHS.RECIPES_ENDPOINT} />
          </>
        ) : <LoaderOverlay />}
      </Layout>

    </RecipeSubmissionProvider>
  </>
}

export default Page
