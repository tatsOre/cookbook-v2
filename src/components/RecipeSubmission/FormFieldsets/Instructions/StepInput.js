import React from "react"
import { useFormContext } from 'react-hook-form'
import { TextInput } from "@/components/FormInput"
import { IconButton, UnstyledButton } from "@/components/Button"
import { IconCross } from "@/components/Icon"

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
        <li>
            {activeField.index === index ? (
                <div>
                    <UnstyledButton data-action="save" onClick={onSave}>
                        Done
                    </UnstyledButton>

                    <TextInput
                        multiline
                        autoFocus={activeField.index === index}
                        label={`Edit ${TEXT_ATTRS.LABEL} ${index + 1}:`} // Step {index}
                        error={nameError}
                        {...inputRegister}
                        onChange={(ev) => {
                            inputRegister.onChange(ev)
                            setLabel(ev.target.value)
                        }}
                    />
                </div>
            ) : (
                <UnstyledButton data-action="step-idle" onClick={onClickHandler}>
                    <span>
                        <b>{`${TEXT_ATTRS.LABEL} ${index + 1}`}.</b> {label}
                    </span>
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
