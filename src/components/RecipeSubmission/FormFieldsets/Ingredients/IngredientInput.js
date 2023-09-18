import React from 'react'
import { useRecipeSubmissionContext } from '../../context'
import { Button, IconButton, } from '@/components/Button'
import CustomSelect from '@/components/Select'
import { NumberInput, TextInput } from '@/components/FormInput'
import { IconCross } from '@/components/Icon'
import { default as FIELDS_ATTRIBUTES } from '../../constants'

import styles from './Ingredients.module.scss'

function IngredientInput({ onSave, onCancel, data, index }) {
    const { assets } = useRecipeSubmissionContext()

    const { INGREDIENTS: { INGR_ATTRS } } = FIELDS_ATTRIBUTES

    const { QTY, FRACTION, MEASURE, NAME: INGR, PREP_NOTE } = INGR_ATTRS

    const [values, setValues] = React.useState(data)

    const appendIngredient = () => {
        onSave(values)
        setValues(data)
    }

    const onCancelHandler = () => onCancel()

    const onInputChange = (ev) => {
        const updated = { ...values, [ev.target.name]: ev.target.value }
        setValues(updated)
    }

    const onFractionChange = (val) => {
        const updated = { ...values, fraction: val }
        setValues(updated)
    }

    const onMeasureChange = (val) => {
        const updated = { ...values, measure: val }
        setValues(updated)
    }

    return (
        <div className={styles['ingredient__item--wrapper']}>
            <div className={styles['ingredient__input--group']}>
                <IconButton
                    small
                    data-action="close"
                    ariaLabel="Close"
                    icon={<IconCross size={22} />}
                    onClick={onCancelHandler} />

                <NumberInput
                    label={QTY.LABEL}
                    name={QTY.NAME}
                    onChange={onInputChange}
                    value={values[QTY.NAME]}
                />

                <CustomSelect
                    label={FRACTION.LABEL}
                    name={FRACTION.NAME}
                    options={assets.fraction_options}
                    onChange={onFractionChange}
                    value={values[FRACTION.NAME]}
                />

                <CustomSelect
                    label={MEASURE.LABEL}
                    name={MEASURE.NAME}
                    options={assets.measure_options}
                    onChange={onMeasureChange}
                    value={values[MEASURE.NAME]}
                />

                <TextInput
                    label={INGR.LABEL}
                    placeholder={INGR.PLACEHOLDER}
                    name={INGR.NAME}
                    onChange={onInputChange}
                    value={values[INGR.NAME]}
                    required
                />

                <TextInput
                    label={PREP_NOTE.LABEL}
                    name={PREP_NOTE.NAME}
                    placeholder={PREP_NOTE.PLACEHOLDER}
                    onChange={onInputChange}
                    value={values[PREP_NOTE.NAME]}
                />
            </div>

            <Button
                data-action="save"
                disabled={!values.name}
                onClick={appendIngredient}>
                {index !== undefined ? 'Save' : 'Add to the list'}
            </Button>
        </div>
    )
}

export default IngredientInput
