import React from "react"
import { BUTTON_APPEARANCES } from "./Button"

import styles from './Button.module.scss'
import clsx from "clsx"

const NavLink = React.forwardRef((props, ref) => {
  const {
    appearance,
    active,
    className,
    href,
    label,
    onClick,
    uppercase,
    variant,
    ...rest
  } = props

  const classes = clsx(
    className,
    styles.button,
    styles[`button--${appearance}`]
  )

  return (
    <a className={classes} href={href} onClick={onClick} ref={ref} {...rest}>
      <span
        className={styles['button--label']}
        style={{ textTransform: uppercase ? 'uppercase' : undefined }}
      >
        {label}
      </span>
    </a>

  )
})

NavLink.defaultProps = {
  appearance: BUTTON_APPEARANCES.PRIMARY,
}

export default NavLink
