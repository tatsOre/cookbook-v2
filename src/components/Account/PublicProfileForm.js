import React from "react"
import { useForm } from "react-hook-form"
import AvatarPicker from "../AvatarPicker"
import { TextInput } from "../FormInput"
import useFormSubmission from "@/hooks/useFormSubmission"
import useUser from "@/hooks/useUser"

function AccountForm() {
  const [formData, setFormData] = React.useState(null)

  const { user } = useUser()

  const { status, responseData, errorMessage } = useFormSubmission({
    endpoint: '',
    method: 'PATCH',
    data: formData,
  })

  const { register, handleSubmit } = useForm({
    defaultValues: user
  })

  const onSubmit = (data) => {
    console.log(data)
  }

  return (
    <form style={{ marginBlockStart: '1rem' }} onSubmit={handleSubmit(onSubmit)} noValidate>
      <TextInput label="name" {...register('name')} />
      <TextInput label="about" {...register('about')} multiline />
    </form>
  )
}

export default AccountForm
