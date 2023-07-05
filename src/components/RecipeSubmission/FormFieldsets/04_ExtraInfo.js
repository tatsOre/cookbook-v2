import React from 'react'
import Image from 'next/image'
import { useFormContext } from 'react-hook-form'
import Button from '@/components/Button'
import { FileInput } from '@/components/Form'
import TextareaInput from '../../Form/TextareaInput'
import { getImageSrc, isValidImageFile } from '@/components/utils/file'
import cx from '@/components/utils/cx'

import styles from '../styles.module.scss'


function ExtraInfoFieldset({ fields }) {
    const { PHOTO, COMMENTS } = fields

    const [isDragActive, setDragActive] = React.useState(false)

    const {
        register, formState: { errors }, setValue, watch
    } = useFormContext()

    const photo = watch('photo')

    const onFileChangeHandler = (file) => {
        file ? setValue(PHOTO.NAME, file) : setValue(PHOTO.NAME, "")
    }

    const onDeleteFileHandler = () => onFileChangeHandler(null)

    const photoObjectURL = photo && getImageSrc(photo)

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

        if (isValidImageFile(file)) {
            onFileChangeHandler(file)
        }
        setDragActive(false)
    };

    const onDragHandler = (ev) => {
        ev.preventDefault()
        if (ev.type === "dragenter" || ev.type === "dragover") {
            setDragActive(true)
        } else if (ev.type === "dragleave") {
            setDragActive(false)
        }
    }

    return (
        <>
            <div className={styles['photo__section']}>
                <div className={styles['image__input--wrapper']}>
                    <h3>Liven up your recipe post with a picture</h3>
                    <p>Take photos using a phone or camera. You can always edit this field later.</p>

                    <div
                        className={cx([
                            styles.drop__zone,
                            isDragActive && styles['drag--active']
                        ])}
                        onDrop={onDropHandler}
                        onDragEnter={onDragHandler}
                        onDragLeave={onDragHandler}
                        onDragOver={onDragHandler}
                    >

                        <FileInput
                            id='recipe-draggable-photo'
                            {...register(PHOTO.NAME)}
                        />
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
                        <Button onClick={onDeleteFileHandler}>Delete Photo</Button>
                    </div>
                ) : null}
            </div>

            <TextareaInput
                description={COMMENTS.DESC}
                label={COMMENTS.LABEL}
                placeholder={COMMENTS.PLACEHOLDER}
                {...register(COMMENTS.NAME)}
            />
        </>
    )
}

export default ExtraInfoFieldset

/*
const DraggableFileContext = createContext()
export const DraggableFileProvider = DraggableFileContext.Provider
export const useDraggableFileContext = () => useContext(DraggableFileContext)
*/