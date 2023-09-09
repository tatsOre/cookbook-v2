import { useFieldArray, useFormContext } from 'react-hook-form'
import Alert from '@/components/Alert'
import { Button, IconButton } from '@/components/Button'
import { NumberInput, TextInput } from '@/components/FormInput'
import SelectInput from '@/components/Select'
import DraggableItemsList from '../DraggableList'

import styles from './Ingredients.module.scss'

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

    const measureOptions = assets?.measure_options ?? []

    const fractionOptions = assets?.fraction_options ?? []
console.log(ingredients.length)

    const content = ingredients.map((ingr, index) => {
        const ingrNameFieldError = errors[INGS_NAME]?.[index]?.[ITEM_NAME.NAME]
        return (
            <li key={ingr.id}>
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
            </li>
        )
    })

    return (
        <>
            {errors?.[INGS_NAME]?.root || !content.length ? (
                <Alert
                    appearance="danger"
                    variant='light'
                    title={errors?.[INGS_NAME]?.root || RULES.REQUIRED}
                />
            ) : null}

            {/*             <DraggableItemsList
                items={ingredients}
                remove={remove}
                move={move}
            /> */}

            <ul className={styles['ingredients__list--inputs']}>
                {content}
            </ul>

            <Button onClick={() => append(INGR_SCHEMA)}>
                + Add an ingredient
            </Button>
        </>
    )
}



export default IngredientsFieldset
