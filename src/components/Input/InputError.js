import cx from '@/components/utils/cx'
import PropTypes from 'prop-types'

import styles from './styles.module.scss'

function InputError(props) {
    const { children, className, id } = props
    return (
        <span
            className={cx([className, styles.input__error])} id={id} role='alert'
        >
            {children}
        </span>
    )
}

InputError.propTypes = {
    children: PropTypes.node
}

export default InputError
