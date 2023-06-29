import React from "react"
import { useRouter } from "next/router"
import Login from "./Form"
import Alert from "../Alert"
import useFormSubmission from "../FormSubmission"

/**
 * Renders a login UI and calls the onSubmit handler with the username
 * and password when the user submits the form.
 * @param {*} param0
 * @returns 
 */

function LoginSubmission({ endpoint }) {
    const [formData, setFormData] = React.useState(null)

    const router = useRouter()

    const { status, responseData, errorMessage } = useFormSubmission({
        endpoint,
        data: formData,
    })

    //status === 'resolved' && router.back()

    return (
        <>
            {status === 'rejected' ? (
                <Alert appearance="danger">{errorMessage}</Alert>
            ) : null}
            <Login onSubmit={data => setFormData(data)} />
            {status === 'pending' ? <Spinner /> : null}
        </>
    )
}

export default LoginSubmission
