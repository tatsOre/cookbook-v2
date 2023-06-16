import PropTypes from 'prop-types'
import cx from '../utils/cx'

import styles from './Button.module.scss'

function UnstyledButton(props) {
    const {
        children,
        className,
        disabled,
        type,
        ...rest
    } = props

    return (
        <button
            className={cx([styles.button, className])}
            disabled={disabled}
            type={type || 'button'}
            {...rest}>
            {children}
        </button>
    )
}

UnstyledButton.propTypes = {
    /** Is the button is enabled? */
    disabled: PropTypes.bool,

    /** Button text content */
    children: PropTypes.any,

    /** Click handler */
    onClick: PropTypes.func,

    /** Optional focus handler */
    onFocus: PropTypes.func,

    /** HTML attribute */
    type: PropTypes.oneOf(['button', 'reset', 'submit'])
}

export default UnstyledButton
