import React from "react"
import { Controller, useFormContext } from 'react-hook-form'
import CustomSelect from "@/components/Select"
import { NumberInput, TextInput } from "@/components/FormInput"
import { Button, IconButton, UnstyledButton } from "@/components/Button"
import { IconCross } from "@/components/Icon"
import { useRecipeSubmissionContext } from "../../context"
import { getIngredientLabel } from "@/components/RecipeView/RecipeView.helpers"
import { default as FIELDS_ATTRIBUTES, RECIPE_SCHEMA } from '../../constants'

import styles from './Ingredients.module.scss'

function RegisteredInput({
    index,
    item,
    activeField,
    setActiveField,
}) {
    const { control, register, formState: { errors, dirtyFields } } = useFormContext()

    const { assets } = useRecipeSubmissionContext()

    const { INGREDIENTS: { NAME: INGREDIENTS, INGR_ATTRS } } = FIELDS_ATTRIBUTES

    const { QTY, FRACTION, MEASURE, NAME: INGR, PREP_NOTE } = INGR_ATTRS

    const fieldError = errors[INGREDIENTS]?.[index]?.[INGR.NAME] || (
        dirtyFields[INGREDIENTS]?.[index]?.[INGR.NAME]
        && { type: 'required', message: INGR.RULES.REQUIRED }
    )

    const onSave = () => {
        setActiveField({ index: null, active: false })
    }

    const onClickHandler = () => {
        setActiveField({ index, active: true })
    }

    return <li>
        {activeField.index === index ? (
            <>
                <div className={styles['ingredient__item--wrapper']}>
                    <NumberInput
                        label={QTY.LABEL}
                        {...register(`${INGREDIENTS}.${index}.${QTY.NAME}`)}
                    />

                    <Controller
                        control={control}
                        name={`${INGREDIENTS}.${index}.${FRACTION.NAME}`}
                        render={({ field }) =>
                            <CustomSelect
                                label={FRACTION.LABEL}
                                options={assets?.fraction_options}
                                {...field}
                            />}
                    />

                    <Controller
                        control={control}
                        name={`${INGREDIENTS}.${index}.${MEASURE.NAME}`}
                        render={({ field }) =>
                            <CustomSelect
                                label={MEASURE.LABEL}
                                options={assets?.measure_options}
                                {...field}
                            />}
                    />

                    <TextInput
                        label={INGR.LABEL}
                        error={fieldError}
                        required
                        {...register(`${INGREDIENTS}.${index}.${INGR.NAME}`, {
                            required: INGR.RULES.REQUIRED
                        })}
                    />

                    <TextInput
                        label={PREP_NOTE.LABEL}
                        {...register(`${INGREDIENTS}.${index}.${PREP_NOTE.NAME}`)}
                    />
                </div>
                <Button
                    data-action="save"
                    disabled={!item.name}
                    onClick={onSave}
                >
                    Done
                </Button>
            </>
        ) : (
            <UnstyledButton
                data-action="step-idle"
                onClick={onClickHandler}
            >
                <span>{getIngredientLabel(item)}</span>
            </UnstyledButton>
        )}
    </li>
}

function NewIngredientInput({ append, onCancel }) {
    const { assets } = useRecipeSubmissionContext()

    const { INGREDIENTS: { INGR_ATTRS } } = FIELDS_ATTRIBUTES

    const { QTY, FRACTION, MEASURE, NAME: INGR, PREP_NOTE } = INGR_ATTRS

    const SCHEMA = RECIPE_SCHEMA.ingredients[0]

    const [values, setValues] = React.useState(SCHEMA)

    const appendIngredient = () => {
        append(values)
        setValues(SCHEMA)
    }

    const onCancelHandler = () => {
        onCancel()
        setValues(SCHEMA)
    }

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
        <div>
            <div className={styles['ingredient__item--wrapper']}>
                <NumberInput
                    label={QTY.LABEL}
                    name={QTY.NAME}
                    onChange={onInputChange}
                />

                <CustomSelect
                    label={FRACTION.LABEL}
                    name={FRACTION.NAME}
                    options={assets.fraction_options}
                    onChange={onFractionChange}
                />

                <CustomSelect
                    label={MEASURE.LABEL}
                    name={MEASURE.NAME}
                    options={assets.measure_options}
                    onChange={onMeasureChange}
                />

                <TextInput
                    label={INGR.LABEL}
                    placeholder={INGR.PLACEHOLDER}
                    name={INGR.NAME}
                    onChange={onInputChange}
                    required
                />

                <TextInput
                    label={PREP_NOTE.LABEL}
                    name={PREP_NOTE.NAME}
                    placeholder={PREP_NOTE.PLACEHOLDER}
                    onChange={onInputChange}
                />
            </div>

            <Button
                data-action="close"
                ariaLabel="Close"
                icon={<IconCross />}
                onClick={onCancelHandler}>
                Cancel
            </Button>

            <Button
                data-action="save"
                disabled={!values.name}
                onClick={appendIngredient}>
                Add to the list
            </Button>
        </div>
    )
}

export { RegisteredInput, NewIngredientInput }
