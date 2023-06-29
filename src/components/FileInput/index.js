import React from "react"

import styles from './styles.module.scss'

const FileInput = React.forwardRef((props, ref) => {
    const { id, ...rest } = props

    const _id = id ?? useId()

    return (
        <>
            <input
                id={_id}
                type="file"
                accept="image/png, image/jpeg"
                className={styles.box__file}
                ref={ref}
                {...rest}
            />

            <label htmlFor={_id}>
                <span className={styles.box__dragndrop}>Drag and drop here or</span>
                <b>Choose a file</b>
            </label>
        </>
    )
})

export default FileInput
