import React from "react"
import FormGroup from "../FormGroup"
import useInputProps from "@/hooks/useInputProps"

const NumberInput = React.forwardRef((props, ref) => {
  const { inputProps, wrapperProps } = useInputProps(props)

  return (
    <FormGroup {...wrapperProps}>
      <input
      className="pr-2"
        ref={ref}
        type="number"
        min={inputProps.min ?? 0}
        placeholder={inputProps.placeholder ?? 0}
        onKeyDown={(e) => {
          if (e.key === "e" || e.key === "-") {
            e.preventDefault();
          }
        }}
        {...inputProps}
      />
    </FormGroup>
  )
})

export default NumberInput
