import PropTypes from 'prop-types'
import cx from '@/components/utils/cx'

import styles from '../Input.module.scss'

function InputLabel(props) {
    const {
        children,
        className,
        htmlFor,
        id,
        required,
        showInputLabel,
        ...rest
    } = props

    const classes = cx([className, styles.input__label, !showInputLabel && 'hidden'])

    return (
        <label htmlFor={htmlFor} id={id} className={classes}>
            {children}
            {required && <span aria-hidden>{' *'}</span>}
        </label>)
}

InputLabel.propTypes = {
    /** Content */
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),

    /** Adds an asterisk to the label if the input is require */
    required: PropTypes.bool,

    /** Defaults to true, but set to `false` to visibly hide the content passed to `label` */
    showInputLabel: PropTypes.bool,
}

export default InputLabel
