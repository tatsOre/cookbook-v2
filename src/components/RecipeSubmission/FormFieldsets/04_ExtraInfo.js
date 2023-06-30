import { useFormContext } from 'react-hook-form'
import FileInput from '../../FileInput'
import RecipePhotoFileInput from '../../DraggableFileInput'
import TextareaInput from '../../Form/TextareaInput'

function ExtraInfoFieldset({ fields }) {
    const { PHOTO, COMMENTS } = fields

    const {
        register, formState: { errors }, setValue, watch
    } = useFormContext()

    const removePhotoHandler = () => setValue(PHOTO.NAME, "")

    const setPhotoHandler = (file) => setValue(PHOTO.NAME, file)

    const photo = watch('photo')

    return (
        <>
            <RecipePhotoFileInput
                onFileChange={setPhotoHandler}
                onFileRemove={removePhotoHandler}
                photo={photo}
            >
                <FileInput
                    id='recipe-draggable-photo'
                    {...register(PHOTO.NAME)}
                />
            </RecipePhotoFileInput>

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
