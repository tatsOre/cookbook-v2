import React from "react"
import cx from "../utils/cx"
import { BUTTON_APPEARANCES } from "./Button"

import styles from './Button.module.scss'

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

    const classes = cx([
        className,
        styles.button,
        styles[`button--${appearance}`]
    ])

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
