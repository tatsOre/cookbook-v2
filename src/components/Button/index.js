import PropTypes from 'prop-types'
import cx from '../utils/cx'

import Icon from '../Icon'

import styles from './Button.module.scss'
// todo: for icons use: tabler icons react
// TODO handle better lo de primary button, pues que mamera Button.Primary todo el tiempo.

const ButtonAppearances = {
    Primary: 'primary',
    Secondary: 'secondary',
    Danger: 'danger',
    Warning: 'standard'
}

const ButtonVariants = {
    Filled: 'filled',
    Light: 'light',
    Outline: 'outline',
    Default: 'default',
    Text: 'text' // text, hover: color
}

/**
 * This component accepts all the HTML Button attributes
 * @returns   React Component
 */

function Button(props) {
    const {
        appearance,
        ariaHaspopup,
        ariaLabel,
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


    const buttonClassname = cx([
        styles.button,
        variant && styles[`button__${variant}`],
        appearance && styles[`button__${appearance}`],
        !children && styles['button__icon']
    ])

    const getButtonContent = () => {
        return (
            <>
                {leftIcon && <span
                    className={cx([
                        styles[`icon__container`],
                        children && styles[`icon__container--left`]
                    ])}
                    aria-hidden="true"
                >
                    <Icon name={leftIcon} />
                </span>}

                {children && <span>{children + ` ${variant}`}</span>}
                {rightIcon && <span
                    className={cx([
                        styles[`icon__container`],
                        children && styles[`icon__container--right`]
                    ])}
                    aria-hidden="true"
                >
                    <Icon name={rightIcon} />
                </span>}
            </>
        )
    }

    return (
        <button
            aria-haspopup={ariaHaspopup}
            aria-label={!children ? ariaLabel : undefined}
            className={buttonClassname}
            disabled={disabled || isProcessing}
            {...rest}>
            {getButtonContent()}
        </button>
    )
}

Button.propTypes = {
    /** If the button triggers new content to appear (e.g.: modals and dropdowns) */
    ariaHaspopup: PropTypes.bool,

    /** If the button does not contain text children. (e.g.: icon buttons) */
    ariaLabel: PropTypes.string,

    /** Is the button is enabled? */
    disabled: PropTypes.bool,

    /** Icon before the button text */
    leftIcon: PropTypes.string,

    /** Icon after the button text */
    rightIcon: PropTypes.string,

    /** Is the action intended to be finished or not? */
    isProcessing: PropTypes.bool,

    /** Button text content */
    children: PropTypes.string,

    /** Optional click handler */
    onClick: PropTypes.func,

    /** Optional focus handler */
    onFocus: PropTypes.func,

    /** HTML attribute */
    type: PropTypes.oneOf(['button', 'reset', 'submit'])
}

Button.defaultProps = {

    type: 'button',
    variant: 'filled',
}

export default Button
