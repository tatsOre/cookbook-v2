import React from 'react'
import Image from 'next/image'
import { useFormContext } from 'react-hook-form'
import useDeviceDetect from '@/lib/useDeviceDetect'
import useDraggableFile from '@/lib/useDraggableFile'
import Alert from '@/components/Alert'
import { FileInput, TextInput } from '@/components/FormInput'
import { IconCloudUpload, IconTrash } from '@/components/Icon'
import { getImageSrc } from '@/components/utils/file'
import UnstyledButton from '@/components/Button/UnstyledButton'
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

    const isMobile = useDeviceDetect()

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
            <div className={styles['image__section']}>
                <h3>{PHOTO.LABEL}</h3>
                <p>{PHOTO.DESC}</p>

                {errors && errors.photo ? (
                    <Alert
                        appearance="danger"
                        variant='light'
                        title={errors.photo.message}
                    />
                ) : null}

                <div className={styles['image__input--wrapper']}>
                    {isMobile ? (
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
                    ) : (
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
                            <FileInput
                                className={styles.box__file}
                                id='recipe-photo'
                                {...register(PHOTO.NAME)}
                            />
                        </div>
                    )}
                </div>

                {photoObjectURL ? (
                    <div className={styles['image__view--wrapper']}>
                        <Image
                            fill={true}
                            priority={true}
                            src={photoObjectURL}
                            alt="Picture of the dish"
                        />

                        <UnstyledButton
                            className={styles['button__icon--delete']}
                            onClick={onDeleteFileHandler}
                        >
                            <IconTrash size={20} strokeWidth={1.5} />
                        </UnstyledButton>
                    </div>
                ) : null}
            </div>


            <TextInput
                multiline
                description={COMMENTS.DESC}
                label={COMMENTS.LABEL}
                placeholder={COMMENTS.PLACEHOLDER}
                {...register(COMMENTS.NAME)}
            />
        </>
    )
}

export default ExtraInfoFieldset
