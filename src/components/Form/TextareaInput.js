import React from "react"
import Input from "../Input"
import useInputProps from "../Input/useInputProps"
import cx from "../utils/cx"

import styles from '../Input/Input.module.scss'

export const Textarea = React.forwardRef((props, ref) => {
    const {
        ariaLabel,
        describedBy,
        disabled,
        hasError,
        required,
        ...rest
    } = props

    const classes = cx([
        styles.input__box, hasError && styles['input__box--error']
    ])

    return (
        <textarea
            ref={ref}
            aria-label={ariaLabel}
            aria-invalid={hasError}
            aria-describedby={describedBy || undefined}
            className={classes}
            disabled={disabled}
            required={required}
            {...rest}
        />
    )
})

const TextareaInput = React.forwardRef((props, ref) => {
    const { inputProps, wrapperProps } = useInputProps('Textarea', props)

    return (
        <Input.Wrapper {...wrapperProps}>
            <Textarea {...inputProps} ref={ref} />
        </Input.Wrapper>
    )
})

export default TextareaInput
