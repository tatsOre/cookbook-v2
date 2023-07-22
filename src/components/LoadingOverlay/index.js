import InPortal from './InPortal'
import styles from './styles.module.scss'

function LoadingOverlay() {
    return (
        <InPortal id="portal-container">
            <div className={styles.overlay__backdrop}>
                <Spinner />
            </div>
        </InPortal>
    )
}

export function Spinner() {
    return (
        <div className={styles.loader__ripple} aria-label="loading...">
            <div />
            <div />
        </div>
    )
}

export default LoadingOverlay
