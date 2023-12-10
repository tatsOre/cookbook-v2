import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'
import { IconBookmark, IconChecklist, IconChefHat, IconNotebook } from '../Icon'
import { UnstyledButton } from '../Button'

import styles from './Sidebar.module.scss'

function Sidebar({ user, openMenu, logout }) {
  const classes = clsx(styles.sidebar, openMenu && styles['sidebar--open'])

  return (
    <div className={classes}>
      <div>
        {user?.avatar
          && <Image height={30} width={30} src={user.avatar} alt={user.name} />}
        <p>
          {user?.name
            ? `Hello, ${user?.name.split(' ')[0]}!`
            : `You are logged in as ${user?.email}`
          }
        </p>
      </div>

      <ul>
        {[{
          href: '/recipe-box',
          label: 'Recipes',
          count: user?.recipes ?? ':)',
          data: 'recipes',
          icon: <IconChefHat size={20} strokeWidth={1.5} />
        }, {
          href: '/recipe-box/favorites',
          label: 'Favorites',
          count: user?.favorites?.length ?? ':)',
          data: 'bookmarks',
          icon: <IconBookmark size={18} strokeWidth={1.75} />
        }].map((item, index) => {
          const { href, label, count, data, icon } = item
          return (
            <li key={data}>
              <Link href={href} key={index}>
                <div data-count={count < 100 ? count : ':)'}>
                  <span data-icon={data}>{icon}</span>
                </div>
                <span>{label}</span>
              </Link>
            </li>
          )
        })}

        <li>
          <Link href="/new">
            <span>Add New Recipe</span>
          </Link>
        </li>

        <li>
          <Link href="/account">My Account</Link>
        </li>

        <li>
          <UnstyledButton onClick={logout}>Logout</UnstyledButton>
        </li>
      </ul>
    </div>
  )
}

export default Sidebar

/**
, {
                            href: '/recipe-box/shopping-lists',
                            label: 'Shopping Lists',
                            count: user?.shoppingLists ?? ':)',
                            data: "shopping-lists",
                            icon: <IconChecklist size={24} strokeWidth={1.5} />
                        }
 */