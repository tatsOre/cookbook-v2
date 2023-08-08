import React from "react"
import { useRouter } from "next/router"
import { FormProvider, useForm, useFormContext } from "react-hook-form"
import Alert from "../Alert"
import LoadingOverlay from "../LoadingOverlay"
import useFormSubmission, { STATUS } from "../hooks/useFormSubmission"
import TextInput from "../Form/TextInput"
import UnstyledButton from "../Button/UnstyledButton"
import { IconCheck } from "../Icon"
import Button from "../Button"

import { default as PATHS } from '../../../config'

import styles from './styles.module.scss'
/**
 * Renders a login UI and calls the onSubmit handler with the username
 * and password when the user submits the form.
 * @param {*} param0
 * @returns 
 */


function EmailInputField({ setStatus }) {
    const [formData, setFormData] = React.useState('')

    const {
        register,
        formState: { errors, isValid },
        trigger,
        clearErrors,
        getValues
    } = useFormContext()

    const { status, responseData, errorMessage } = useFormSubmission({
        endpoint: PATHS.USER.LOOKUP_EMAIL,
        data: formData,
    })

    React.useEffect(() => {
        status === STATUS.RESOLVED && setStatus(responseData)
    }, [status])

    const email = register('email', {
        required: 'Please provide an email address',
        validate: {
            maxLength: (v) =>
                v.length <= 50 || "Email address should have at most 50 characters",
            matchPattern: (v) =>
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
                "Email address must be a valid address",
        }
    })

    const validateEmail = () => {
        trigger('email', { shouldFocus: true })

        isValid && setFormData({
            email: getValues('email'),
            // set date to resend request if email remains the same:
            requestDate: new Date()
        })
    }

    return (
        <>
            {status === STATUS.REJECTED ? (
                <Alert
                    appearance="danger"
                    variant='light'
                    title={errorMessage}
                    style={{ marginBottom: '1rem' }}
                />
            ) : null}

            <TextInput
                label="Email Address"
                placeholder="bearberzatto@yeschef.com"
                autoComplete="email"
                type="email"
                error={errors.email?.message}
                {...email}
                onChange={(ev => {
                    email.onChange(ev)
                    errors.email && clearErrors('email')
                })}
            />

            <Button onClick={validateEmail} fullWidth>Continue</Button>

            {status === STATUS.PENDING ? <LoadingOverlay /> : null}
        </>
    )
}

function PasswordInputField({ mode }) {
    const [show, setShow] = React.useState(false)

    const { register, formState: { errors }, getFieldState } = useFormContext()

    return (
        <div>
            <TextInput
                label={mode === 'SIGNUP' ? 'Create a password' : "Password"}
                error={errors.password?.message}
                type={show ? 'text' : 'password'}
                {...register('password', {
                    required: 'Please provide a password',
                    minLength: 8
                })}
            />
            <UnstyledButton onClick={() => setShow(prevState => !prevState)}>
                show
            </UnstyledButton>

            {mode === 'SIGNUP' ? (
                <p>
                    <span><IconCheck size={12} strokeWidth={3} /></span>
                    Must include at least 8 characters
                </p>
            ) : null}
        </div>
    )
}

const authReducerInitialState = {
    displayName: null,
    mode: 'SIGNUP',
    heading: 'Enter your email address to log in or create an account.'
}

function authStateReducer(state, action) {
    switch (action.type) {
        case 'START': {
            return authReducerInitialState
        }
        case 'SIGNUP': {
            return {
                displayName: action.displayName,
                mode: 'SIGNUP',
                heading: 'Join Cookbook'
            }
        }
        case 'LOGIN': {
            return {
                displayName: action.displayName,
                mode: 'LOGIN',
                heading: 'Log in to Cookbook'
            }
        }
        default:
            throw new Error(`Unsupported type: ${action.type}`)
    }
}

function AuthorizationSubmission() {
    const [state, dispatch] = React.useReducer(
        authStateReducer, authReducerInitialState
    )

    const [formData, setFormData] = React.useState(null)

    const { status, responseData, errorMessage } = useFormSubmission({
        endpoint: state.mode === 'SIGNUP' ? PATHS.SIGNUP : PATHS.LOGIN,
        data: formData,
    })

    const methods = useForm({ email: '', password: '' })

    React.useEffect(() => {
        status === STATUS.RESOLVED && console.log('All good', responseData)
    }, [status])

    const onSubmit = (values) => setFormData(values)

    const setStatus = (response) => {
        response.emailExist
            ? dispatch({ type: 'LOGIN', displayName: response.displayName })
            : dispatch({ type: 'SIGNUP', displayName: response.displayName })
    }

    const resetState = () => {
        dispatch({ type: 'START' })
        setFormData(null)
        methods.setFocus('email')
        methods.resetField('password')
    }

    return (
        <>
            <h2>{state.heading}</h2>

            {status === STATUS.REJECTED ? (
                <Alert
                    appearance="danger"
                    variant='light'
                    title={errorMessage}
                    style={{ marginBottom: '1rem' }}
                />
            ) : null}

            <FormProvider {...methods}>
                <form
                    onSubmit={methods.handleSubmit(onSubmit)}
                    onKeyDown={(ev) => {
                        if (ev.key === 'Enter') ev.preventDefault()
                    }}
                    noValidate
                >
                    <div>
                        <EmailInputField setStatus={setStatus} />
                        <p>or</p>
                        <a>Continue with Google</a>
                    </div>

                    {state.displayName ? (
                        <>
                            <p>{state.displayName}</p>
                            <button onClick={resetState}>Change</button>

                            <PasswordInputField mode={state.mode} />

                            <Button type="submit">
                                {state.mode == 'LOGIN' ? 'Log in' : 'Create Account'}
                            </Button>
                        </>
                    ) : null}
                </form>
            </FormProvider>

            {status === STATUS.PENDING ? <LoadingOverlay /> : null}
        </>
    )
}

export default AuthorizationSubmission
