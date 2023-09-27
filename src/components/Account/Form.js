import React from "react"
import AvatarPicker from "../AvatarPicker"
import { TextInput } from "../FormInput"
import useFormSubmission from "@/lib/useFormSubmission"
import { useForm } from "react-hook-form"
import useUser from "@/lib/useUser"

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
            <AvatarPicker />
        </form>
    )
}

export default AccountForm
