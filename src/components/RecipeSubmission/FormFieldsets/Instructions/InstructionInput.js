import React from "react"
import { TextInput } from "@/components/FormInput"
import { Button } from "@/components/Button"
import { default as FIELDS_ATTRIBUTES } from '../../constants'

import styles from './Instructions.module.scss'

function InstructionInput({ data, onSave, onCancel, index, withCloseButton }) {
    const [value, setValue] = React.useState(data)

    const [error, setError] = React.useState(null)

    const { INSTRUCTIONS: { PLACEHOLDER, TEXT_ATTRS } } = FIELDS_ATTRIBUTES

    const appendStep = () => {
        if (!value) {
            return setError({
                type: 'required',
                message: TEXT_ATTRS.RULES.REQUIRED
            })
        }
        onSave({ text: value })
        setValue(data) // Empty String when new
    }

    const onCancelHandler = () => onCancel()

    const onInputChange = (ev) => {
        error && setError(null)
        setValue(ev.target.value)
    }

    return (
        <div className={styles['step__item--wrapper']}>
            <TextInput
                multiline
                autoFocus
                error={error}
                label={index !== undefined ? `Edit step ${index + 1}:` : 'Add new step'}
                onChange={onInputChange}
                placeholder={PLACEHOLDER}
                value={value}
            />

            {withCloseButton ? (
                <Button
                    data-action="close"
                    onClick={onCancelHandler}>
                    cancel
                </Button>
            ) : null}

            <Button
                data-action="save"
                onClick={appendStep}>
                {index !== undefined ? 'Save' : 'Add step'}
            </Button>
        </div>
    )
}

export default InstructionInput
