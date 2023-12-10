import Link from 'next/link'
import useUser from '@/hooks/useUser'
import useSWR from 'swr'

import { default as PATHS } from '../../config'
import { getRandomCardPattern } from '@/components/Card/Card.helpers'
import HomeCard from '@/components/HomeCard'
import Layout from '@/components/Layout'

export default function Home() {
  const { user } = useUser()

  const { data } = useSWR(PATHS.RECIPES.ENDPOINT)

  const content = data && data.docs.map((doc) => {
    if (!doc.photo?.url) {
      doc.photo = { url: getRandomCardPattern() }
    }
    return <HomeCard key={doc._id} recipe={doc} />
  })

  return (
    <Layout headerExtraContent={!user && <Link href="/login">Login</Link>}>
      <section className='w-full'>
       {/*  <h1 className="font-display index-heading">
          Introducing Our Cookbook
        </h1> */}
      </section>

      <section className='w-full'>
        <h2 className="font-medium pl-4 text-xs uppercase">
          Latest
        </h2>
        <ul>{content}</ul>
      </section>
    </Layout>
  )
}
