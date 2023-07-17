import React from "react"
import Button from "."
import { IconTrash } from "../Icon"
import cx from "../utils/cx"

import styles from './styles.module.scss'

function DeleteButton(props) {
    const { ariaLabel, className, ...rest } = props

    return (
        <Button
            className={cx([
                className,
                styles['action--button'],
                styles['action--button__hover']
            ])}
            ariaLabel={ariaLabel}
            {...rest}>
            <IconTrash size={20} strokeWidth={1.5} />
        </Button>
    )
}

DeleteButton.defaultProps = {
    ariaLabel: 'delete button',
}

export default DeleteButton
