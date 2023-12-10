import clsx from "clsx"
import UnstyledButton from "../Button/UnstyledButton"
import styles from './styles.module.scss'

function MenuButton({ isOpen, toggleState, ...rest }) {
  return (
    <UnstyledButton
      className={styles.button__menu}
      ariaLabel={isOpen ? 'close menu' : 'open menu'}
      aria-haspopup="true"
      aria-expanded={isOpen}
      onClick={toggleState}
      {...rest}
    >
      <span
        className={clsx(
          styles['button__menu--bar'], isOpen && styles.animate
        )}
      >
      </span>
    </UnstyledButton>
  )
}

export default MenuButton
