import React from "react"
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
        ...provided

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
        //borderRadius: '2px',
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


const CustomSelect = React.forwardRef((props, ref) => {
    const { inputProps, wrapperProps } = useInputProps(props)

    const { isMulti, id, isOptionDisabled, ...rest } = inputProps

    return (
        <FormGroup {...wrapperProps}>
            <Select
                getOptionValue={(option) => `${option['_id']}`}
                isClearable
                isMulti={isMulti}
                isOptionDisabled={isOptionDisabled}
                inputId={id}
                instanceId={id} // removes `id` warning.
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
                {...rest}
                ref={ref}
            />
        </FormGroup>
    )
})

CustomSelect.defaultProps = {
    options: []
}

export default CustomSelect
