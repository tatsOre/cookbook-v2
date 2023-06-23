import React from "react"
import InputWrapper from "./InputWrapper"
import InputLabel from "./InputLabel"
import InputDescription from "./InputDescription"
import InputError from "./InputError"
import cx from "../utils/cx"

import styles from './Input.module.scss'

const Input = React.forwardRef((props, ref) => {
    const {
        ariaLabel,
        describedBy,
        disabled,
        hasError,
        required,
        showInputLabel,
        ...rest
    } = props

    const classes = cx([
        styles.input__box, hasError && styles['input__box--error']
    ])

    return (
        <input
            ref={ref}
            {...rest}
            aria-label={!showInputLabel ? ariaLabel : undefined}
            aria-describedby={describedBy || undefined}
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
