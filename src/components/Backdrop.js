import clsx from 'clsx'
import styles from '../styles/globals.module.scss'

function Backdrop({ children, light }) {
  const classes = clsx(styles.overlay__backdrop, light && styles.light)

  return <div className={classes}> {children} </div>
}

export default Backdrop
