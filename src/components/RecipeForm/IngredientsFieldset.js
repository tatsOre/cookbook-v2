import { useFieldArray, useFormContext } from 'react-hook-form'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'

import Button from '../Button'
import DroppableList from '../List'
import NumberInput from '../NumberInput'
import TextInput from '../TextInput'
import SelectInput from '../Select'
import IconGrip from '../Icon/icons/icon-grip'

import styles from './RecipeForm.module.scss'
import UnstyledButton from '../Button/UnstyledButton'


function IngredientsFieldset({ assets, fields }) {
    const {
        INGREDIENTS: {
            // Name for the 'ingredients' array:
            NAME: INGS_NAME,
            RULES,
            // Attributes for ingredient item:
            INGR_ATTRS: { QTY, FRACTION, MEASURE, NAME: ITEM_NAME, PREP_NOTE }
        },
        INGR_SCHEMA
    } = fields

    const { register, control, formState: { errors } } = useFormContext()

    const { fields: ingredients, append, remove, swap } = useFieldArray({
        control, name: INGS_NAME, rules: {
            required: RULES.REQUIRED
        }
    })

    const onDragEndHandler = ({ destination, source }) => {
        // dropped outside the list || same index:
        if (!destination || destination.index === source.index) {
            return
        }
        // swap	(from: number, to: number):
        swap(source.index, destination.index)
    }

    const ingrListItems = ingredients.map((ingr, index) => {
        const ingrNameFieldError = errors[INGS_NAME]
            && errors[INGS_NAME][index]
            && errors[INGS_NAME][index][ITEM_NAME.NAME]?.message

        const di_id = `drag-ingr-${index}`

        return (
            <Draggable key={di_id} draggableId={di_id} index={index}>
                {(provided) => (
                    <DroppableList.Item
                        key={ingr.id}
                        innerRef={provided.innerRef}
                        {...provided.draggableProps}
                        className={styles['ingredients__list--item']}
                    >

                        <div {...provided.dragHandleProps}>
                            <IconGrip />
                        </div>

                        <NumberInput
                            label={QTY.LABEL}
                            {...register(`${INGS_NAME}.${index}.${QTY.NAME}`)}
                        />

                        <SelectInput
                            label={FRACTION.LABEL}
                            name={`${INGS_NAME}.${index}.${FRACTION.NAME}`}
                            options={assets.FRACTIONS_OPTIONS}
                        />

                        <SelectInput
                            label={MEASURE.LABEL}
                            name={`${INGS_NAME}.${index}.${MEASURE.NAME}`}
                            options={assets.MEASURE_OPTIONS}
                        />

                        <TextInput
                            label={ITEM_NAME.LABEL}
                            error={ingrNameFieldError}
                            placeholder={ITEM_NAME.PLACEHOLDER}
                            required
                            {...register(`${INGS_NAME}.${index}.${ITEM_NAME.NAME}`, {
                                required: ITEM_NAME.RULES.REQUIRED
                            })}
                        />

                        <TextInput
                            label={PREP_NOTE.LABEL}
                            placeholder={PREP_NOTE.PLACEHOLDER}
                            {...register(`${INGS_NAME}.${index}.${PREP_NOTE.NAME}`)}
                        />

                        <UnstyledButton
                            className={styles['button__icon--delete']}
                            onClick={() => remove(index)}>
                            ✘
                        </UnstyledButton>
                    </DroppableList.Item>
                )}
            </Draggable>
        )
    })

    return (
        <>
            {/** ↓ Error Message or Input Error? */}
            {errors?.[INGS_NAME]?.root
                && <p role='alert'>{errors[INGS_NAME].root.message}</p>}

            <DragDropContext
                onDragEnd={onDragEndHandler}
            >
                <Droppable droppableId='dnd-ingredients-list' direction='vertical'>
                    {(provided) => (
                        <DroppableList
                            {...provided.droppableProps}
                            innerRef={provided.innerRef}
                            className={styles.ingredients__list}
                        >
                            {ingrListItems}
                            {provided.placeholder}
                        </DroppableList>
                    )}
                </Droppable>
            </DragDropContext>
            <Button onClick={() => append(INGR_SCHEMA)}>Add Ingredient</Button>
        </>
    )
}

export default IngredientsFieldset
