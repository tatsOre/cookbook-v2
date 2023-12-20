import React from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import useSWR from "swr"
import useUser from '@/hooks/useUser'

import Layout from '@/components/Layout';
import RecipeArticle from "@/components/RecipePage/RecipeArticle"
import { default as PATHS } from "../../constants/paths"

/**
changed the fetch data strategy to be able to request it with credentials. 
check: return to staticPaths and if data is not available to improve speed and make a second request? (?)
 */
function Page() {
  const router = useRouter()
  const { user } = useUser()
  
  const recipe = router.query['id']
  const endpoint = `${PATHS.RECIPES_ENDPOINT}/${recipe}`

  const { data, error } = useSWR(endpoint)

// If resource/recipe is forbidden (public: false) or error:
  if (error) router.push('/404')

  return (
    <Layout
      headerExtraContent={!user && <Link href="/login">Login</Link>}
    >
      <div className="w-11/12 md:w-10/12 screen:pt-12 screen:md:pt-14">
        {data && (
          <RecipeArticle data={data} isAuthor={user?._id === data.author?._id} />
        )}
      </div>
    </Layout>
  )
}

export default Page
