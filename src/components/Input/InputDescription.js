import PropTypes from 'prop-types'
import cx from '@/components/utils/cx'

import styles from './Input.module.scss'

function InputDescription(props) {
    const { children, className, id } = props

    return (
        <p
            className={cx([className, styles.input__description])}
            id={id}>
            {children}
        </p>
    )
}

InputDescription.propTypes = {
    children: PropTypes.node,
}

export default InputDescription
