import styles from '../styles/globals.module.scss'
import cx from './utils/cx'

function Backdrop({ children }) {

    return (
        <div className={cx([styles.overlay__backdrop])}>
            {children}
        </div>
    )
}

export default Backdrop
