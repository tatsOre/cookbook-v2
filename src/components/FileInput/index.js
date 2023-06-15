import React from "react"
import styles from '@/styles/Form.module.css'

const FileInput = React.forwardRef((props, ref) => {
    const {
        id,
        onChange,
        onFileChange,
        ...rest
    } = props

    const _id = id ?? useId()

    const onChangeHandler = (ev) => {
        /** Set name in parent Component that displays the IMG: */
        onFileChange(ev)
        onChange(ev)
    }

    return (
        <>
            <input
                id={_id}
                type="file"
                accept="image/png, image/jpeg"
                className={styles.box__file}
                onChange={onChangeHandler}
                ref={ref}
                {...rest}
            />

            <label htmlFor={_id}>
                <b>Choose a file</b>
                <span className={styles.box__dragndrop}> or drag it here.</span>
            </label>
        </>
    )
})

export default FileInput
