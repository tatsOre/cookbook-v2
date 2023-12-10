import React from "react"
import clsx from "clsx"
import { IconCloudUpload } from "../Icon"

import styles from './DragDrop.module.scss'

function DragDropFile({ onDropFile, accept, className }) {
    const [dragActive, setDragActive] = React.useState(false)

    const inputRef = React.useRef(null)

    const onDragHandler = (ev) => {
        ev.preventDefault()
        ev.stopPropagation()

        if (ev.type === "dragenter" || ev.type === "dragover") {
            setDragActive(true)
        } else if (ev.type === "dragleave") {
            setDragActive(false)
        }
    }

    const onDropHandler = (ev) => {
        ev.preventDefault()
        ev.stopPropagation()
        setDragActive(false)

        let file = null

        if (ev.dataTransfer.items) {
            /** Use DataTransferItemList interface to access the file(s): */
            file =
                [...ev.dataTransfer.items]
                    .find((item) => item.kind === "file")
                    .getAsFile()
        } else if (ev.dataTransfer.files?.[0]) {
            /** Use DataTransfer interface to access the file(s): */
            file = ev.dataTransfer.files[0]
        }

        onDropFile(file)
    }

    const onInputChange = (ev) => {
        ev.preventDefault()
        if (ev.target.files && ev.target.files[0]) {
            onDropFile(ev.target.files[0])
        }
    }

    const onButtonClick = () => {
        inputRef.current.click()
    }

    return (
        <div
            className={clsx(styles.file__dropzone, dragActive && styles.drag__active, className)}
            onDragEnter={onDragHandler}
            onDragLeave={onDragHandler}
            onDragOver={onDragHandler}
            onDrop={onDropHandler}
        >
            <input
                ref={inputRef}
                type="file"
                accept={accept}
                id="input-file-upload"
                onChange={onInputChange}
            />
            <label id="label-file-upload" htmlFor="input-file-upload">
                <IconCloudUpload size={50} strokeWidth={1} aria-hidden="true" />
                <span>Drag and drop your file here or</span>
            </label>
            <button
                type="button"
                className="upload-button"
                onClick={onButtonClick}>
                Upload a file
            </button>
        </div>
    )
}

export default DragDropFile
