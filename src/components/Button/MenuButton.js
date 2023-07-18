import React from "react"

import { IconTrash } from "../Icon"
import cx from "../utils/cx"

import styles from './styles.module.scss'
import UnstyledButton from "./UnstyledButton"

function MenuButton(props) {
    const { ariaLabel, className, ...rest } = props
    const [open, setOpen] = React.useState(false)

    return (
        <UnstyledButton
            className={cx([
                className,
                styles['menu--button']
            ])}
            ariaLabel={open ? 'close menu' : 'open menu'}
            onClick={() => setOpen(prevState => !prevState)}
            {...rest}
        >
            <div className={cx([styles.bar, open && styles.animate])}></div>
        </UnstyledButton>
    )
}

MenuButton.defaultProps = {
    ariaLabel: '',
}

export default MenuButton