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

    const categoriesLeft = `(${3 - selectedCategories.length} left)`

    return (
        <>
            <TextInput
                label={TITLE.LABEL}
                description={TITLE.DESC}
                error={errors[TITLE.NAME]?.message}
                placeholder={TITLE.PLACEHOLDER}
                required
                {...register(TITLE.NAME, {
                    required: TITLE.RULES.REQUIRED
                })}
            />

            <TextareaInput
                label={DESCRIPTION.LABEL}
                description={DESCRIPTION.DESC}
                error={errors[DESCRIPTION.NAME]?.message}
                placeholder={DESCRIPTION.PLACEHOLDER}
                required
                {...register(DESCRIPTION.NAME, {
                    required: DESCRIPTION.RULES.REQUIRED
                })}
            />

            <TextInput
                label={MAIN_INGR.LABEL}
                description={MAIN_INGR.DESC}
                error={errors[MAIN_INGR.NAME]?.message}
                placeholder={MAIN_INGR.PLACEHOLDER}
                required
                {...register(MAIN_INGR.NAME, {
                    required: MAIN_INGR.RULES.REQUIRED
                })}
            />

            <SelectInput
                label={CUISINE.LABEL}
                description={CUISINE.DESC}
                name={CUISINE.NAME}
                options={assets.CUISINE_OPTIONS}
            />

            {/** TODO: */}
            <div data-input-wrapper="categories">
                <Input.Label htmlFor="cat-select" >
                    {CATEGORIES.LABEL}
                </Input.Label>
                <Input.Description>
                    {CATEGORIES.DESC} <span>{categoriesLeft}</span>
                </Input.Description>
                <Controller
                    name={CATEGORIES.NAME}
                    control={control}
                    render={({ field: { onChange, value, ...rest } }) => (
                        <Select
                            isMulti
                            isClearable
                            defaultValue={selectedCategories}
                            options={assets.CATEGORIES_OPTIONS}
                            onChange={(ev) => { setSelectedCategories(ev); onChange(ev) }}
                            getOptionValue={(option) => `${option['_id']}`}
                            isOptionDisabled={() => selectedCategories.length > 2}
                            inputId='cat-select'
                            instanceId='cat-instance-select'
                            // https://github.com/JedWatson/react-select/issues/1537
                            // todo: use useEffect to check window
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
                label={SERVINGS.LABEL}
                error={errors[SERVINGS.NAME]?.message}
                {...register(SERVINGS.NAME, {
                    min: {
                        value: 0,
                        message: SERVINGS.RULES.MIN
                    }
                })}
            />

            <NumberInput
                label={TIME.PREP.LABEL}
                error={errors.time?.prep?.message}
                {...register(TIME.PREP.NAME, {
                    min: {
                        value: 0,
                        message: TIME.PREP.RULES.MIN
                    }
                })}
            />

            <NumberInput
                label={TIME.COOK.LABEL}
                error={errors.time?.cook?.message}
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
