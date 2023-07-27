const { useId } = require("react")

const MIN_NUM_VALUE = 0
const MIN_ROWS_VALUE = 3

function useInputProps(inputType, props) {
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

    const defaultProps = (input) => {
        switch (input) {
            case 'TextInput':
                return { type: "text" }
            case 'Textarea':
                return {
                    rows: rest.rows ?? MIN_ROWS_VALUE
                }
            case 'NumberInput':
                return {
                    type: "number",
                    min: rest.min ?? MIN_NUM_VALUE
                }
            case 'PasswordInput':
                return { type: "password" }
            default:
                return null
        }
    }

    const _id = id ?? useId()
    const labelId = `${_id}-label`
    const errorId = `${_id}-error`
    const descriptionId = `${_id}-description`
    
    const hasError = !!error && typeof error === 'string'
    const aria_describedBy = `${hasError ? errorId : ''} ${description ? descriptionId : ''}`
    const describedBy = aria_describedBy.trim()

    return {
        inputProps: {
            id: _id,
            ariaLabel: ariaLabel || label,
            hasError,
            required,
            disabled,
            describedBy,
            ...defaultProps(inputType),
            ...rest,
        },
        wrapperProps: {
            className,

            description: {
                className,
                id: descriptionId,
                children: description
            },
            error: {
                className,
                id: errorId,
                children: error,
            },
            label: {
                className,
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
