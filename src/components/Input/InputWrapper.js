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

    const _Label = labelProps.content && (
        <Input.Label {...labelProps}>
            {labelProps.content}
        </Input.Label>
    )

    const _Description = descProps.content && (
        <Input.Description {...descProps}>
            {descProps?.content}
        </Input.Description>
    )

    const _Error = errorProps.content && (
        <Input.Error {...errorProps}>
            {errorProps.content}
        </Input.Error>
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
