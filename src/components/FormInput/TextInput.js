import React from "react"
import PropTypes from 'prop-types'
import FormGroup from "../FormGroup"
import useInputProps from "@/lib/useInputProps"

const MIN_ROWS_VALUE = 2

const useAutosizeTextArea = (
    textAreaRef,
    value
) => {
    React.useEffect(() => {
        if (textAreaRef) {
            // We need to reset the height momentarily to get the correct scrollHeight for the textarea
            //textAreaRef.style.height = "0px";
            const scrollHeight = textAreaRef.scrollHeight;
            // We then set the height directly, outside of the render loop
            // Trying to set this with state or a ref will product an incorrect value.
            //textAreaRef.style.height = "max-content"
            //const x = scrollHeight/parseInt(getComputedStyle(textAreaRef).lineHeight)
            //console.log({ scrollHeight, x })
            //textAreaRef.rows = x > 5 ? 5 : x
        }
    }, [textAreaRef, value]);
};

const TextInput = React.forwardRef((props, ref) => {
    const {
        inputProps: { multiline, type, rows, ...rest }, wrapperProps
    } = useInputProps(props)

    const textareaRef = multiline ? React.useRef(null) : null

    useAutosizeTextArea(textareaRef?.current, textareaRef?.current?.value)

    return (
        <FormGroup {...wrapperProps}>
            {multiline
                ? <textarea
                    style={{ paddingBlock: '0.65rem' }}
                    rows={rows ?? MIN_ROWS_VALUE}
                    {...rest}
                    ref={(e) => {
                        ref(e)
                        textareaRef.current = e // you can still assign to ref
                    }}
                />
                : <input {...rest} ref={ref} type={type} />}
        </FormGroup>
    )
})

TextInput.defaultProps = {
    type: 'text'
}

TextInput.propTypes = {
    type: PropTypes.oneOf(['text', 'email', 'password']),
}

export default TextInput
