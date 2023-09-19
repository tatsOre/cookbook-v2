import React from 'react'
import Image from 'next/image'
import { useFormContext } from 'react-hook-form'
import useDeviceDetect from '@/lib/useDeviceDetect'
import useDraggableFile from '@/lib/useDraggableFile'
import Alert from '@/components/Alert'
import { FileInput, TextInput } from '@/components/FormInput'
import { Button, IconButton } from '@/components/Button'
import { IconCircleMinus, IconCloudUpload } from '@/components/Icon'


import { getImageSrc, isValidImageFile } from '@/components/utils/file'
import cx from '@/components/utils/cx'
import { default as FIELDS_ATTRIBUTES } from '../../constants'

import styles from './styles.module.scss'
import DragDropFile from '@/components/DropzoneFile/DragDropFile'

function ExtraInfoFieldset() {
    const { PHOTO, COMMENTS } = FIELDS_ATTRIBUTES

    const {
        register, formState: { errors }, setValue, setError, watch, clearErrors
    } = useFormContext()

    const isMobile = useDeviceDetect()

    const photo = watch('photo')

    const onDeleteFileHandler = () => {
        if (typeof photo === "string") {
            console.log('File must be removed from Cloudinary', { photo })
        }
        setValue(PHOTO.NAME, "")
    }

    const onFileInputChange = (file) => {
        errors[PHOTO.NAME] && clearErrors(PHOTO.NAME)
        console.log({ file })
        if (!isValidImageFile(file)) {
            setError(PHOTO.NAME, {
                type: 'custom',
                message: PHOTO.RULES.INVALID
            })
        } else if (file.size > PHOTO.RULES.SIZE.VALUE) {
            setError(PHOTO.NAME, {
                type: 'custom',
                message: PHOTO.RULES.SIZE.MESSAGE(PHOTO.RULES.SIZE.VALUE)
            })
        } else {
            setValue(PHOTO.NAME, file)
        }
    }

    const photoObjectURL = photo && getImageSrc(photo)

    return (
        <>
            <section className={styles['recipe--photo']}>
                <h3>{PHOTO.LABEL}</h3>

                <p>{PHOTO.DESC}</p>

                {errors?.photo?.message && <p>Error: {errors.photo.message}</p>}

                {photoObjectURL ? (
                    <>
                        <Button onClick={onDeleteFileHandler}> Delete File</Button>

                        <p>{typeof photo !== 'string' && photo?.name}</p>

                        <div className={styles['image__view--wrapper']}>
                            <Image
                                fill={true}
                                priority={true}
                                src={photoObjectURL}
                                alt="Picture of the dish"
                            />
                        </div>
                    </>
                ) : isMobile ? (
                    <label htmlFor="input-file" className={styles.file__input}>
                        <input id="input-file" type="file" accept="image/png, image/jpeg"
                            onChange={(ev) => onFileInputChange(ev.target.files[0])}
                        />
                        <IconCloudUpload size={16} aria-hidden="true" />
                        <span>Upload a file</span>
                    </label>
                ) : (
                    <DragDropFile
                        accept={"image/png, image/jpeg"}
                        onDropFile={onFileInputChange}
                        className={styles.draggable__input}
                    />
                )}
            </section>

            <section>
                <TextInput
                    multiline
                    description={COMMENTS.DESC}
                    label={COMMENTS.LABEL}
                    placeholder={COMMENTS.PLACEHOLDER}
                    {...register(COMMENTS.NAME)}
                />
            </section>
        </>
    )
}

export default ExtraInfoFieldset
