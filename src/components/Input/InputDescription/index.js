import PropTypes from 'prop-types'

import styles from '../Input.module.scss'
import cx from '@/components/utils/cx'

function InputDescription(props) {
    const {
        children,
        className,
        id,
    } = props

    return (
        <p
            className={cx([className, styles.input__description])}
            id={id}>{children}
        </p>
    )
}

InputDescription.propTypes = {
    /** Content */
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
}

export default InputDescription
