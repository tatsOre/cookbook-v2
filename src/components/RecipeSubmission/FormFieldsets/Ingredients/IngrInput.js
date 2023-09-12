import React from "react"
import { Controller, useFormContext } from 'react-hook-form'
import CustomSelect from "@/components/Select"
import { NumberInput, TextInput } from "@/components/FormInput"
import { IconButton, UnstyledButton } from "@/components/Button"
import { IconCross } from "@/components/Icon"
import { useRecipeSubmissionContext } from "../../context"
import { getIngredientLabel } from "@/components/RecipeView/RecipeView.helpers"
import { default as FIELDS_ATTRIBUTES, RECIPE_SCHEMA } from '../../constants'

import styles from './Ingredients.module.scss'

function ListIngrInput({
    index,
    item,
    activeField,
    setActiveField,
}) {
    const { control, register, formState: { errors } } = useFormContext()

    const { assets } = useRecipeSubmissionContext()

    const { INGREDIENTS: { NAME: INGREDIENTS, INGR_ATTRS } } = FIELDS_ATTRIBUTES

    const { QTY, FRACTION, MEASURE, NAME: INGR, PREP_NOTE } = INGR_ATTRS

    const ingrNameFieldError = errors[INGREDIENTS]?.[index]?.[INGR.NAME]

    const onSave = () => {
        setActiveField({ index: null, active: false })
    }

    const onClickHandler = () => {
        setActiveField({ index, active: true })
    }

    return item ?
        <li>
            {activeField.index === index ? (
                <div>
                    <UnstyledButton
                        data-action="save"
                        disabled={!item.name}
                        onClick={onSave}
                    >
                        Done
                    </UnstyledButton>

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
                            error={ingrNameFieldError}
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
                </div>
            ) : (
                <UnstyledButton
                    data-action="step-idle"
                    onClick={onClickHandler}
                >
                    <span>{getIngredientLabel(item)}</span>
                </UnstyledButton>
            )}
        </li>
        : null
}

function NewIngredientInput({
    append,
    onCancel,
    className
}) {
    const { assets } = useRecipeSubmissionContext()

    const { INGREDIENTS: { INGR_ATTRS } } = FIELDS_ATTRIBUTES

    const { QTY, FRACTION, MEASURE, NAME: INGR, PREP_NOTE } = INGR_ATTRS

    const SCHEMA = RECIPE_SCHEMA.ingredients[0]

    const [values, setValues] = React.useState(SCHEMA)

    const appendIngredient = () => {
        console.log(values)
        append(values)
        setValues(initialValues)
    }

    const onCancelHandler = () => {
        //onCancel()
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
        <div className={className}>
            <IconButton
                data-action="close"
                ariaLabel="Close"
                icon={<IconCross />}
                onClick={onCancelHandler}
            />

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

            <UnstyledButton data-action="save"
                disabled={!values.name}
                onClick={appendIngredient}>
                Save
            </UnstyledButton>
        </div>
    )
}

export { ListIngrInput, NewIngredientInput }
