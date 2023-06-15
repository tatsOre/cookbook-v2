import React from "react"
import styles from '@/styles/Form.module.css'
import InputWrapper from "./InputWrapper"
import InputLabel from "./InputLabel"
import InputDescription from "./InputDescription"
import InputError from "./InputError"

export function Form(props) {
    const { children, onSubmit, ...rest } = props
    return <form className={`${styles.form}`} onSubmit={onSubmit} noValidate>
        {children}
    </form>
}

const Input = React.forwardRef((props, ref) => {
    const {
        describedBy,
        disabled,
        hasError,
        labelledBy,
        required,
        ...rest
    } = props

    return (
        <input
            ref={ref}
            {...rest}
            aria-label={labelledBy}
            aria-describedby={describedBy} // check if exists and trim
            aria-invalid={hasError}
            disabled={disabled}
            required={required}
        />
    )
})

Input.Wrapper = InputWrapper
Input.Label = InputLabel
Input.Description = InputDescription
Input.Error = InputError

export default Input
