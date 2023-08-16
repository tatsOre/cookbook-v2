import React from 'react'
import { useFormContext } from 'react-hook-form'
import CheckboxInput from '@/components/Checkbox'
import SelectInput from '@/components/Select'
import { NumberInput, TextInput } from '@/components/FormInput'

function GeneralInfoFieldset({ assets, fields }) {
    const {
        TITLE,
        DESCRIPTION,
        MAIN_INGR,
        SERVINGS,
        TIME,
        CUISINE,
        CATEGORIES,
        PUBLIC
    } = fields

    const { register, formState: { errors }, watch } = useFormContext()

    const categoriesOptions = assets?.categories_options ?? []
    const cuisineOptions = assets?.cuisine_options ?? []
    /** https://react-hook-form.com/docs/useform/watch */
    const watchCategories = watch("categories", [])
    const categoriesLeft = `(${3 - watchCategories.length} left)`

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
                rows={4}
                {...register(DESCRIPTION.NAME, {
                    required: DESCRIPTION.RULES.REQUIRED
                })}
            />

            <TextInput
                label={MAIN_INGR.LABEL}
                error={errors[MAIN_INGR.NAME]}
                placeholder={MAIN_INGR.PLACEHOLDER}
                required
                {...register(MAIN_INGR.NAME, {
                    required: MAIN_INGR.RULES.REQUIRED
                })}
            />

            <SelectInput
                isMulti
                label={
                    <>
                        {CATEGORIES.LABEL}
                        <span style={{ fontSize: '12px' }}>. {CATEGORIES.DESC} {categoriesLeft}</span>
                    </>
                }
                id='cat-select'
                name={CATEGORIES.NAME}
                options={categoriesOptions}
                isOptionDisabled={() => watchCategories.length > 2}
            />

            <SelectInput
                label={CUISINE.LABEL}
                name={CUISINE.NAME}
                options={cuisineOptions}
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

export default GeneralInfoFieldset
