import React from 'react'
import Image from 'next/image'
import { useFormContext } from 'react-hook-form'
import useDeviceDetect from '@/lib/useDeviceDetect'
import useDraggableFile from '@/lib/useDraggableFile'
import Alert from '@/components/Alert'
import { FileInput, TextInput } from '@/components/FormInput'
import { IconButton } from '@/components/Button'
import { IconCircleMinus, IconCloudUpload } from '@/components/Icon'


import { getImageSrc } from '@/components/utils/file'
import cx from '@/components/utils/cx'
import { default as FIELDS_ATTRIBUTES } from '../../constants'

import styles from './styles.module.scss'

function DragDropFile({ onDropFile, accept }) {
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

    const onDropHandler = () => {
        ev.preventDefault()
        ev.stopPropagation()
        setDragActive(false)

        let file = null

        if (ev.dataTransfer.items) {
            /** Use DataTransferItemList interface to access the file(s): */
            file =
                [...ev.dataTransfer.items]
                    .find((item) => item.kind === "file")
                    .getAsFile();
        } else if (ev.dataTransfer.files?.[0]) {
            /** Use DataTransfer interface to access the file(s): */
            file = ev.dataTransfer.files[0];
        }
    }

    const onInputChange = (ev) => {
        ev.preventDefault()
        if (ev.target.files && ev.target.files) {
            onDropFile(ev.target.files)
        }
    }

    const onButtonClick = () => {
        inputRef.current.click()
    }

    return (
        <div
            className={styles.file__dropzone}
            onDragEnter={onDragHandler}
            onDragLeave={onDragHandler}
            onDragOver={onDragHandler}
            onDrop={onDropHandler}
        >
            <input
                ref={inputRef}
                type="file"
                accept="image/png, image/jpeg"
                id="input-file-upload"
                onChange={onInputChange}
            />
            <label id="label-file-upload" htmlFor="input-file-upload" className={dragActive ? "drag-active" : ""}>
                <span>Drag and drop your file here or</span>
            </label>
            <button className="upload-button" onClick={onButtonClick}>Upload a file</button>
        </div>
    )
}

function ExtraInfoFieldset() {
    const { PHOTO, COMMENTS } = FIELDS_ATTRIBUTES

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

                <DragDropFile onDropFile={(file) => console.log({ file })} />

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

                        <IconButton
                            ariaLabel="Delete chosen image"
                            data-action="delete"
                            onClick={onDeleteFileHandler}
                            icon={<IconCircleMinus />}
                        />
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
