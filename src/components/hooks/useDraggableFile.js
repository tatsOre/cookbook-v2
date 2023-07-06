import React from "react";
import { isValidImageFile } from "../utils/file";

function useDraggableFile({ name, onChange }) {
    const [isDragActive, setDragActive] = React.useState(false)
    const [imageFile, setImageFile] = React.useState(null)
    const [error, setError] = React.useState('')

    const onDrop = (ev) => {
        ev.preventDefault()
        ev.stopPropagation()
        let file = null

        error && setError('')

        if (ev.dataTransfer.items) {
            /** Use DataTransferItemList interface to access the file(s): */
            file =
                [...ev.dataTransfer.items]
                    .find((item) => item.kind === "file")
                    .getAsFile();
        } else {
            /** Use DataTransfer interface to access the file(s): */
            file = ev.dataTransfer.files[0];
        }

        if (isValidImageFile(file)) {
            setImageFile(file)
            /** Set Photo in Hook Form: */
            onChange && onChange(name, file)
        } else {
            setError('The images you upload must be JPEG or PNG files. Please check your file type and try again.')
        }

        setDragActive(false)
    };

    const onDrag = (ev) => {
        ev.preventDefault()
        if (ev.type === "dragenter" || ev.type === "dragover") {
            setDragActive(true)
        } else if (ev.type === "dragleave") {
            setDragActive(false)
        }
    }

    const onDeleteFile = () => setImageFile(null)

    return ({
        state: {
            isDragActive,
            file: imageFile,
            fileError: error
        },
        onDeleteFile,
        onDropFile: onDrop,
        onDragFile: onDrag,
    })
}

export default useDraggableFile
