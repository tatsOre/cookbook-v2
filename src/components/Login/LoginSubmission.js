import { useRouter } from "next/router"
import Login from "./Form"

/**
 * Renders a login UI and calls the onSubmit handler with the username
 * and password when the user submits the form.
 * @param {*} param0
 * @returns 
 */

function LoginSubmission({ endpoint, method }) {
    const [formData, setFormData] = React.useState(null)

    const router = useRouter()

    const { status, responseData, errorMessage } = useFormSubmission({
        endpoint: 'https://auth-provider.example.com/api/login',
        method,
        data: formData,
    })

    status === 'resolved' && router.back()

    return (
        <>
            {status === 'rejected' ? (
                <div role="alert" style={{ color: 'red' }}>
                    {errorMessage}
                </div>
            ) : null}
            <Login onSubmit={data => setFormData(data)} />
            {status === 'pending' ? <Spinner /> : null}
        </>
    )
}

export default LoginSubmission
