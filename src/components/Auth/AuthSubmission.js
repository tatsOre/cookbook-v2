import React from "react"
import { useRouter } from "next/router"
import Alert from "../Alert"
import AuthForm from "./AuthForm"
import Layout from "./Layout"
import LoadingOverlay from "../LoadingOverlay"
import useFormSubmission from "../FormSubmission"

/**
 * Renders a login UI and calls the onSubmit handler with the username
 * and password when the user submits the form.
 * @param {*} param0
 * @returns 
 */

function AuthSubmission({ endpoint, mode }) {
    const [formData, setFormData] = React.useState(null)

    const router = useRouter()

    const { status, responseData, errorMessage } = useFormSubmission({
        endpoint,
        data: formData,
    })

    const onSubmit = (values) => {
        if (values.passwordRepeat) {
            delete values.passwordRepeat
        }
        setFormData(values)
    }

    //status === 'resolved' && router.back()

    if (status == 'resolved') {
        console.log(responseData)
    }

    return (
        <>
            {status === 'rejected' ? (
                <Alert
                    appearance="danger"
                    variant='light'
                    title={errorMessage}
                    style={{ marginBottom: '1rem' }}
                />
            ) : null}
            <AuthForm onSubmit={onSubmit} mode={mode} />
            {status === 'pending' ? <LoadingOverlay /> : null}
        </>
    )
}

AuthSubmission.Layout = Layout
export default AuthSubmission
