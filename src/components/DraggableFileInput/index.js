import Image from "next/image";
import React, { createContext, useContext, useEffect, useState } from "react"
import styles from '@/styles/Form.module.css'

// https://www.nngroup.com/articles/drag-drop/

import Button from "../Button";

const DEFAULT_PICTURE = '/default_recipe_photo.jpg'

const DraggableFileContext = createContext()
export const DraggableFileProvider = DraggableFileContext.Provider

export const useDraggableFileContext = () => useContext(DraggableFileContext)

export function DraggableFile(props) {
    const [isDragActive, setDragActive] = useState(false)
    const [file, setFile] = useState(null)

    const onDropHandler = (ev) => {
        ev.preventDefault()
        ev.stopPropagation()
        // TODO: error can come from formState
        let file = null
        let error = null

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
        props.setFileValue(file)
    };

    const onDragHandler = (ev) => {
        ev.preventDefault()
        if (ev.type === "dragenter" || ev.type === "dragover") {
            setDragActive(true)
        } else if (ev.type === "dragleave") {
            setDragActive(false)
        }
    }

    const onRemoveFileHandler = () => setFile(null)

    return (
        <DraggableFileProvider value={{
            state: {
                dragActive: isDragActive,
                pathname: file && URL.createObjectURL(file)
            },
            onDrag: onDragHandler,
            onDrop: onDropHandler,
            onRemoveFile: onRemoveFileHandler
        }}>

            {props.children}
        </DraggableFileProvider>
    );
}


function RecipePhotoFileInput(props) {
    const [filename, setFilename] = useState('')

    const {
        state,
        onDrag,
        onDrop,
        onRemoveFile
    } = useDraggableFileContext()

    useEffect(() => {
        /** Change local state every time a file is dropped: */
        state.pathname && setFilename(state.pathname)
    }, [state.pathname])


    const onClickHandler = () => {
        /** Reset File in DnD context: */
        onRemoveFile()
        /** Reset field in the react hook form: */
        props.resetFileValue()
        setFilename('')
    }

    const onFileChange = (ev) => {
        try {
            const path = URL.createObjectURL(ev.target.files[0])
            setFilename(path);
        } catch (e) {
            console.log('FileInput is not available: ', e)
        }
    }

    const photoObjectURL = filename

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
                {props.renderInput(onFileChange)}
            </div>
        </div>
    )
}

export default RecipePhotoFileInput
