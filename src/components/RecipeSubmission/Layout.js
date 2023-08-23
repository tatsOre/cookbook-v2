import { useRouter } from "next/router"
import Logo from "../Logo"
import Marquee from "../Marquee"
import MenuButton from "../Button/MenuButton"
import NavBar from "../Navigation"
import { IconArrowForward } from "../Icon"
import Footer from "../Footer"
import UnstyledButton from "../Button/UnstyledButton"

import styles from './styles.module.scss'

function Layout({ children, title, mode }) {
    const router = useRouter()

    const heading = mode == 'edit' ? title : "what's cooking"

    return (
        <>
            <header>
                <NavBar className={styles['recipe__sub--navigation']} fixed>
                    <MenuButton />
                    <Logo />
                    <UnstyledButton onClick={() => router.back()}>
                        <span><IconArrowForward /></span><span>go back</span>
                    </UnstyledButton>

                    <UnstyledButton form="submit-recipe-form" type='submit'>
                        Save
                    </UnstyledButton>
                </NavBar>

                <Marquee text={heading} />

                <h1 style={{ visibility: 'hidden', height: '0px' }}>{heading}</h1>
            </header>

            <main className={styles['recipe__form--wrapper']}>
                <p><b>* Note:</b> An asterisk indicates that the field is required.</p>
                {children}
            </main>
            <Footer />
        </>
    )
}

export default Layout
