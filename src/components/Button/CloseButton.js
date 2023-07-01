import React from "react"
import cx from "../utils/cx"
import UnstyledButton from "./UnstyledButton"
import { IconCross } from "../Icon"

import styles from './styles.module.scss'

function CloseButton(props) {
    const { ariaLabel, className, size, ...rest } = props
    const sizeOptions = { sm: 18, md: 22, lg: 26 }

    return (
        <UnstyledButton
            className={cx([className, styles['button__icon--close']])}
            ariaLabel={ariaLabel}
            {...rest}>
            <IconCross size={sizeOptions[size]} />
        </UnstyledButton>
    )
}

CloseButton.defaultProps = {
    ariaLabel: 'close button',
    size: 'sm'
}

export default CloseButton
