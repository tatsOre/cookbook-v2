import PropTypes from 'prop-types'
import Input from '.'

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
        <div className={className}>
            {_Label}
            {_Description}
            {children}
            {_Error}
        </div>
    )
}

export default InputWrapper
