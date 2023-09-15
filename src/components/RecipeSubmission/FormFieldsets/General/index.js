import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import CheckboxInput from '@/components/Checkbox'
import CustomSelect from '@/components/Select'
import { NumberInput, TextInput } from '@/components/FormInput'
import { useRecipeSubmissionContext } from '../../context'

function GeneralInfo() {
    const { assets, fieldsAttributes } = useRecipeSubmissionContext()
    
    const {
        TITLE,
        DESCRIPTION,
        MAIN_INGR,
        SERVINGS,
        TIME,
        CUISINE,
        CATEGORIES,
        PUBLIC
    } = fieldsAttributes

    const { control, register, formState: { errors }, watch } = useFormContext()

    const watchCategories = watch("categories", [])

    const categoriesLeft = `(${3 - watchCategories.length} left)`

    const categoriesLabel = <>
        {CATEGORIES.LABEL}.&nbsp;
        <span style={{ fontSize: '12px' }}>
            {CATEGORIES.DESC} {categoriesLeft}
        </span>
    </>
console.log('Rendering general')
    return (
        <>
            <TextInput
                label={TITLE.LABEL}
                description={TITLE.DESC}
                error={errors[TITLE.NAME]}
                placeholder={TITLE.PLACEHOLDER}
                required
                autoFocus
                {...register(TITLE.NAME, {
                    required: TITLE.RULES.REQUIRED
                })}
            />

            <TextInput
                label={DESCRIPTION.LABEL}
                description={DESCRIPTION.DESC}
                error={errors[DESCRIPTION.NAME]}
                placeholder={DESCRIPTION.PLACEHOLDER}
                required
                multiline
                rows={3}
                {...register(DESCRIPTION.NAME, {
                    required: DESCRIPTION.RULES.REQUIRED
                })}
            />

{/*             <TextInput
                label={MAIN_INGR.LABEL}
                error={errors[MAIN_INGR.NAME]}
                placeholder={MAIN_INGR.PLACEHOLDER}
                required
                {...register(MAIN_INGR.NAME, {
                    required: MAIN_INGR.RULES.REQUIRED
                })}
            /> */}

            <Controller
                control={control}
                name={CATEGORIES.NAME}
                render={({ field }) =>
                    <CustomSelect
                        isMulti
                        label={categoriesLabel}
                        options={assets?.categories_options}
                        isOptionDisabled={() => watchCategories.length > 2}
                        {...field}
                    />}
            />

            <Controller
                control={control}
                name={CUISINE.NAME}
                render={({ field }) =>
                    <CustomSelect
                        label={CUISINE.LABEL}
                        options={assets?.cuisine_options}
                        {...field}
                    />}
            />

            <NumberInput
                label={SERVINGS.LABEL}
                error={errors[SERVINGS.NAME]}
                {...register(SERVINGS.NAME)}
            />

            <NumberInput
                label={TIME.PREP.LABEL}
                error={errors.time?.prep}
                {...register(TIME.PREP.NAME)}
            />

            <NumberInput
                label={TIME.COOK.LABEL}
                error={errors.time?.cook}
                {...register(TIME.COOK.NAME)}
            />

            <CheckboxInput
                label={PUBLIC.LABEL}
                {...register(PUBLIC.NAME)}
            />
        </>
    )
}

export default GeneralInfo
