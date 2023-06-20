import React, { useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'

import ExtraInfoFieldset from '../RecipeForm/ExtraInfoFieldset'
import IngredientsFieldset from '../RecipeForm/IngredientsFieldset'
import InstructionsFieldset from '../RecipeForm/InstructionsFieldset'
import GeneralInfoFieldset from '../RecipeForm/GeneralInfoFieldset'

import Accordion from '../Accordion'
import Button from '../Button'
import { Form } from '../Box'

import { RECIPE_FIELDS_ATTRIBUTES, RECIPE_SCHEMA } from '../RecipeForm/utils/constants'
import { deNormalizeData, getFormAccordionState, normalizeData } from './utils'

import styles from '../RecipeForm/RecipeForm.module.scss'

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


/**
 * Function that:
 * normalize/deNormalize values
 * submits recipe POST or PUT, will contain all SUBMIT LOGIC
 * @returns 
 */

function SubmitRecipe({ data, assets, mode }) {
    const [payData, setPayData] = useState({})
    const [accState, setAccState] = useState(['item-1'])

    const initialValues = mode === 'edit' ? deNormalizeData(data) : data

    const methods = useForm({
        defaultValues: initialValues
    })

    const onSubmit = (values) => {
        if (values.photo.length > 0) {
            /** If photo file comes from input+event, set 1st value: */
            values.photo = values.photo[0]
        }
        //console.log('Submit photo', values.photo)
        const payload = normalizeData(values)
        setPayData(payload)
    }

    const onErrors = (errors) => {
        const newAccordionItemsState = getFormAccordionState(errors)
        setAccState(newAccordionItemsState)
    }

    return (
        <FormProvider {...methods}>
            <Form onSubmit={methods.handleSubmit(onSubmit, onErrors)} >
                <p style={{ marginBlockEnd: '1rem', fontSize: '14px' }}>
                    <b>* Note:</b> An asterisk indicates that the field is required. Be good.
                </p>
                <Accordion
                    value={accState}
                    onChange={setAccState}
                    className={styles['recipe__form--accordion']}
                >
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
                                /** todo: check this data flow: */
                                fields={{ INGREDIENTS, INGR_SCHEMA: RECIPE_SCHEMA.ingredients[0] }}
                                assets={assets}
                            />
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

                <Button
                    style={{ width: '100%', marginBlockStart: '1rem' }} type='submit'
                >
                    Submit
                </Button>
            </Form>
            <div style={{
                display: 'block',
                backgroundColor: 'whitesmoke',
                marginBlock: '1rem'
            }}>
                <p>JSON TO DB:</p>
                <pre>{JSON.stringify(payData, undefined, 2)}</pre>
            </div>
        </FormProvider>)
}

export default SubmitRecipe
