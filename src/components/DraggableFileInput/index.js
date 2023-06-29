import Image from "next/image";
import React, { createContext, useContext, useEffect, useState } from "react"
import styles from './styles.module.scss'

// https://www.nngroup.com/articles/drag-drop/

import Button from "../Button";
import { useFormContext } from "react-hook-form";

const DraggableFileContext = createContext()
export const DraggableFileProvider = DraggableFileContext.Provider

export const useDraggableFileContext = () => useContext(DraggableFileContext)

export function DraggableFile(props) {
    const [isDragActive, setDragActive] = useState(false)
    const [file, setFile] = useState(null)

    const onDropHandler = (ev) => {
        ev.preventDefault()
        ev.stopPropagation()
        let file = null

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
        // TODO: validate if file === img

        setFile(file)
        setDragActive(false)
        /** SetValue in Hook Form: */
        props.onChange(file)
    };

    const onDragHandler = (ev) => {
        ev.preventDefault()
        if (ev.type === "dragenter" || ev.type === "dragover") {
            setDragActive(true)
        } else if (ev.type === "dragleave") {
            setDragActive(false)
        }
    }

    const removeFile = () => setFile(null)

    return (
        <DraggableFileProvider value={{
            state: {
                dragActive: isDragActive,
                file
            },
            onDrag: onDragHandler,
            onDrop: onDropHandler,
            removeFile
        }}>

            {props.children}
        </DraggableFileProvider>
    );
}


function RecipePhotoFileInput(props) {
    const {
        state,
        onDrag,
        onDrop,
        removeFile
    } = useDraggableFileContext({
        onChange: props.setFileValue
    })

    const onClickHandler = () => {
        /** Reset File in DnD context: */
        removeFile()
        /** Reset field in the react hook form: */
        props.resetFileValue()
    }
    
    const getFilepath = (value) => {
        console.log('getting filepath', value)
        if (!value) return null

        if (typeof value === 'string') {
            return value
        } else {
            const image = value.length > 0 ? value[0] : value
            return image ? URL.createObjectURL(image) : null
        }
    }
    const photoObjectURL = getFilepath(props.photo)

    return (
        <div>
            {photoObjectURL ? ( <>
                    <Button onClick={onClickHandler}>Delete Photo</Button>

                    <div style={{ maxWidth: '150px', maxHeight: '150px', overflow: 'hidden' }}>
                        <Image
                            src={photoObjectURL}
                            width={150}
                            height={150}
                            alt="Picture of the author" />

                    </div>
                </>
            ) : null}

            {/** File Input for Large Devices: */}
            <div
                className={`${styles.drop_zone} ${state?.dragActive ? styles.dragActive : ""}`}
                onDrop={onDrop}
                onDragEnter={onDrag}
                onDragLeave={onDrag}
                onDragOver={onDrag}
            >
                {props.children}
            </div>
        </div>
    )
}

export default RecipePhotoFileInput
