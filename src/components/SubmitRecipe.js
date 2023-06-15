import React, { useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'

import ExtraInfoFieldset from './RecipeForm/ExtraInfoFieldset'
import IngredientsFieldset from './RecipeForm/IngredientsFieldset'
import InstructionsFieldset from './RecipeForm/InstructionsFieldset'
import GeneralInfoFieldset from './RecipeForm/GeneralInfoFieldset'

import { Form } from './Input'

import styles from '@/styles/Form.module.css'
import Button from './Button'

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
                <GeneralInfoFieldset assets={assets} />
                <IngredientsFieldset assets={assets} />
                <InstructionsFieldset />
                <ExtraInfoFieldset />

                <Button type='submit'>Submit</Button>
            </Form>

            <div className={styles.pre}>
                <p>JSON TO DB:</p>
                <pre>{JSON.stringify(payData, undefined, 2)}</pre>
            </div>
        </FormProvider>)
}

export default SubmitRecipe
