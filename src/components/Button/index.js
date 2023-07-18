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
        fullWidth,
        disabled,
        isProcessing,
        leftIcon,
        rightIcon,
        uppercase,
        ...rest
    } = props

    const classes = cx([
        className,
        styles.button,
        styles[`button--${appearance}`],
        compact && styles['button--compact'],
        fullWidth && styles['button--full'],
        typeof children !== 'string' ? styles['action--button'] : styles['button--wide']
    ])

    return (
        <UnstyledButton
            className={classes}
            disabled={disabled || isProcessing}
            style={{ textTransform: uppercase ? 'uppercase' : undefined }}
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
            {<span>{children}</span>}
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
    appearance: BUTTON_APPEARANCES.PRIMARY
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
