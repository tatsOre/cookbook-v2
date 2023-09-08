import { useFieldArray, useFormContext } from 'react-hook-form'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import Alert from '@/components/Alert'
import { Button, IconButton } from '@/components/Button'
import { IconCircleMinus, IconGripVertical } from '@/components/Icon'
import { NumberInput, TextInput } from '@/components/FormInput'
import SelectInput from '../../Select'

import styles from '../styles.module.scss'

function IngredientsFieldset({ assets, fields }) {
    const {
        INGREDIENTS: {
            // Name for the 'ingredients' array:
            NAME: INGS_NAME,
            RULES,
            // Attributes for ingredient item:
            INGR_ATTRS: { QTY, FRACTION, MEASURE, NAME: ITEM_NAME, PREP_NOTE },
            INGR_SCHEMA
        },
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

    const measureOptions = assets?.measure_options ?? []

    const fractionOptions = assets?.fraction_options ?? []

    const ingrListItems = ingredients.map((ingr, index) => {
        const ingrNameFieldError = errors[INGS_NAME]?.[index]?.[ITEM_NAME.NAME]

        const di_id = `drag-ingr-${ingr.id}`

        return (
            <Draggable key={di_id} draggableId={di_id} index={index}>
                {(provided) => (
                    <li
                        key={ingr.id}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className={styles['ingredients__list--item']}
                    >
                        <div className={styles['ingredient__item--wrapper']}>
                            <NumberInput
                                label={QTY.LABEL}
                                {...register(`${INGS_NAME}.${index}.${QTY.NAME}`)}
                            />

                            <SelectInput
                                label={FRACTION.LABEL}
                                name={`${INGS_NAME}.${index}.${FRACTION.NAME}`}
                                options={fractionOptions}
                            />

                            <SelectInput
                                label={MEASURE.LABEL}
                                name={`${INGS_NAME}.${index}.${MEASURE.NAME}`}
                                options={measureOptions}
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

                        <IconButton
                            ariaLabel="Drag and drop ingredient"
                            data-action="drag-handler"
                            {...provided.dragHandleProps}
                            icon={<IconGripVertical />}
                        />

                        <IconButton
                            ariaLabel="Delete Ingredient"
                            data-action="delete"
                            onClick={() => remove(index)}
                            icon={<IconCircleMinus />}
                        />
                    </li>
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
                    title={errors?.[INGS_NAME]?.root || RULES.REQUIRED}
                />
            ) : null}

            <DragDropContext onDragEnd={onDragEndHandler}>
                <Droppable droppableId='dnd-ingredients-list' direction='vertical'>
                    {(provided) => (
                        <ul
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            className={styles.ingredients__list}
                        >
                            {ingrListItems}
                            {provided.placeholder}
                        </ul>
                    )}
                </Droppable>
            </DragDropContext>
            <Button onClick={() => append(INGR_SCHEMA)}>
                + Add an ingredient
            </Button>
        </>
    )
}

export default IngredientsFieldset
