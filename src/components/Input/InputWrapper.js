import PropTypes from 'prop-types'
import Input from '.'
import cx from '../utils/cx'

import styles from './Input.module.scss'

function InputWrapper(props) {
    const {
        className,
        children,
        description: descProps,
        error: errorProps,
        label: labelProps,
    } = props

    const _Label = labelProps.children && (
        <Input.Label {...labelProps} />
    )

    const _Description = descProps.children && (
        <Input.Description {...descProps} />
    )

    const _Error = errorProps.children && (
        <Input.Error {...errorProps} />
    )

    return (
        <div
            className={cx([className, styles.input__wrapper])}
            data-input-wrapper={children.props.name}
            >
            {_Label}
            {_Description}
            {children}
            {_Error}
        </div>
    )
}

export default InputWrapper
