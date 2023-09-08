import React from "react"
import { useFormContext } from 'react-hook-form'
import { TextInput } from "@/components/FormInput"
import UnstyledButton from '@/components/Button/UnstyledButton'

import styles from './Instructions.module.scss'

function ListItemInput({
    index,
    value,
    instItemAtts: TEXT_ATTRS,
    activeField,
    setActiveField

}) {
    const [label, setLabel] = React.useState(value)

    const { register, formState: { errors } } = useFormContext()

    const PARENT_FIELD = 'instructions'

    const nameError = errors[PARENT_FIELD]?.[index]?.[TEXT_ATTRS.NAME]

    const stepNameKey = `${PARENT_FIELD}.${index}.${TEXT_ATTRS.NAME}`

    const onSave = () => {
        setActiveField({ index: null, value: null })
    }

    const onClickHandler = () => {
        setActiveField({ index, value })
    }

    const inputRegister = register(stepNameKey, {
        required: TEXT_ATTRS.RULES.REQUIRED
    })

    return value ?
        <li
            className={styles['instructions__list--item']}
            style={{ position: "relative" }}>

            {activeField.index === index ? (
                <>
                    <UnstyledButton data-name="save" onClick={onSave}>
                        Done
                    </UnstyledButton>

                    <TextInput
                        multiline
                        autoFocus={activeField.index === index}
                        label={`${TEXT_ATTRS.LABEL} ${index + 1}`} // Step {index}
                        error={nameError}
                        {...inputRegister}
                        onChange={(ev) => {
                            inputRegister.onChange(ev)
                            setLabel(ev.target.value)
                        }}
                    />
                </>
            ) : (
                <UnstyledButton data-name="step-idle" onClick={onClickHandler}>
                    <span>
                        <b>{`${TEXT_ATTRS.LABEL} ${index + 1}`}.</b> {label}
                    </span>
                </UnstyledButton>
            )}
        </li>
        : null
}


function NewStepInput({ append, placeholder, description, onCancel }) {
    const [value, setValue] = React.useState('')

    const appendStep = () => {
        append({ text: value })
        setValue('')
    }

    const onCancelHandler = () => {
        onCancel()
        setValue('')
    }

    return (
        <div>
            <TextInput
                multiline
                rows={2}
                label={'New Step'}
                onChange={(ev) => setValue(ev.target.value)}
                value={value}
                description={description}
                placeholder={placeholder}
            />

            <button type='button' onClick={onCancelHandler}>
                Close
            </button>

            <button type='button' disabled={!value} onClick={appendStep}>
                Save
            </button>

        </div>
    )
}

export { ListItemInput, NewStepInput }
