import { useFieldArray, useFormContext } from 'react-hook-form'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'

import Alert from '@/components/Alert'
import Button from '../../Button'
import DroppableList from '../../List'
import NumberInput from '../../Form/NumberInput'
import TextInput from '../../Form/TextInput'
import SelectInput from '../../Select'
import UnstyledButton from '../../Button/UnstyledButton'
import { IconGridDots, IconMenuOrder, IconTrash } from '@/components/Icon'

import styles from '../styles.module.scss'


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

    const { fields: ingredients, append, remove, move } = useFieldArray({
        control, name: INGS_NAME, rules: {
            required: RULES.REQUIRED
        }
    })

    const onDragEndHandler = ({ destination, source }) => {
        // dropped outside the list:
        if (!destination) return
        // same item:
        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return
        }
        move(source.index, destination.index)
    }

    const ingrListItems = ingredients.map((ingr, index) => {
        const ingrNameFieldError = errors[INGS_NAME]
            && errors[INGS_NAME][index]
            && errors[INGS_NAME][index][ITEM_NAME.NAME]?.message

        const di_id = `drag-ingr-${ingr.id}`

        return (
            <Draggable key={di_id} draggableId={di_id} index={index}>
                {(provided) => (
                    <DroppableList.Item
                        key={ingr.id}
                        innerRef={provided.innerRef}
                        {...provided.draggableProps}
                        className={styles['ingredients__list--item']}
                    >
                        <UnstyledButton
                            className={styles['button__drag--handler']}
                            {...provided.dragHandleProps}>
                            <IconMenuOrder size={24} />
                        </UnstyledButton>

                        <div className={styles['ingredient__item--wrapper']}>
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
                        </div>

                        <UnstyledButton
                            className={styles['button__icon--delete']}
                            onClick={() => remove(index)}
                        >
                            <IconTrash size={20} strokeWidth={1.5} />
                        </UnstyledButton>
                    </DroppableList.Item>
                )}
            </Draggable>
        )
    })

    return (
        <>
            {errors?.[INGS_NAME]?.root || !ingrListItems.length ? (
                <Alert
                    appearance="danger"
                    variant='light'
                    title={errors?.[INGS_NAME]?.root.message || RULES.REQUIRED}
                />
            ) : null}

            <DragDropContext onDragEnd={onDragEndHandler}>
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
            <Button onClick={() => append(INGR_SCHEMA)} fullWidth uppercase variant='outline' appearance='secondary'>
                + Add New Ingredient
            </Button>
        </>
    )
}

export default IngredientsFieldset
