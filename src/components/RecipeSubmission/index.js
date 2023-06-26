import React from "react"
import { FormProvider, useForm } from "react-hook-form"

import  useFormSubmission  from "../FormSubmission"
import Accordion from "../Accordion"
import Layout from "./Layout"
import Spinner from "../LoadingOverlay"
import RecipeForm from "./Form"

import { deNormalizeData, normalizeData, getFormAccordionState } from "./utils"

import styles from './styles.module.scss'

function RecipeSubmission({ endpoint, method, data, assets, mode }) {
    const [formData, setFormData] = React.useState(null)

    const [accState, setAccState] = React.useState(['item-1'])

    const { status, responseData, errorMessage } = useFormSubmission({
        endpoint,
        method,
        data: formData,
    })

    const methods = useForm({
        defaultValues: mode === 'edit' ? deNormalizeData(data) : data
    })

    const onSubmit = (values) => {
        if (values.photo.length > 0) {
            /** If photo file comes from input+event, set 1st value: */
            values.photo = values.photo[0]
        }
        const payload = normalizeData(values)
        //console.log(payload) // onSubmit from FormSubmission
        setFormData(payload) // submit info

        // with responseData.id submit photo?
        // status === resolved and photo.ok => go to recipe No. ID.
    }

    const onErrors = (errors) => {
        const newAccordionItemsState = getFormAccordionState(errors)
        setAccState(newAccordionItemsState)
    }

    const onChange = (ev) => {
        // TODO: Save draft to session storage
    }

    return (
        <>
            {status === 'rejected' ? (
                <div role="alert" style={{ color: 'red' }}>
                    {errorMessage}
                </div>
            ) : null}

            <FormProvider {...methods}>
                <Accordion
                    value={accState}
                    onChange={setAccState}
                    className={styles['recipe__form--accordion']}
                >
                    <RecipeForm
                        id="submit-recipe-form"
                        onChange={onChange}
                        onSubmit={methods.handleSubmit(onSubmit, onErrors)}
                        assets={assets}
                    />

                </Accordion>
            </FormProvider>

            {status === 'pending' ? <Spinner /> : null}
        </>
    )
}

RecipeSubmission.Layout = Layout
export default RecipeSubmission
