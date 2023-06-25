import PropTypes from 'prop-types'
import UnstyledButton from './UnstyledButton'
import cx from '../utils/cx'

import styles from './Button.module.scss'

const BUTTON_APPEARANCES = {
    PRIMARY: 'primary',
    SECONDARY: 'secondary',
    TERTIARY: 'tertiary',
    DANGER: 'danger',
    SUCCESS: 'success'
}

const BUTTON_VARIANTS = {
    FILLED: 'filled',
    LIGHT: 'light',
    OUTLINE: 'outline',
    TEXT: 'text'
}

/**
 * This component accepts all the HTML Button attributes
 * @returns   React Component
 */

function Button(props) {
    const {
        appearance = BUTTON_APPEARANCES.PRIMARY,
        children,
        className,
        compact,
        disabled,
        isProcessing,
        leftIcon,
        rightIcon,
        uppercase,
        variant = BUTTON_VARIANTS.FILLED,
        ...rest
    } = props

    const classes = cx([
        className,
        styles.button,
        styles[`button--${appearance}`],
        styles[`button--${variant}`]
    ])

    return (
        <UnstyledButton
            aria-label={!children ? ariaLabel : undefined}
            className={classes}
            disabled={disabled || isProcessing}
            {...rest}>
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
            {<span
                className={cx([styles['button--label']])}
                style={{ textTransform: uppercase ? 'uppercase' : undefined }}
            >
                {children}
            </span>}
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
