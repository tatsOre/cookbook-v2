import React from "react"
import AvatarPicker from "../AvatarPicker"
import { TextInput } from "../FormInput"
import useFormSubmission from "@/lib/useFormSubmission"

function AccountForm() {
    const [formData, setFormData] = React.useState(null)

    const { status, responseData, errorMessage } = useFormSubmission({
        endpoint: '',
        method: 'PATCH',
        data: formData,
    })

    return (
        <form>
            <TextInput label="name" />
            <TextInput label="about" />
            <TextInput type="email" label="email" />
            <AvatarPicker />
        </form>
    )
}

export default AccountForm
