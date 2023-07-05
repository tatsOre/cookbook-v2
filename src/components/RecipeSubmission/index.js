import React from "react"
import dynamic from "next/dynamic"
import { FormProvider, useForm } from "react-hook-form"
import useFormSubmission from "../FormSubmission"
import Accordion from "../Accordion"
import Alert from "../Alert"
import Layout from "./Layout"

import { deNormalizeData, normalizeData, getFormAccordionState } from "./utils"

import styles from './styles.module.scss'

const DynamicRecipeForm = dynamic(() => import('./Form')
    .catch(() => <span>Something went wrong.</span>),
    { ssr: false }
)

function RecipeSubmission({ endpoint, method, data, assets, mode }) {
    const [formData, setFormData] = React.useState(null)

    const [activeFieldsetPanel, setActiveFieldsetPanel] = React.useState(
        ['item-4']
    )

    const { status, responseData, errorMessage } = useFormSubmission({
        endpoint,
        method,
        data: formData,
    })

    const methods = useForm({
        defaultValues: mode === 'edit' ? deNormalizeData(data) : data
    })

    React.useEffect(() => {
        methods.setFocus('title')
    }, [methods.setFocus])

    const onSubmit = (values) => {
        // if string, photo did not change, check that.
        //console.log('raw values from onsubmit', values)
        if (values.photo?.length > 0 && typeof values.photo !== 'string') {
            /** If photo file comes from input+event, set 1st value: */
            values.photo = values.photo[0]
        }
        const payload = normalizeData(values)
        //console.log('onSubmitRecipe', payload)
        setFormData(payload) // submit info
    }

    const onErrors = (errors) => {
        const withErrors = getFormAccordionState(errors)
        const newState = [...activeFieldsetPanel, ...withErrors]
        setActiveFieldsetPanel(newState)
    }

    const onChange = (ev) => {
        // TODO: Save draft to session storage
    }

    return (
        <>
            {status === 'rejected' ? (
                <Alert>{errorMessage}</Alert>
            ) : null}
            <FormProvider {...methods}>
                <Accordion
                    active={activeFieldsetPanel}
                    setActive={setActiveFieldsetPanel}
                    className={styles['recipe__form--wrapper']}
                >
                    <DynamicRecipeForm
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
