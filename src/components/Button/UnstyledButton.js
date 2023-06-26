import PropTypes from 'prop-types'
import cx from '../utils/cx'

import styles from './Button.module.scss'

/**
 * This component accepts all the HTML button attributes
 * @returns   React Component
 */

function UnstyledButton(props) {
    const {
        ariaLabel,
        children,
        className,
        disabled,
        type = 'button',
        ...rest
    } = props
    return (
        <button
            aria-label={ariaLabel}
            className={cx([styles.button__base, className])}
            disabled={disabled}
            type={type}
            {...rest}>
            {children}
        </button>
    )
}

UnstyledButton.propTypes = {
    /** If the button triggers new content to appear (e.g.: modals and dropdowns) */
    ariaHaspopup: PropTypes.bool,

    /** If the button does not contain text children. (e.g.: icon buttons) */
    ariaLabel: PropTypes.string,

    /** Is the button is enabled? */
    disabled: PropTypes.bool,

    /** Button text content */
    children: PropTypes.node,

    /** Optional click handler */
    onClick: PropTypes.func,

    /** Optional focus handler */
    onFocus: PropTypes.func,

    /** HTML attribute */
    type: PropTypes.oneOf(['button', 'reset', 'submit'])
}

export default UnstyledButton
