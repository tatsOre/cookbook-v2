import cx from '@/components/utils/cx'
import PropTypes from 'prop-types'

import styles from './styles.module.scss'

function InputError(props) {
    const { children, className, id } = props
    return (
        <p
            className={cx([className, styles.input__error])} id={id} role='alert'
        >
            {children}
        </p>
    )
}

InputError.propTypes = {
    children: PropTypes.node
}

export default InputError
