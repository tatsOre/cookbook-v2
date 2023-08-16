import React from "react"
import UnstyledButton from "../UnstyledButton"
import cx from "@/components/utils/cx"
import styles from './MenuButton.module.scss'

/** Will handle parents state: Nav, Asides, etc */

function MenuButton({ open = false, handleClick, ...rest }) {
    const [active, setActive] = React.useState(open)

    const onClick = () => setActive(state => !state)

    return (
        <UnstyledButton
            className={styles.button__menu}
            ariaLabel={active ? 'close menu' : 'open menu'}
            onClick={onClick}
            {...rest}
        >
            <div
                className={cx([
                    styles['button__menu--bar'], active && styles.animate
                ])}
            >
            </div>
        </UnstyledButton>
    )
}

export default MenuButton
