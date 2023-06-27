import React from "react"
import cx from "../utils/cx"

import styles from './styles.module.scss'

const NavLink = React.forwardRef((props, ref) => {
    const {
        active,
        className,
        href,
        label,
        onClick,
        uppercase,
        variant = 'filled',
        ...rest
    } = props

    const classes = cx([className, styles.button, styles[`button--${variant}`]])

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

export default NavLink
