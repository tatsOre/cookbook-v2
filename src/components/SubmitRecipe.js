import React, { useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'

import ExtraInfoFieldset from './RecipeForm/ExtraInfoFieldset'
import IngredientsFieldset from './RecipeForm/IngredientsFieldset'
import InstructionsFieldset from './RecipeForm/InstructionsFieldset'
import GeneralInfoFieldset from './RecipeForm/GeneralInfoFieldset'

import { Form } from './Input'

import styles from '@/styles/Form.module.css'
import Button from './Button'
import Accordion from './Accordion'

import { RECIPE_FIELDS_ATTRIBUTES } from './RecipeForm/utils/constants'

const {
    TITLE,
    DESCRIPTION,
    MAIN_INGR,
    SERVINGS,
    TIME,
    CUISINE,
    CATEGORIES,
    PHOTO,
    COMMENTS,
    INGREDIENTS,
    INSTRUCTIONS
} = RECIPE_FIELDS_ATTRIBUTES

function deNormalizeData(values) {
    const instructions = values.instructions.length
        ? values.instructions.map(inst => ({ text: inst }))
        : [{ text: '' }]
    return {
        ...values,
        instructions
    }
}

function normalizeData(values) {
    const instructions = values.instructions.map(inst => inst.text)
    const categories = values.categories.map(cat => cat._id)
    // TODO: NORMALIZE FRACTION & MEASURE IN INGRE.
    return {
        ...values,
        categories,
        instructions,
        cuisine: values.cuisine?._id
    }
}

/**
 * Function that:
 * normalize/deNormalize values
 * submits recipe POST or PUT, will contain all SUBMIT LOGIC
 * @returns 
 */

function SubmitRecipe({ data, assets }) {
    const [payData, setPayData] = useState({})

    const methods = useForm({
        defaultValues: deNormalizeData(data)
    })

    const onSubmit = (values) => {
        if (values.photo.length > 0) {
            /** If photo file comes from input+event, set 1st value: */
            values.photo = values.photo[0]
        }
        console.log('Submit photo', values.photo)

        const payload = normalizeData(values)
        setPayData(payload)
    }

    return (
        <FormProvider {...methods}>
            <Form onSubmit={methods.handleSubmit(onSubmit)} >
                <Accordion>
                    <Accordion.Item value="item-1">
                        <Accordion.Trigger>General Info</Accordion.Trigger>
                        <Accordion.Panel>
                            <GeneralInfoFieldset
                                fields={{
                                    TITLE,
                                    DESCRIPTION,
                                    MAIN_INGR,
                                    SERVINGS,
                                    TIME,
                                    CUISINE,
                                    CATEGORIES
                                }}
                                assets={assets} />
                        </Accordion.Panel>
                    </Accordion.Item>
                    <Accordion.Item value="item-2">
                        <Accordion.Trigger>Ingredients</Accordion.Trigger>
                        <Accordion.Panel>
                            <IngredientsFieldset
                                fields={{ INGREDIENTS }}
                                assets={assets} />
                        </Accordion.Panel>
                    </Accordion.Item>
                    <Accordion.Item value="item-3">
                        <Accordion.Trigger>How To Make</Accordion.Trigger>
                        <Accordion.Panel>
                            <InstructionsFieldset
                                fields={{ INSTRUCTIONS }} />
                        </Accordion.Panel>
                    </Accordion.Item>
                    <Accordion.Item value="item-4">
                        <Accordion.Trigger>
                            Extra Comments & Photos
                        </Accordion.Trigger>
                        <Accordion.Panel>
                            <ExtraInfoFieldset
                                fields={{ PHOTO, COMMENTS }}
                            />
                        </Accordion.Panel>
                    </Accordion.Item>
                </Accordion>

                <Button type='submit'>Submit</Button>
            </Form>

            <div className={styles.pre}>
                <p>JSON TO DB:</p>
                <pre>{JSON.stringify(payData, undefined, 2)}</pre>
            </div>
        </FormProvider>)
}

export default SubmitRecipe
