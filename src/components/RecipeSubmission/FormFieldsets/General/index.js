import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import CheckboxInput from '@/components/Checkbox'
import Dropdown from '@/components/Dropdown'
import { NumberInput, TextInput } from '@/components/FormInput'
import { useRecipeSubmissionContext } from '../../context'

import styles from '../../styles.module.scss'

function GeneralInfo() {
  const { assets, fieldsAttributes } = useRecipeSubmissionContext()

  const {
    TITLE,
    DESCRIPTION,
    MAIN_INGR,
    SERVINGS,
    CUISINE,
    CATEGORIES,
    PUBLIC
  } = fieldsAttributes

  const { control, register, formState: { errors }, watch } = useFormContext()

  const watchCategories = watch("categories", [])

  const categoriesLeft = `(${3 - watchCategories.length} left)`

  const categoriesLabel = <>
    {CATEGORIES.LABEL}.&nbsp;
    <small style={{}}>{CATEGORIES.DESC} {categoriesLeft}</small>
  </>

  return (
    <div className={styles.about__fieldset}>
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

      <TextInput
        label={MAIN_INGR.LABEL}
        error={errors[MAIN_INGR.NAME]}
        placeholder={MAIN_INGR.PLACEHOLDER}
        {...register(MAIN_INGR.NAME)}
      />

      <NumberInput
        label={SERVINGS.LABEL}
        error={errors[SERVINGS.NAME]}
        {...register(SERVINGS.NAME)}
      />

      <Controller
        control={control}
        name={CATEGORIES.NAME}
        render={({ field }) =>
          <Dropdown
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
          <Dropdown
            label={CUISINE.LABEL}
            options={assets?.cuisine_options}
            {...field}
          />}
      />

      <CheckboxInput
        label={PUBLIC.LABEL}
        {...register(PUBLIC.NAME)}
      />
    </div>
  )
}

export default GeneralInfo
