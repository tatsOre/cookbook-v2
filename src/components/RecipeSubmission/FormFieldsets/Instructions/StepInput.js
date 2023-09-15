import React from "react"
import { useFormContext } from 'react-hook-form'
import { TextInput } from "@/components/FormInput"
import { Button, IconButton, UnstyledButton } from "@/components/Button"
import { IconCross } from "@/components/Icon"

import { default as FIELDS_ATTRIBUTES } from '../../constants'

function ListItemInput({
    index,
    value,
    activeField,
    setActiveField
}) {
    const { register, formState: { errors, dirtyFields } } = useFormContext()

    const {
        INSTRUCTIONS: { NAME, TEXT_ATTRS },
    } = FIELDS_ATTRIBUTES

    /*  Is there an error in steps? || has been touched and there is no value? && set error */
    const fieldError = errors[NAME]?.[index]?.[TEXT_ATTRS.NAME] || (
        dirtyFields[NAME]?.[index]?.[TEXT_ATTRS.NAME] && !value
        && { type: 'required', message: TEXT_ATTRS.RULES.REQUIRED }
    )

    const label = `${TEXT_ATTRS.LABEL} ${index + 1}`

    const onSave = () => {
        setActiveField({ index: null, active: false })
    }

    const onClickHandler = () => {
        setActiveField({ index, active: true })
    }

    return <li>
        {activeField.index === index ? (
            <div>
                <Button
                    data-action="save"
                    disabled={!value}
                    onClick={onSave}
                >
                    Done
                </Button>

                <TextInput
                    multiline
                    autoFocus={activeField.index === index}
                    label={`Edit ${label}:`}
                    error={fieldError}
                    {...register(`${NAME}.${index}.${TEXT_ATTRS.NAME}`, {
                        required: TEXT_ATTRS.RULES.REQUIRED
                    })}
                />
            </div>
        ) : (
            <UnstyledButton data-action="step-idle" onClick={onClickHandler}>
                <span><b>{label}.</b> {value}</span>
            </UnstyledButton>
        )}
    </li>
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

            <Button data-action="save" disabled={!value} onClick={appendStep}>
                Save
            </Button>
        </div>
    )
}

export { ListItemInput, NewStepInput }
