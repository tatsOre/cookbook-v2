import Backdrop from '../Backdrop'
import InPortal from '../InPortal'
import styles from './styles.module.scss'

function LoadingSpinnerOverlay() {
    return (
        <InPortal id="portal-container">
            <Backdrop>
                <div className={styles.loader__ripple} aria-label="loading...">
                    <div />
                    <div />
                </div>
            </Backdrop>
        </InPortal>
    )
}

export default LoadingSpinnerOverlay
