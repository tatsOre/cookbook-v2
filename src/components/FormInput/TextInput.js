import React from "react"
import PropTypes from 'prop-types'
import FormGroup from "../FormGroup"
import useInputProps from "@/hooks/useInputProps"

const MIN_ROWS_VALUE = 3

const TextInput = React.forwardRef((props, ref) => {
  const {
    inputProps: { multiline, type, rows, ...rest }, wrapperProps
  } = useInputProps(props)

  return (
    <FormGroup {...wrapperProps}>
      {multiline ?
        <textarea
          rows={rows || MIN_ROWS_VALUE}
          {...rest}
          ref={ref}
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
