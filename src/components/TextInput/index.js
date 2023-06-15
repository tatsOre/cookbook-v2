import React from "react"
import Input from "../Input"
import useInputProps from "../Input/useInputProps"

const TextInput = React.forwardRef((props, ref) => {
    const { inputProps, wrapperProps } = useInputProps('TextInput', props)

    return (
        <Input.Wrapper {...wrapperProps}>
            <Input {...inputProps} ref={ref}/>
        </Input.Wrapper>
    )
})

export default TextInput
