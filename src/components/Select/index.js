import React from "react"
import { Controller, useFormContext } from "react-hook-form"
import Select from 'react-select'
import Input from "../Input"
import useInputProps from "../Input/useInputProps"

export const styles = {
    menuPortal: (base) => ({
        ...base,
        zIndex: 9999,
        fontFamily: 'Arial, Helvetica, sans-serif',
        color: 'black',
        fontSize: '0.8rem',
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
        fontSize: '0.85rem',
        textTransform: 'capitalize',

    }),
    valueContainer: (provided) => ({
        ...provided,
        paddingBlock: '7px',

    }),
    control: (provided) => ({
        ...provided,
        cursor: 'pointer',

    }),
    option: (provided) => ({
        ...provided,
        cursor: 'pointer'
    }),
    placeholder: (provided) => ({
        ...provided,
        fontSize: '0.85rem',
    }),
}

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
                            aria-describedby={inputProps.describedBy || undefined}
                            options={options}
                            getOptionValue={(option) => `${option['_id']}`}
                            inputId={inputProps.id}
                            instanceId={inputProps.id} // removes `id` warning.
                            // https://github.com/JedWatson/react-select/issues/1537
                            // todo: use useEffect to check window
                            menuPortalTarget={
                                typeof window !== "undefined" && document.querySelector('body')
                            }
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
        </Input.Wrapper>
    )
}
export default SelectInput
