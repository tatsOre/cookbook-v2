import PropTypes from 'prop-types'
import cx from '@/components/utils/cx'

import styles from './FormGroup.module.scss'

function Label(props) {
    const {
        children,
        className,
        htmlFor,
        id,
        required,
        hideInputLabel,
        ...rest
    } = props

    const classes = cx([
        className,
        styles.input__label,
        hideInputLabel && styles['visually-hidden']
    ])

    return (
        <label
            id={id}
            htmlFor={htmlFor}
            className={classes}
            aria-hidden={hideInputLabel}
            {...rest}
        >
            {children}
            {required && <small aria-hidden>{' (required)'}</small>}
        </label>)
}

Label.defaultProps = {
    hideInputLabel: false
}

Label.propTypes = {
    /** Content */
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),

    /** Adds an asterisk to the label if the input is require */
    required: PropTypes.bool,

    /** Defaults to true, but set to `false` to visibly hide the content passed to `label` */
    hideInputLabel: PropTypes.bool,
}

export default Label
