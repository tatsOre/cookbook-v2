import React from 'react'
import Select from 'react-select'
import { Controller, useFormContext } from 'react-hook-form'
import CheckboxInput from '../../Checkbox'
import Input from '../../Input'
import NumberInput from '../../Form/NumberInput'
import SelectInput, { styles } from '../../Select'
import TextInput from '../../Form/TextInput'
import TextareaInput from '../../Form/TextareaInput'

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

    const { register, control, formState: { errors, defaultValues } } = useFormContext()

    const [selectedCategories, setSelectedCategories] = React.useState(
        defaultValues.categories ?? []
    )

    const categoriesOptions = assets?.categories_options ?? []
    const cuisineOptions = assets?.cuisine_options ?? []

    const categoriesLeft = `(${3 - selectedCategories.length} left)`

    return (
        <>
            <TextInput
                label={TITLE.LABEL}
                description={TITLE.DESC}
                error={errors[TITLE.NAME]}
                placeholder={TITLE.PLACEHOLDER}
                required
                {...register(TITLE.NAME, {
                    required: TITLE.RULES.REQUIRED
                })}
            />

            <TextareaInput
                label={DESCRIPTION.LABEL}
                description={DESCRIPTION.DESC}
                error={errors[DESCRIPTION.NAME]}
                placeholder={DESCRIPTION.PLACEHOLDER}
                required
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

            <NumberInput
                label={SERVINGS.LABEL}
                error={errors[SERVINGS.NAME]}
                {...register(SERVINGS.NAME, {
                    min: {
                        value: 0,
                        message: SERVINGS.RULES.MIN
                    }
                })}
            />

            <SelectInput
                label={CUISINE.LABEL}
                name={CUISINE.NAME}
                options={cuisineOptions}
            />

            {/** TODO: */}
            <div data-input-wrapper="categories">
                <Input.Label htmlFor="cat-select" style={{ marginBlockEnd: '0.4rem' }}>
                    {CATEGORIES.LABEL}
                </Input.Label>
                <span style={{ fontSize: '12px' }}>. {CATEGORIES.DESC} {categoriesLeft}</span>
                <Controller
                    name={CATEGORIES.NAME}
                    control={control}
                    render={({ field: { onChange, value, ...rest } }) => (
                        <Select
                            isMulti
                            isClearable
                            className="react-select-container"
                            defaultValue={selectedCategories}
                            options={categoriesOptions}
                            onChange={(ev) => { setSelectedCategories(ev); onChange(ev) }}
                            getOptionValue={(option) => `${option['_id']}`}
                            isOptionDisabled={() => selectedCategories.length > 2}
                            inputId='cat-select'
                            instanceId='cat-instance-select'
                            // https://github.com/JedWatson/react-select/issues/1537
                            menuPortalTarget={
                                typeof window !== "undefined" && document.querySelector('body')
                            }
                            styles={styles}
                            theme={(theme) => ({
                                ...theme,
                                borderRadius: 0,
                                colors: {
                                    ...theme.colors,
                                    primary50: '#e9e8e1',
                                    primary25: '#e9e8e1',
                                    primary: 'black',
                                },
                            })}
                            {...rest}
                        />
                    )}
                />
            </div>

            <NumberInput
                label={TIME.PREP.LABEL}
                error={errors.time?.prep}
                {...register(TIME.PREP.NAME, {
                    min: {
                        value: 0,
                        message: TIME.PREP.RULES.MIN
                    }
                })}
            />

            <NumberInput
                label={TIME.COOK.LABEL}
                error={errors.time?.cook}
                {...register(TIME.COOK.NAME, {
                    min: {
                        value: 0,
                        message: TIME.COOK.RULES.MIN
                    }
                })}
            />

            <CheckboxInput
                label={PUBLIC.LABEL}
                {...register(PUBLIC.NAME)}
            />
        </>
    )
}

export default GeneralInfoFieldset
