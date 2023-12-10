import React from 'react'
import { useRouter } from 'next/router'
import clsx from 'clsx'
import useClickOutside from '@/hooks/useClickOutside'
import useUser from '@/hooks/useUser'
import Logo from './Logo'
import MenuButton from './MenuButton'
import Sidebar from './Sidebar'

function Header({ children }) {

  const [openMenu, setOpenMenu] = React.useState(false)

  const { user, logout } = useUser()

  const toggleMenuState = () => setOpenMenu(prev => !prev)

  const closeMenu = () => setOpenMenu(false)

  const menuRef = React.useRef()

  useClickOutside(menuRef, closeMenu)

  const router = useRouter()

  const isHome = router.pathname === '/'

  return (
    <header className="w-full h-[55px] fixed z-10 bg-white border-y border-black print:hidden">
      <nav className="w-full h-full flex flex-wrap items-center">
        {user ? (
          <div className="h-full border-r border-black" ref={menuRef}>
            <MenuButton
              isOpen={openMenu}
              toggleState={toggleMenuState}
            />
            <Sidebar
              user={user}
              logout={logout}
              openMenu={openMenu}
            />
          </div>
        ) : null}
        {isHome ? null : <Logo />}
        <div
          className={clsx(
            "h-full ml-auto font-display font-bold",
            "[&>button]:h-full [&>button]:px-6 [&>button]:border-l [&>button]:border-black",
            "[&>a]:h-full [&>a]:px-6 [&>a]:border-l [&>a]:border-black [&>a]:grid [&>a]:place-content-center"
          )}
        >
          {children}
        </div>
      </nav>
    </header>
  )
}

export default Header
