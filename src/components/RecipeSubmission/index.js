import React from "react"
import dynamic from "next/dynamic"
import { useRouter } from "next/router"
import { FormProvider, useForm } from "react-hook-form"


import useFormSubmission, { STATUS } from "@/lib/useFormSubmission"
import Accordion from "../Accordion"
import Alert from "../Alert"
import Layout from "./Layout"
import LoaderOverlay from "../Loader/LoaderOverlay"
import { deNormalizeData, normalizeData, getFormAccordionState } from "./helpers"
import cloudinaryService from "@/services/cloudinary"

const DynamicRecipeForm = dynamic(() => import('./Form')
    .catch(() => <span>Something went wrong.</span>),
    { ssr: false }
)

function RecipeSubmission({ endpoint, data, mode }) {
    const [formData, setFormData] = React.useState(null)

    const [photoError, setPhotoError] = React.useState(null)

    const [activeFieldset, setActiveFieldset] = React.useState(
        ['item-4']
    )

    const { status, responseData, errorMessage } = useFormSubmission({
        endpoint,
        method: mode === 'edit' ? 'PATCH' : 'POST',
        data: formData,
    })

    const methods = useForm({
        defaultValues: mode === 'edit' ? deNormalizeData(data) : null
    })

    const router = useRouter()

    React.useEffect(() => {
        status === STATUS.RESOLVED && router.push(`/recipes/${responseData.doc}`)
    }, [status])

    const onSubmit = async (values) => {
        if (values.photo?.size) {

            const [data, error] = await cloudinaryService.upload(values.photo)
  
            if (error) {
                return setPhotoError(error)
            } else {
                values.photo = data
            }
        }

        const payload = normalizeData(values)
        //console.log(payload)
        setFormData(payload) // submit info
    }

    const onErrors = (errors) => {
        const withErrors = getFormAccordionState(errors)
        const newState = [...activeFieldset, ...withErrors]
        setActiveFieldset(newState)
    }

    return (
        <>
            {status === STATUS.REJECTED || photoError ? (
                <Alert
                    appearance="danger"
                    variant='light'
                    title={errorMessage || photoError}
                    style={{ marginBottom: '1rem' }}
                />
            ) : null}

            <FormProvider {...methods}>
                <Accordion
                    active={activeFieldset}
                    setActive={setActiveFieldset}
                    multiple
                >
                    <DynamicRecipeForm
                        id="submit-recipe-form"
                        onSubmit={methods.handleSubmit(onSubmit, onErrors)}
                    />
                </Accordion>
            </FormProvider>

            {status === STATUS.PENDING ? <LoaderOverlay /> : null}
        </>
    )
}

RecipeSubmission.Layout = Layout
export default RecipeSubmission
