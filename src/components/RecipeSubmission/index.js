import React from "react"
import dynamic from "next/dynamic"
import { useRouter } from "next/router"
import { FormProvider, useForm } from "react-hook-form"
import useFormSubmission, { STATUS } from "@/hooks/useFormSubmission"
import Accordion from "../Accordion"
import Alert from "../Alert"
import LoaderOverlay from "../Loader/LoaderOverlay"
import RecipeForm from "./Form"
import { deNormalizeData, normalizeData, getFormAccordionState } from "./helpers"
import cloudinaryService from "@/services/cloudinary"

function RecipeSubmission({ endpoint, recipe, isEdit }) {
  const [formData, setFormData] = React.useState(null)

  const [photoError, setPhotoError] = React.useState(null)

  const [activeFieldset, setActiveFieldset] = React.useState(
    ['item-1']
  )

  const { status, responseData, errorMessage } = useFormSubmission({
    endpoint,
    method: isEdit ? 'PATCH' : 'POST',
    data: formData,
  })

  const methods = useForm({
    defaultValues: isEdit ? deNormalizeData(recipe) : null
  })

  const router = useRouter()

  React.useEffect(() => {
    status === STATUS.RESOLVED && router.push(`/recipes/${responseData.doc}`)
  }, [status])

  const onSubmit = async (values) => {
    // If we have a local file, upload it to Cloudinary
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
          <RecipeForm
            onSubmit={methods.handleSubmit(onSubmit, onErrors)}
          />
        </Accordion>
      </FormProvider>

      {status === STATUS.PENDING ? <LoaderOverlay /> : null}
    </>
  )
}

export default RecipeSubmission
