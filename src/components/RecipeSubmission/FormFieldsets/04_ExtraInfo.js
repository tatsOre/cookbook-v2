import React from 'react'
import Image from 'next/image'
import { useFormContext } from 'react-hook-form'
import useDraggableFile from '@/components/hooks/useDraggableFile'
import Button from '@/components/Button'
import { FileInput } from '@/components/Form'
import TextareaInput from '../../Form/TextareaInput'
import { getImageSrc } from '@/components/utils/file'
import { IconCloudUpload } from '@/components/Icon'
import cx from '@/components/utils/cx'

import styles from '../styles.module.scss'

function ExtraInfoFieldset({ fields }) {
    const { PHOTO, COMMENTS } = fields

    const {
        register, formState: { errors }, setValue, setError, watch, clearErrors
    } = useFormContext()

    const {
        state, onDeleteFile, onDropFile, onDragFile
    } = useDraggableFile({ name: PHOTO.NAME, onChange: setValue })

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

                    {false ? (
                        <div
                            className={cx([
                                styles.box,
                                styles['advanced--upload'],
                                state.isDragActive && styles['drag--active']
                            ])}
                            onDrop={onDropFile}
                            onDragEnter={onDragFile}
                            onDragLeave={onDragFile}
                            onDragOver={onDragFile}
                        >
                            <div>
                                <IconCloudUpload size={60} strokeWidth={1.5} className={styles.box__icon} />
                            </div>

                            <FileInput
                                className={styles.box__file}
                                id='recipe-draggable-photo'
                                {...register(PHOTO.NAME)}
                            />
                        </div>
                    ) : (
                        <div
                            className={cx([
                                styles.box,
                                styles['no--advanced--upload']
                            ])}>

                            <IconCloudUpload size={18} className={styles.box__icon} aria-hidden="true" />

                            <FileInput
                                className={styles.box__file}
                                {...register(PHOTO.NAME)}
                            />
                            <p>{typeof photo !== 'string' && photo[0]?.name}</p>
                        </div>
                    )}
                </div>

                {photoObjectURL ? (
                    <div className={styles['image__view--wrapper']}>
                        <Image
                            src={photoObjectURL}
                            width={150}
                            height={150}
                            alt="Picture of the dish" />

                        <Button onClick={onDeleteFileHandler}>Delete Photo</Button>
                    </div>
                ) : null}
            </div>


            <TextareaInput
                description={COMMENTS.DESC}
                label={COMMENTS.LABEL}
                placeholder={COMMENTS.PLACEHOLDER}
                rows={4}
                {...register(COMMENTS.NAME)}
            />
        </>
    )
}

export default ExtraInfoFieldset
