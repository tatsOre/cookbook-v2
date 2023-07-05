import React from 'react'
import Image from 'next/image'
import { useFormContext } from 'react-hook-form'
import Button from '@/components/Button'
import { FileInput } from '@/components/Form'
import TextareaInput from '../../Form/TextareaInput'
import { getImageSrc, isValidImageFile } from '@/components/utils/file'
import cx from '@/components/utils/cx'

import styles from '../styles.module.scss'

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
            setError('Wrong file type')
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

function ExtraInfoFieldset({ fields }) {
    const { PHOTO, COMMENTS } = fields

    const {
        register, formState: { errors }, setValue, setError, watch, clearErrors
    } = useFormContext()

    const {
        state,
        onDeleteFile,
        onDropFile,
        onDragFile
    } = useDraggableFile({
        name: PHOTO.NAME,
        onChange: setValue,
    })

    React.useEffect(() => {
        // Set error from DND hook in Hook Form:
        // TODO: Check image workflow, check file validation with RHF
        state.fileError
            ? setError(PHOTO.NAME,
                { type: "custom", message: state.fileError })
            : clearErrors(PHOTO.NAME)
    }, [state.fileError])

    const photo = watch('photo')

    const onDeleteFileHandler = () => {
        setValue(PHOTO.NAME, "")
        // Clear draggable hook state:
        onDeleteFile()
    }

    const photoObjectURL = photo && getImageSrc(photo)

    return (
        <>
            <div className={styles['photo__section']}>
                <div className={styles['image__input--wrapper']}>
                    <h3>Liven up your recipe post with a picture</h3>
                    <p>Take photos using a phone or camera. You can always edit this field later.</p>
                    <p role='alert' style={{ color: 'red' }}>{errors.photo && errors.photo.message}</p>

                    <div
                        className={cx([
                            styles.drop__zone,
                            state.isDragActive && styles['drag--active']
                        ])}
                        onDrop={onDropFile}
                        onDragEnter={onDragFile}
                        onDragLeave={onDragFile}
                        onDragOver={onDragFile}
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
