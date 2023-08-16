import React from "react"

const FileInput = React.forwardRef((props, ref) => {
    const { id, ...rest } = props
    const _id = id ?? React.useId()

    return (
        <>
            <label htmlFor={_id}>
                <b>Upload your file</b>
                <span> or drag and drop here</span>
            </label>

            <input
                id={_id}
                type="file"
                accept="image/png, image/jpeg"
                ref={ref}
                {...rest}
            />
        </>
    )
})

export default FileInput
