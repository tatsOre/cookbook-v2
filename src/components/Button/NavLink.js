import React from "react"
import cx from "../utils/cx"
import { BUTTON_APPEARANCES, BUTTON_VARIANTS } from "."

import styles from './styles.module.scss'

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
        styles[`button--${appearance}`],
        styles[`button--${variant}`]
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
    variant: BUTTON_VARIANTS.FILLED,
}

export default NavLink