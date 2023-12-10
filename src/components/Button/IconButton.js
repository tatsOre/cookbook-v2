import clsx from "clsx"

import UnstyledButton from "./UnstyledButton"

import styles from './Button.module.scss'

function IconButton({ icon, className, small, ...rest }) {
  const classes = clsx([styles['icon--button'], small && styles['icon--small'], className])
  return (
    <UnstyledButton
      className={classes}
      {...rest}>
      {icon}
    </UnstyledButton>
  )
}

export default IconButton
