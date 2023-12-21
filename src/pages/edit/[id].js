import React from 'react'
import Head from 'next/head'
import { useRouter } from "next/router";
import useSWR from 'swr';
import useUser from '@/hooks/useUser'

import LoaderOverlay from '../../components/Loader/LoaderOverlay';
import RecipeSubmission from '@/components/RecipeSubmission'
import RecipeSubmissionProvider from '@/components/RecipeSubmission/context'
import Layout from '@/components/Layout';
import Marquee from '@/components/Marquee';
import Button from '@/components/Button';
import { default as PATHS } from '../../../config'
import {
  default as RECIPE_FIELDS_ATTRIBUTES
} from '@/components/RecipeSubmission/constants'

/**
 * https://stackoverflow.com/questions/65783199/error-getstaticpaths-is-required-for-dynamic-ssg-pages-and-is-missing-for-xxx
 */
export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking"
  }
}

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
 * @returns Edit Recipe Page
 */

function Page({ assets }) {
  const router = useRouter()
  const { user, loggedOut } = useUser()

  const query = router.query['id']
  const endpoint = `${PATHS.RECIPES_ENDPOINT}/${query}`
  const { data: recipe, error } = useSWR(endpoint)

  // If user is logged out:
  if (loggedOut) router.replace('/login')

  // If resource/recipe is forbidden (public: false) or error:
  if (error) router.push('/404')

  const heading = `edit ${recipe?.title}` || 'recipe'

  return <>
    <Head>
      <title>Cookbook - Edit Recipe</title>
    </Head>
    <RecipeSubmissionProvider
      value={{
        assets,
        recipe,
        fieldsAttributes: RECIPE_FIELDS_ATTRIBUTES,
      }}
    >
      <Layout headerExtraContent={
        user
          ? <button form="submit-recipe-form" type="submit">
            Save
          </button>
          : null
      }>
        <h1 className='sr-only'>{heading}</h1>
        {user && recipe ? (
          <>
            <Marquee text={heading} />
            <RecipeSubmission
              endpoint={endpoint}
              recipe={recipe}
              isEdit
            />
          </>
        ) : <LoaderOverlay />}
      </Layout>
    </RecipeSubmissionProvider>
  </>
}

export default Page
