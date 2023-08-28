import React from 'react'
import PropTypes from 'prop-types'
import UnstyledButton from './UnstyledButton'
import cx from '../utils/cx'

import styles from './Button.module.scss'
import { APPEARANCES } from './Button.constants'

/**
 * This component accepts all the HTML Button attributes
 * @returns   React Component
 */

const Button = React.forwardRef((props, ref) => {
    const {
        appearance,
        children,
        className,
        compact,
        fullWidth,
        disabled,
        isProcessing,
        leftIcon,
        rightIcon,
        style,
        uppercase,
        ...rest
    } = props

    const classes = cx([
        className,
        styles.button,
        styles[`button--${appearance}`],
        compact && styles['button--compact'],
        typeof children !== 'string' ? styles['action--button'] : styles['button--wide']
    ])

    return (
        <UnstyledButton
            className={classes}
            disabled={disabled || isProcessing}
            style={{
                textTransform: uppercase ? 'uppercase' : undefined,
                width: fullWidth ? '100%' : undefined,
                ...style,
            }}
            ref={ref}
            {...rest}
        >
            {leftIcon && (
                <span
                    aria-hidden="true"
                    className={cx([
                        styles[`icon__container`],
                        styles[`icon__container--left`]
                    ])}
                >
                    {leftIcon}
                </span>
            )}
            {children}
            {rightIcon && (
                <span
                    aria-hidden="true"
                    className={cx([
                        styles[`icon__container`],
                        styles[`icon__container--right`]
                    ])}
                >
                    {rightIcon}
                </span>
            )}
        </UnstyledButton>
    )
})

Button.defaultProps = {
    appearance: APPEARANCES.PRIMARY
}

Button.propTypes = {
    /** Icon before the button text */
    leftIcon: PropTypes.node,

    /** Icon after the button text */
    rightIcon: PropTypes.node,

    /** Is the action intended to be finished or not? */
    isProcessing: PropTypes.bool,

    /** HTML attribute */
    type: PropTypes.oneOf(['button', 'reset', 'submit'])
}

export default Button
