import Link from "next/link"
import { useRouter } from "next/router"
import useDeviceDetect from "../hooks/useDeviceDetect"
import UnstyledButton from "../Button/UnstyledButton"
import NavBar from "../Navigation"

import styles from './styles.module.scss'
import { IconArrowDownRight, IconArrowForward, IconArrowNarrowRight } from "../Icon"
import MenuButton from "../Button/MenuButton"

function Layout({ children }) {
    const router = useRouter()
    const { isMobile } = useDeviceDetect()

    return (
        <>
            <header>
                <NavBar className={styles.navigation__bar}>
                    <MenuButton />

                    <Link href='/' passHref legacyBehavior>
                        <UnstyledButton>My Cookbook</UnstyledButton>
                    </Link>

                    <UnstyledButton onClick={() => router.back()}>
                        <span><IconArrowForward /></span><span>go back</span>
                    </UnstyledButton>

                    <UnstyledButton form="submit-recipe-form" type='submit'>
                        Save
                    </UnstyledButton>
                </NavBar>
            </header>

            <main className={styles['recipe__form--wrapper']}>
                <p style={{ paddingInline: '1.5rem', paddingBlockEnd: '1.25rem', fontSize: '0.825rem' }}>
                    <b>* Note:</b> An asterisk indicates that the field is required.
                </p>
                {children}
            </main>
        </>
    )
}

export default Layout
