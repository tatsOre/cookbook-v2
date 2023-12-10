import styles from './Marquee.module.scss'

function Marquee({ text }) {
  const content = [... new Array(30)].map((_, index) =>
    <span key={index}>{text}</span>
  )

  return (
    <div className={styles.marquee} aria-hidden="true">
      <div className={styles.marquee__content}>
        <span style={{ textTransform: 'lowercase' }}>{content}</span>
      </div>
    </div>

  )
}

export default Marquee
