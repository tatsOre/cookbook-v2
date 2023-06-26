import styles from './styles.module.scss'

function Spinner() {
    return (
        <div className={styles['lds-ripple']} aria-label="loading...">
            <div />
            <div />
        </div>
    )
}

export default Spinner
