import styles from '../styles/globals.module.scss'
import cx from './utils/cx'

function Backdrop({ children, light }) {

    return (
        <div className={
            cx([styles.overlay__backdrop, light && styles.light])}
        >
            {children}
        </div>
    )
}

export default Backdrop
