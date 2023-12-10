import React from 'react'
import useUser from '@/hooks/useUser'
import Sidebar from '../Sidebar'
import Logo from '../Logo'

import styles from './Header.module.scss'

function Header({ children }) {
  const { user, mutate } = useUser()

  return (
    <header className={styles.header}>
      {user && <Sidebar user={user} mutateUser={mutate} />}
      <Logo />
      <div className={styles.children__section}>{children}</div>
    </header>
  )
}

export default Header
