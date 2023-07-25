import React from "react"
import dynamic from "next/dynamic"
import { useRouter } from "next/router"
import { FormProvider, useForm } from "react-hook-form"
import useFormSubmission from "../FormSubmission"
import Accordion from "../Accordion"
import Alert from "../Alert"
import Layout from "./Layout"
import LoadingOverlay from "../LoadingOverlay"
import { deNormalizeData, normalizeData, getFormAccordionState } from "./utils"

const DynamicRecipeForm = dynamic(() => import('./Form')
    .catch(() => <span>Something went wrong.</span>),
    { ssr: false }
)

function RecipeSubmission({ endpoint, data, assets, mode }) {
    const [formData, setFormData] = React.useState(null)

    const [activeFieldset, setActiveFieldset] = React.useState(
        ['item-1']
    )

    const { status, responseData, errorMessage } = useFormSubmission({
        endpoint,
        method: mode === 'edit' ? 'PATCH' : 'POST',
        data: formData,
    })

    const methods = useForm({
        defaultValues: mode === 'edit' ? deNormalizeData(data) : data
    })

    const router = useRouter()

    React.useEffect(() => {
        methods.setFocus('title')
    }, [methods.setFocus])

    const onSubmit = (values) => {
        // If photo || photo did not change:
        if (values.photo?.length > 0 && typeof values.photo !== 'string') {
            // If photo file comes from input+event, set 1st value:
            values.photo = values.photo[0]
        }
        const payload = normalizeData(values)
        setFormData(payload) // submit info
    }

    const onErrors = (errors) => {
        const withErrors = getFormAccordionState(errors)
        const newState = [...activeFieldset, ...withErrors]
        setActiveFieldset(newState)
    }

    // TODO: Save draft to session storage
    const onChange = (ev) => { }

    status === 'resolved' && router.push(`/recipes/${responseData._id}`)

    return (
        <>
            {status === 'rejected' ? (
                <Alert
                    appearance="danger"
                    variant='light'
                    title={errorMessage}
                    style={{ marginBottom: '1rem' }} />
            ) : null}

            <FormProvider {...methods}>
                <Accordion
                    active={activeFieldset}
                    setActive={setActiveFieldset}
                >
                    <DynamicRecipeForm
                        id="submit-recipe-form"
                        onChange={onChange}
                        onSubmit={methods.handleSubmit(onSubmit, onErrors)}
                        assets={assets}
                    />
                </Accordion>
            </FormProvider>

            {status === 'pending' ? <LoadingOverlay /> : null}
        </>
    )
}

RecipeSubmission.Layout = Layout
export default RecipeSubmission
