import React from "react"
import { useFormContext } from 'react-hook-form'
import { TextInput } from "@/components/FormInput"
import { IconButton, UnstyledButton } from "@/components/Button"
import { IconCross } from "@/components/Icon"

import { default as FIELDS_ATTRIBUTES } from '../../constants'

function ListItemInput({
    index,
    value,
    activeField,
    setActiveField
}) {
    const [text, setText] = React.useState(value)

    const { register, formState: { errors, dirtyFields } } = useFormContext()

    const {
        INSTRUCTIONS: { NAME, TEXT_ATTRS },
    } = FIELDS_ATTRIBUTES

    const isDirty = dirtyFields.instructions?.[index]?.text

    const ingrError = errors[NAME]?.[index]?.[TEXT_ATTRS.NAME]
        || (!text && isDirty && { type: "required" })

    const stepNameKey = `${NAME}.${index}.${TEXT_ATTRS.NAME}`

    const label = `${TEXT_ATTRS.LABEL} ${index + 1}`

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
        <li>
            {activeField.index === index ? (
                <div>
                    <UnstyledButton
                        data-action="save"
                        disabled={!text}
                        onClick={onSave}
                    >
                        Done
                    </UnstyledButton>

                    <TextInput
                        multiline
                        autoFocus={activeField.index === index}
                        label={`Edit ${label}:`}
                        error={ingrError}
                        {...inputRegister}
                        onChange={(ev) => {
                            inputRegister.onChange(ev)
                            setText(ev.target.value)
                        }}
                    />
                </div>
            ) : (
                <UnstyledButton data-action="step-idle" onClick={onClickHandler}>
                    <span><b>{label}.</b> {text}</span>
                </UnstyledButton>
            )}
        </li>
        : null
}

function NewStepInput({
    append,
    placeholder,
    description,
    onCancel,
    className
}) {
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
        <div className={className}>
            <IconButton
                data-action="close"
                ariaLabel="Close"
                icon={<IconCross />}
                onClick={onCancelHandler}
            />

            <TextInput
                multiline
                rows={2}
                label="Add new step:"
                onChange={(ev) => setValue(ev.target.value)}
                value={value}
                description={description}
                placeholder={placeholder}
            />

            <UnstyledButton data-action="save" disabled={!value} onClick={appendStep}>
                Save
            </UnstyledButton>
        </div>
    )
}

export { ListItemInput, NewStepInput }
