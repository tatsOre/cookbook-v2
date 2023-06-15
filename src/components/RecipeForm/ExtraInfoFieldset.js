import { useFormContext } from 'react-hook-form'

import Accordion from '../Accordion'
import { DraggableFile } from '../DraggableFileInput'
import FileInput from '../FileInput'
import RecipePhotoFileInput from '../DraggableFileInput'
import TextareaInput from '../Textarea'
import { RECIPE_FIELDS_ATTRIBUTES } from './utils/constants'

const {
    PHOTO, COMMENTS
} = RECIPE_FIELDS_ATTRIBUTES

function ExtraInfoFieldset() {
    const {
        register, formState: { errors }, resetField, setValue
    } = useFormContext()

    const onRemovePhotoHandler = () => resetField(PHOTO.NAME)

    const setPhotoValueHandler = (file) => setValue(PHOTO.NAME, file)

    return (
        <Accordion.Item>
            <Accordion.Trigger>Extra Comments & Photos</Accordion.Trigger>
            <Accordion.Panel>
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
                    label={COMMENTS.LABEL}
                    {...register(COMMENTS.NAME)}
                />
            </Accordion.Panel>
        </Accordion.Item>
    )
}

export default ExtraInfoFieldset
