import React from "react"
import PropTypes from 'prop-types'
import FormGroup from "../FormGroup"
import useInputProps from "@/lib/useInputProps"

const MIN_ROWS_VALUE = 3

const TextInput = React.forwardRef((props, ref) => {
    const {
        inputProps: { multiline, type, rows, ...rest }, wrapperProps
    } = useInputProps(props)

    return (
        <FormGroup {...wrapperProps}>
            {multiline
                ? <textarea
                    style={{ paddingBlock: '0.65rem' }}
                    ref={ref}
                    rows={rows ?? MIN_ROWS_VALUE}
                    {...rest}
                />
                : <input {...rest} ref={ref} type={type} />}
        </FormGroup>
    )
})

TextInput.defaultProps = {
    type: 'text'
}

TextInput.propTypes = {
    type: PropTypes.oneOf(['text', 'email', 'password']),
}

export default TextInput
