import React from "react"
import Input from "../Input"
import useInputProps from "../Input/useInputProps"

const NumberInput = React.forwardRef((props, ref) => {
    const { inputProps, wrapperProps } = useInputProps('NumberInput', props)

    return (
        <Input.Wrapper {...wrapperProps}>
            <Input
                {...inputProps}
                ref={ref}
                placeholder={0}
                onKeyPress={(e) => {
                    if (e.key === "e" || e.key === "-") {
                        e.preventDefault();
                    }
                }}
            />
        </Input.Wrapper>
    )
})

export default NumberInput
