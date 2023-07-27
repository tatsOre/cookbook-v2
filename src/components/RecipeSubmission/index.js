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
import { CLOUDINARY } from "../../../config"

const DynamicRecipeForm = dynamic(() => import('./Form')
    .catch(() => <span>Something went wrong.</span>),
    { ssr: false }
)

function RecipeSubmission({ endpoint, data, assets, mode }) {
    const [formData, setFormData] = React.useState(null)

    const [photoError, setPhotoError] = React.useState(null)

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

    const onSubmit = async (values) => {
        // If photo || photo changed:
        if (
            typeof values.photo !== 'string'
            && (values.photo?.length > 0 || values.photo.size)
        ) {
            // If photo file comes from input+event, set 1st value:
            if (values.photo?.length > 0) {
                values.photo = values.photo[0]
            }
            console.log(values.photo)

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
        //console.log(payload)
        setFormData(payload) // submit info
    }

    const onErrors = (errors) => {
        const withErrors = getFormAccordionState(errors)
        const newState = [...activeFieldset, ...withErrors]
        setActiveFieldset(newState)
    }

    // TODO: Save draft to session storage
    const onChange = (ev) => { }

    status === 'resolved' && router.push(`/recipes/${responseData.id}`)

    return (
        <>
            {status === 'rejected' || photoError ? (
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
