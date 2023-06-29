import { useFormContext } from 'react-hook-form'

import FileInput from '../../FileInput'
import RecipePhotoFileInput from '../../DraggableFileInput'
import TextareaInput from '../../Form/TextareaInput'
import { DraggableFile } from '../../DraggableFileInput'

function ExtraInfoFieldset({ fields }) {
    const { PHOTO, COMMENTS } = fields

    const {
        register, formState: { errors }, resetField, setValue
    } = useFormContext()

    const onRemovePhotoHandler = () => resetField(PHOTO.NAME)

    const setPhotoValueHandler = (file) => setValue(PHOTO.NAME, file)

    return (
        <>
            <DraggableFile
                setFileValue={setPhotoValueHandler}>
                <RecipePhotoFileInput
                    resetFileValue={onRemovePhotoHandler}
                    renderInput={(onFileChange) => (
                        <FileInput
                            id={'recipe-draggable-photo'}
                            onFileChange={onFileChange}
                            {...register(PHOTO.NAME)}
                        />
                    )}
                />
            </DraggableFile>

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
