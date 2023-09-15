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
import { CLOUDINARY } from "../../../config"

const DynamicRecipeForm = dynamic(() => import('./Form')
    .catch(() => <span>Something went wrong.</span>),
    { ssr: false }
)

function RecipeSubmission({ endpoint, data, mode }) {
    const [formData, setFormData] = React.useState(null)

    const [photoError, setPhotoError] = React.useState(null)

    const [activeFieldset, setActiveFieldset] = React.useState(
        ['item-3']
    )

    const { status, responseData, errorMessage } = useFormSubmission({
        endpoint,
        method: mode === 'edit' ? 'PATCH' : 'POST',
        data: formData,
    })

    const methods = useForm({
        defaultValues: mode === 'edit' ? deNormalizeData(data) : {}
    })

    const router = useRouter()

    React.useEffect(() => {
        status === STATUS.RESOLVED && router.push(`/recipes/${responseData.doc}`)
    }, [status])

    const onSubmit = async (values) => {
        // TODO: Create a cloudinary service to add/delete resources
        // If photo || photo changed:
        if (
            typeof values.photo !== 'string'
            && (values.photo?.length > 0 || values.photo.size)
        ) {
            // If photo file comes from input+event, set 1st value:
            if (values.photo?.length > 0) {
                values.photo = values.photo[0]
            }
            const imageUploadData = new FormData()
            imageUploadData.append("file", values.photo)
            imageUploadData.append("folder", CLOUDINARY.FOLDER)
            imageUploadData.append("upload_preset", CLOUDINARY.PRESET)

            const cloudinaryResponse = await fetch(CLOUDINARY.URL, {
                method: 'POST',
                body: imageUploadData
            })

            if (cloudinaryResponse.ok) {
                const imageURL = await cloudinaryResponse.json()
                values.photo = imageURL.secure_url;
            } else {
                setPhotoError('Something went wrong. Try later.')
                return
            }
        }

        const payload = normalizeData(values)
        console.log({ errors: methods.formState.errors })
        console.log(payload)
        //setFormData(payload) // submit info
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
