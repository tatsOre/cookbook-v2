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
    <Layout headerExtraContent={!user && <Link href="/login">Login/Register</Link>}>
      <section className='w-11/12 md:w-10/12 pt-12 md:pt-20 font-display'>
        <div className='ml-3 md:ml-4 max-w-prose text-balance'>
          <h1 className="index-heading font-display font-black mb-4">
            This is<br />cookbook
          </h1>

          <p className='font-bold text-lg md:text-2xl mb-4'>
            Create and manage your home-cook recipes. Save your favorites and jump right to them.
          </p>

          <p className='text-base md:text-lg leading-6'>
            Yes, no ads or long stories, —no-Frills, All Thrills.
            <br />
            <br />
            Unlock the power of your taste and unleash your inner chef!<br />
            ...Just kidding, —<span className='font-semibold italic'>or not</span>.
          </p>
        </div>
      </section>

      <section className='w-11/12 md:w-10/12 pt-10'>
        <h2 className="ml-3 md:ml-4 mb-2 md:mb-8 w-fit lowercase text-3xl md:text-6xl font-bold font-display font-condensed border-b-4 border-black">
          Latest
        </h2>
        <ul>{content}</ul>
      </section>
    </Layout>
  )
}
