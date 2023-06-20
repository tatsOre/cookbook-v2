import React from "react"
import InputWrapper from "./InputWrapper"
import InputLabel from "./InputLabel"
import InputDescription from "./InputDescription"
import InputError from "./InputError"
import cx from "../utils/cx"

import styles from './Input.module.scss'

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
            aria-describedby={describedBy || undefined} // check if exists and trim
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
