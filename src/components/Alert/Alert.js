import React from 'react'
import PropTypes from 'prop-types'
import UnstyledButton from '../Button/UnstyledButton'
import { IconCross } from '../Icon'
import cx from '@/components/utils/cx'
import { ALERT_APPEARANCES, ALERT_VARIANTS } from './Alert.constants'

import styles from './Alert.module.scss'

function Alert(props) {
    const [_, setOpen] = React.useState(true)

    const {
        className,
        title,
        children,
        icon,
        onClose,
        removable,
        closeLabel,
        show,
        variant,
        appearance,
        ...rest
    } = props

    const onCloseHandler = () => onClose ? onClose() : setOpen(false)

    const _id = React.useId()
    const label = title && `alert-${_id}-label`
    const describedby = `alert-${_id}-description`

    const classes = cx([
        className,
        styles.alert,
        styles[`alert--${appearance}`],
        styles[`alert--${variant}`],
    ])

    return (
        <div
            role="alert"
            aria-labelledby={label}
            aria-describedby={describedby}
            className={classes}
            {...rest}
        >
            {icon ? (
                <span className={styles.alert__icon}>{icon}</span>
            ) : null}
            {title ? (
                <span className={styles.alert__heading} id={label}>{title}</span>
            ) : null}

            <p id={describedby} className={styles.alert__body}>{children}</p>

            {removable ? (
                <UnstyledButton
                    ariaLabel={closeLabel}
                    onClick={onCloseHandler}
                    children={<IconCross size={18} />}
                />
            ) : null}
        </div>
    )
}

Alert.defaultProps = {
    closeLabel: 'close alert',
    variant: ALERT_VARIANTS.FILLED,
    appearance: ALERT_APPEARANCES.INFO
}

Alert.propTypes = {
    title: PropTypes.node,
    children: PropTypes.node,
    variant: PropTypes.string,
    appearance: PropTypes.string,
    icon: PropTypes.node,
    removable: PropTypes.bool,
    onClose: PropTypes.func,
    closeButtonLabel: PropTypes.string
}

export default Alert
