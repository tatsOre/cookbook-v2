import Image from "next/image";
import React from "react"
import Button from "../Button";

import styles from './styles.module.scss'
import cx from "../utils/cx";

// https://www.nngroup.com/articles/drag-drop/

const getImageSrc = (imageFile) => {
    //console.log('getting filepath', imageFile)
    if (!imageFile) return null

    if (typeof imageFile === 'string') {
        return imageFile
    } else {
        const src = imageFile.length > 0 ? imageFile[0] : imageFile
        return src ? URL.createObjectURL(src) : null
    }
}

function useDraggableImageFile(props) {
    const [isDragActive, setDragActive] = React.useState(false)
    const [file, setFile] = React.useState(null)

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

    return {
        state: {
            dragActive: isDragActive,
            file
        },
        onDrag: onDragHandler,
        onDrop: onDropHandler,
        removeFile
    }
}

function RecipePhotoFileInput(props) {
    const {
        state,
        onDrag,
        onDrop,
        removeFile
    } = useDraggableImageFile({
        onChange: props.onFileChange
    })

    const onClickHandler = () => {
        /** Reset File in DnD context: */
        removeFile()
        /** Reset field in the react hook form: */
        props.onFileRemove()
    }

    const photoObjectURL = getImageSrc(props.photo)

    return (
        <div className={styles['photo__section']}>
            <div className={styles['image__input--wrapper']}>
                <h3>Liven up your recipe with a picture</h3>
                <p>Take photos using a phone or camera. You can always edit this field later.</p>
                {/** File Input for Large Devices: */}
                <div
                    className={cx([
                        styles.drop__zone,
                        state?.dragActive && styles['drag--active']
                    ])}
                    onDrop={onDrop}
                    onDragEnter={onDrag}
                    onDragLeave={onDrag}
                    onDragOver={onDrag}
                >
                    {props.children}
                </div>
            </div>

            {photoObjectURL ? (
                <div className={styles['image__view--wrapper']}>
                    <div style={{ maxWidth: '150px', maxHeight: '150px', overflow: 'hidden' }}>
                        <Image
                            src={photoObjectURL}
                            width={150}
                            height={150}
                            alt="Picture of the dish" />
                    </div>
                    <Button onClick={onClickHandler}>Delete Photo</Button>
                </div>
            ) : null}
        </div>
    )
}

export default RecipePhotoFileInput
