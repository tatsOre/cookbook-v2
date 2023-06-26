/**
 * Renders a login UI and calls the onSubmit handler with the username
 * and password when the user submits the form.
 * @param {*} param0
 * @returns 
 */

import { useRouter } from "next/router"

function LoginSubmission({ endpoint, method }) {
    const [formData, setFormData] = React.useState(null)

    const router = useRouter()

    const { status, responseData, errorMessage } = useFormSubmission({
        endpoint: 'https://auth-provider.example.com/api/login',
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

function Login({ onSubmit }) {
    function handleSubmit(event) {
        event.preventDefault()
        const { username, password } = event.target.elements

        onSubmit({
            username: username.value,
            password: password.value,
        })
    }
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="username-field">Username</label>
                <input id="username-field" name="username" type="text" />
            </div>
            <div>
                <label htmlFor="password-field">Password</label>
                <input id="password-field" name="password" type="password" />
            </div>
            <div>
                <button type="submit">Submit</button>
            </div>
        </form>
    )
}

export default Login
