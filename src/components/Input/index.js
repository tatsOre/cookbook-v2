import React from "react"
import InputWrapper from "./InputWrapper"
import InputLabel from "./InputLabel"
import InputDescription from "./InputDescription"
import InputError from "./InputError"
import cx from "../utils/cx"

import styles from './Input.module.scss'

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

    const classes = cx([styles.input__box])

    return (
        <input
            ref={ref}
            {...rest}
            aria-label={labelledBy}
            aria-describedby={describedBy} // check if exists and trim
            aria-invalid={hasError}
            className={classes}
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
