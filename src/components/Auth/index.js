import React from "react"
import { useRouter } from "next/router"
import { FormProvider, useForm } from "react-hook-form"
import Alert from "../Alert"
import LoadingOverlay from "../Loader"
import useFormSubmission, { STATUS } from "@/lib/useFormSubmission"
import Button from "../Button"
import UnstyledButton from "../Button/UnstyledButton"
import EmailField from "./EmailField"
import PasswordField from "./PasswordField"
import { default as PATHS } from '../../../config'
import { default as AUTH_FIELDS_ATTRS } from "./Auth.constants"

import styles from './styles.module.scss'

const authReducerInitialState = {
    displayName: null,
    mode: 'SIGNUP',
    heading: AUTH_FIELDS_ATTRS.HEADING.DEFAULT
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
                heading: AUTH_FIELDS_ATTRS.HEADING.SIGNUP
            }
        }
        case 'LOGIN': {
            return {
                displayName: action.displayName,
                mode: 'LOGIN',
                heading: AUTH_FIELDS_ATTRS.HEADING.LOGIN
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

    const router = useRouter()

    const { status, responseData, errorMessage } = useFormSubmission({
        endpoint: state.mode === 'SIGNUP' ? PATHS.SIGNUP : PATHS.LOGIN,
        data: formData,
    })

    const { EMAIL, PASSWORD } = AUTH_FIELDS_ATTRS

    const methods = useForm({
        email: EMAIL.DEFAULT_VALUE,
        password: PASSWORD.DEFAULT_VALUE
    })

    React.useEffect(() => {
        status === STATUS.RESOLVED && router.back()
    }, [status])

    const onSubmit = ({ email, password }) => {
        email && password && setFormData({ email, password })
    }

    const setStatus = ({ emailExist, displayName }) => {
        emailExist
            ? dispatch({ type: 'LOGIN', displayName })
            : dispatch({ type: 'SIGNUP', displayName })
    }

    const resetState = () => {
        dispatch({ type: 'START' })
        setFormData(null)
        methods.setFocus(EMAIL.NAME)
        methods.resetField(PASSWORD.NAME)
    }

    return (
        <section className={styles.auth__section}>
            <h2 style={{ fontWeight: '300', fontSize: '1.4rem', textWrap: 'balance' }}>{state.heading}</h2>

            {status === STATUS.REJECTED ? (
                <Alert
                    appearance="danger"
                    variant='light'
                    title={errorMessage}
                    style={{ marginBottom: '1rem' }}
                />
            ) : null}

            {state.displayName ? (
                <p>
                    <b>{state.displayName}</b>&nbsp;&nbsp;
                    <UnstyledButton onClick={resetState}>Change</UnstyledButton>
                </p>
            ) : null}

            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
                    {/** Render the email field component **/}
                    <EmailField
                        setStatus={setStatus}
                        displayNameIsSet={Boolean(state.displayName)}
                        attrs={EMAIL}
                    />
                    {state.displayName ? (
                        <>
                            {/** Render the password field component and strength meter **/}
                            <PasswordField mode={state.mode} attrs={PASSWORD} />

                            <Button type="submit" fullWidth>
                                {state.mode == 'LOGIN' ? 'Log in' : 'Create Account'}
                            </Button>
                        </>
                    ) : null}

                    <div className={styles.auth__providers}>
                        <div><span>or</span></div>
                        <a>Continue with Google - soon</a>
                    </div>
                </form>
            </FormProvider>

            {status === STATUS.PENDING ? <LoadingOverlay /> : null}
        </section>
    )
}

export default AuthorizationSubmission
