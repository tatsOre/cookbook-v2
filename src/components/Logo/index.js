import Link from 'next/link'
import styles from './Logo.module.scss'

function Logo() {
    return (
        <Link data-info="logo" href='/'>
            <div className={styles.logo}>
                <span>cookbook</span>
            </div>
        </Link>
    )
}

export default Logo
