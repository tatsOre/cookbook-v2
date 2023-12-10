import styles from './styles.module.scss'

function Loader({ props }) {
  return <span className={styles.loader} {...props}></span>
}

export default Loader
