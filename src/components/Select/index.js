import React from "react"
import { Controller, useFormContext } from "react-hook-form"
import Select from 'react-select'
import FormGroup from "../FormGroup"
import useInputProps from "@/lib/useInputProps"

const styles = {
    menuPortal: (base) => ({
        ...base,
        zIndex: 9999,
        fontFamily: 'inherit',
        color: 'black',
        textTransform: 'capitalize'
    }),
    menu: (provided) => ({
        ...provided, zIndex: "9999 !important"
    }),
    menuList: (provided) => ({
        ...provided,

    }),
    singleValue: (provided) => ({
        ...provided,
        textTransform: 'capitalize',

    }),
    valueContainer: (provided) => ({
        ...provided,
        minHeight: '48px'

    }),
    control: (provided) => ({
        ...provided,
        cursor: 'pointer',
        paddingLeft: '0.5rem',
        border: '1px solid black',
        borderRadius: '2px',
        fontSize: '1rem'
    }),
    option: (provided) => ({
        ...provided,
        cursor: 'pointer'
    }),
    placeholder: (provided) => ({
        ...provided
    }),
}

function SelectInput(props) {
    const { name, options, isMulti, isOptionDisabled, ...rest } = props

    const { control, formState: { errors } } = useFormContext()

    const { inputProps, wrapperProps } = useInputProps({
        ...rest,
        error: errors[name]
    })

    return (
        <FormGroup {...wrapperProps}>
            <Controller
                name={name}
                control={control}
                render={({ field }) => {
                    return (
                        <Select
                            isMulti={isMulti}
                            isOptionDisabled={isOptionDisabled}
                            aria-label={wrapperProps.label.children || inputProps["aria-label"]}
                            aria-describedby={inputProps["aria-describedby"]}
                            options={options}
                            getOptionValue={(option) => `${option['_id']}`}
                            isClearable
                            inputId={inputProps.id}
                            instanceId={inputProps.id} // removes `id` warning.
                            // https://github.com/JedWatson/react-select/issues/1537
                            menuPortalTarget={document.querySelector('body')}
                            styles={styles}
                            theme={(theme) => ({
                                ...theme,
                                borderRadius: 0,
                                colors: {
                                    ...theme.colors,
                                    primary50: '#e9e8e1',
                                    primary25: '#e9e8e1',
                                    primary: 'black',
                                },
                            })}
                            {...field}
                        />
                    )
                }}
            />
        </FormGroup>
    )
}

SelectInput.defaultProps = {
    options: []
}

export default SelectInput
