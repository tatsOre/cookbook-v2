import cx from '@/components/utils/cx'
import PropTypes from 'prop-types'

import styles from '../Input.module.scss'

function InputError(props) {
    const {
        children,
        className,
        id,
        ...rest
    } = props
    return (
        <p
            className={cx([className, styles.input__error])} role='alert' id={id}
        >{children}
        </p>
    )
}

InputError.propTypes = {
    /** Content */
    children: PropTypes.oneOfType([
        PropTypes.string, PropTypes.node
    ]),
    id: PropTypes.string
}

export default InputError
