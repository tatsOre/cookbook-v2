import React from "react"
import { Controller, useFormContext } from "react-hook-form"
import Select from 'react-select'
import Input from "../Input"
import useInputProps from "../Input/useInputProps"

function SelectInput(props) {
    const { name, options, ...rest } = props

    const { control, formState: { errors } } = useFormContext()

    const { inputProps, wrapperProps } = useInputProps(null, {
        ...rest,
        error: errors[name]
    })

    return (
        <Input.Wrapper {...wrapperProps}>
            <Controller
                name={name}
                control={control}
                render={({ field }) => {
                    return (
                        <Select
                            aria-label={inputProps.labelId}
                            aria-describedby={inputProps.describedBy}
                            options={options}
                            getOptionValue={(option) => `${option['_id']}`}
                            inputId={inputProps.id}
                            instanceId={inputProps.id} // removes `id` warning.
                            {...field}
                        />
                    )
                }}
            />
        </Input.Wrapper>
    )
}
export default SelectInput
