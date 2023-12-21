import clsx from "clsx"
//import Button from "../Button"
import styles from './styles.module.scss'

function MenuButton({ isOpen, toggleState, ...rest }) {
  return (
    <button
      className={styles.button__menu}
      aria-label={isOpen ? 'close menu' : 'open menu'}
      aria-haspopup="true"
      aria-expanded={isOpen}
      onClick={toggleState}
      unstyled
      {...rest}
    >
      <span
        className={clsx(
          styles['button__menu--bar'], isOpen && styles.animate
        )}
      >
      </span>
    </button>
  )
}

export default MenuButton
