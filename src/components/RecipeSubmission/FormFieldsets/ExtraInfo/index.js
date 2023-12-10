import React from 'react'
import Image from 'next/image'
import { useFormContext } from 'react-hook-form'

import useDeviceDetect from '@/hooks/useDeviceDetect'
import Alert from '@/components/Alert'
import { Button } from '@/components/Button'
import DragDropFile from '@/components/DropzoneFile/DragDropFile'
import { TextInput } from '@/components/FormInput'
import { IconAlertCircle, IconCloudUpload } from '@/components/Icon'
import Modal from '@/components/Modal'

import { useRecipeSubmissionContext } from '../../context'
import cloudinaryService from '@/services/cloudinary'
import { getImageSrc, isValidImageFile } from '@/utils/file'

import styles from './styles.module.scss'

function FileInputMobile({ onInputChange }) {
  const onChangeHandler = (ev) => onInputChange(ev.target.files[0])

  return (
    <label htmlFor="input-file" className={styles.file__input}>
      <input
        id="input-file"
        type="file"
        accept="image/png, image/jpeg"
        onChange={onChangeHandler}
      />
      <IconCloudUpload size={16} aria-hidden="true" />
      <span>Upload a file</span>
    </label>
  )
}
// Many things are happening here
function ExtraInfoFieldset() {
  const [showModal, setShowModal] = React.useState(false)

  const {
    endpoint,
    fieldsAttributes: { PHOTO, COMMENTS }
  } = useRecipeSubmissionContext()

  const {
    register, formState: { errors }, setValue, setError, watch, clearErrors
  } = useFormContext()

  const isMobile = useDeviceDetect()

  const photo = watch('photo')

  const onFileInputChange = (file) => {
    errors[PHOTO.NAME] && clearErrors(PHOTO.NAME)

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

  /* If photo.size we have a local file, otherwise we have an uploaded image. */
  const onDeleteClick = () => {
    photo.size ? setValue(PHOTO.NAME, {}) : setShowModal(true)
  }

  const removeFile = async () => {
    const { result } = await cloudinaryService.delete(photo.public_id)

    if (result === 'ok') {
      const response = await fetch(endpoint, {
        method: 'PATCH',
        body: JSON.stringify({ photo: PHOTO.SCHEMA }),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      })

      setValue(PHOTO.NAME, {})
      // fetch service
      // check if ok and setValue, set errors!
    }
  }

  const modalProps = {
    children: <p>If you delete this image, it will be permanently lost.</p>,
    onCancel: () => setShowModal(false),
    onConfirm: () => {
      setShowModal(false)
      removeFile()
    }
  }

  const photoObjectURL = photo && getImageSrc(photo)

  return (
    <>
      {showModal && <Modal {...modalProps} />}

      {errors.photo?.message ? (
        <Alert appearance="danger" icon={<IconAlertCircle />}>
          {errors.photo.message}
        </Alert>
      ) : null}

      <div className={styles['recipe--photo']}>
        <h3>{PHOTO.LABEL}</h3>

        <p>{PHOTO.DESC}</p>

        {photoObjectURL ? (
          <>
            <Button onClick={onDeleteClick}> Delete File</Button>

            <p>{typeof photo !== 'string' && photo?.name}</p>

            <div className={styles['image__view--wrapper']}>
              <Image
                height={350}
                width={350}
                src={photoObjectURL}
                alt="Picture of the dish"
              />
            </div>
          </>
        ) : isMobile ? (
          <FileInputMobile
            onInputChange={onFileInputChange}
          />
        ) : (
          <DragDropFile
            accept={"image/png, image/jpeg"}
            onDropFile={onFileInputChange}
            className={styles.draggable__input}
          />
        )}
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
