
import Button from '@/components/Button'
import {  IconCheck } from '@/components/Icon/icons'

import IconGridDots from '@/components/Icon/icons/icon-grid-dots'
import IconTrash from '@/components/Icon/icons/icon-trash'
import Head from 'next/head'
import Link from 'next/link'

export default function Home() {

  return (
    <>
      <Head>
        <title>Cookbook V2</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>

        <hr />
        <Link href="/new">Create recipe</Link>

        <Button leftIcon={<IconGridDots />}>Button</Button>
        <Button rightIcon={<IconGridDots />}>Button</Button>
        <Button leftIcon={<IconGridDots />} rightIcon={<IconGridDots />}>Button</Button>

        <Button variant='outline' leftIcon={<IconGridDots />}>Button</Button>

        <Button leftIcon={<IconCheck />}>Button</Button>
        <Button rightIcon={<IconCheck />}>Button</Button>
        <Button leftIcon={<IconCheck />} rightIcon={<IconCheck />}>Button</Button>

        <Button variant='outline' leftIcon={<IconCheck />}>Button</Button>
        <Button variant='outline' rightIcon={<IconCheck />}>Button</Button>
        <Button variant='outline' leftIcon={<IconCheck />} rightIcon={<IconCheck />}>Button</Button>
      </main>
    </>
  )
}
