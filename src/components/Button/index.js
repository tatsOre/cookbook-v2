import PropTypes from 'prop-types'
import UnstyledButton from './UnstyledButton'
import cx from '../utils/cx'

import styles from './styles.module.scss'

export const BUTTON_APPEARANCES = {
    PRIMARY: 'primary',
    SECONDARY: 'secondary',
    TERTIARY: 'tertiary',
    DANGER: 'danger',
    SUCCESS: 'success'
}

export const BUTTON_VARIANTS = {
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
        appearance,
        children,
        className,
        compact,
        disabled,
        isProcessing,
        leftIcon,
        rightIcon,
        uppercase,
        variant,
        ...rest
    } = props

    const classes = cx([
        className,
        styles.button,
        styles[`button--${appearance}`],
        styles[`button--${variant}`],
        compact && styles[`button--compact`]
    ])

    return (
        <UnstyledButton
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

Button.defaultProps = {
    appearance: BUTTON_APPEARANCES.PRIMARY,
    variant: BUTTON_VARIANTS.FILLED,
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
