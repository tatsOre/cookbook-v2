import React from "react"

const FileInput = React.forwardRef((props, ref) => {
    const { id, ...rest } = props
    const _id = id ?? React.useId()

    return (
        <>
            <label htmlFor={_id}>
                <span>Drag and drop an image or </span>
                <span>browse</span>
                <p>File must be JPEG, JPG or PNG format and up to 17MB</p>
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
