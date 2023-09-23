import React from 'react'
import PropTypes from 'prop-types'
import { IconButton } from '../Button'
import { IconCross } from '../Icon'
import cx from '@/components/utils/cx'
import { ALERT_APPEARANCES, ALERT_VARIANTS } from './Alert.constants'

import styles from './Alert.module.scss'

function Alert(props) {
    const [open, setOpen] = React.useState(true)

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

    return (open && (
        <div
            role="alert"
            aria-labelledby={label}
            aria-describedby={describedby}
            className={classes}
            {...rest}
        >
            {removable ? (
                <IconButton
                    data-action="close-alert"
                    ariaLabel={closeLabel}
                    onClick={onCloseHandler}
                    icon={<IconCross size={18} />}
                />
            ) : null}

            {title ? (
                <span className={styles.alert__heading} id={label}>
                    {title}</span>
            ) : null}

            <p id={describedby} className={styles.alert__body}>
                {icon && <span className={styles.alert__icon}>{icon}</span>}
                {children}
            </p>
        </div>
    ))
}

Alert.defaultProps = {
    closeLabel: 'close alert',
    variant: ALERT_VARIANTS.LIGHT,
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
