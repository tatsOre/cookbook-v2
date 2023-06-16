const { useId } = require("react")

const MIN_NUM_VALUE = 0
const MIN_ROWS_VALUE = 3

function useInputProps(inputType, props) {
    const {
        className,
        description,
        disabled,
        error,
        id,
        label,
        required,
        showInputLabel,
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
    // ↓ should be trimmed
    const describedBy = `${hasError ? errorId : ''} ${description ? descriptionId : ''}`

    return {
        inputProps: {
            id: _id,
            hasError,
            required,
            disabled, // (!) pointer-events: none
            describedBy,
            labelledBy: labelId,
            ...rest,
            ...defaultProps(inputType)
        },
        wrapperProps: {
            className,

            description: {
                className,
                id: descriptionId,
                content: description
            },
            error: {
                className,
                content: error,
                id: errorId
            },
            label: {
                className,
                content: label,
                id: labelId,
                htmlFor: _id,
                required,
                disabled, // (!) pointer-events: none
                showInputLabel: showInputLabel ?? true
            }
        }
    }
}

export default useInputProps
