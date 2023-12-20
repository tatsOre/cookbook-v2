import React from 'react'

function useInputProps(props) {
    const {
        ariaLabel,
        className,
        description,
        disabled,
        error,
        id,
        label,
        required,
        hideInputLabel,
        ...rest
    } = props

    /**
     * React Hook "React.useId" is called conditionally. 
     * React Hooks must be called in the exact same order in every component render.  
     * react-hooks/rules-of-hooks
     */

    const uid = React.useId()
    const _id = id || uid
    const labelId = `${_id}-label`
    const errorId = `${_id}-error`
    const descriptionId = `${_id}-description`

    const hasError = error && error.type ? true : false
    const aria_describedBy =
        `${hasError ? errorId : ''} ${description ? descriptionId : ''}`
    const describedBy = aria_describedBy.trim()

    return {
        inputProps: {
            id: _id,
            "aria-label": hideInputLabel ? ariaLabel || label : undefined,
            "aria-describedby": describedBy || undefined,
            "aria-invalid": hasError,
            required,
            disabled,
            ...rest,
        },
        wrapperProps: {
            className,
            hasError,

            description: {
                id: descriptionId,
                children: description
            },
            error: {
                id: errorId,
                children: error && error.message,
            },
            label: {
                id: labelId,
                children: label,
                htmlFor: _id,
                required,
                disabled,
                hideInputLabel
            }
        }
    }
}

export default useInputProps
