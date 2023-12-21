import React from "react"
import { useRouter } from "next/router"
import { FormProvider, useForm } from "react-hook-form"
import useFormSubmission, { STATUS } from "@/hooks/useFormSubmission"
import useUser from "@/hooks/useUser"
import Alert from "../Alert"
import Button from "../Button"
import EmailField from "./EmailField"
import PasswordField from "./PasswordField"
import LoadingOverlay from "../Loader"
import { IconAlertCircle } from "../Icon"
import { default as PATHS } from '../../../config'
import { default as AUTH_FIELDS_ATTRS } from "./Auth.constants"

import styles from './styles.module.scss'

const authReducerInitialState = {
  displayName: null,
  mode: 'SIGNUP',
  heading: AUTH_FIELDS_ATTRS.HEADING.DEFAULT
}

function authStateReducer(_, action) {
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

  const { mutateUser } = useUser()

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
    if (status === STATUS.RESOLVED) {
      mutateUser()
      router.replace('/recipe-box')

    }
  }, [status])

  const onSubmit = ({ email, password }) => {
    if (email && password) setFormData({ email, password })
  }

  const setAuthMode = ({ userExists, displayName }) => {
    userExists
      ? dispatch({ type: 'LOGIN', displayName })
      : dispatch({ type: 'SIGNUP', displayName })
  }

  const resetForm = () => {
    dispatch({ type: 'START' })
    setFormData(null)
    methods.setFocus(EMAIL.NAME)
    methods.resetField(PASSWORD.NAME)
  }

  return (
    <section className={styles['auth__page--section']}>
      <h2>{state.heading}</h2>

      {status === STATUS.REJECTED ? (
        <Alert appearance="danger" icon={<IconAlertCircle />}>
          {errorMessage}
        </Alert>
      ) : null}

      {state.displayName ? (
        <p>
          <b>{state.displayName}</b>
          <Button
            data-info="change-email"
            className="ml-4"
            onClick={resetForm}
            unstyled
            compact
          >
            change
          </Button>
        </p>
      ) : null}

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
          {/** Render the email field component **/}
          <EmailField
            setStatus={setAuthMode}
            displayNameIsSet={Boolean(state.displayName)}
            attrs={EMAIL}
          />

          {state.displayName ? (
            <>
              {/** Render the password field component and strength meter **/}
              <PasswordField mode={state.mode} attrs={PASSWORD} />

              <Button type="submit" primary uppercase fullWidth>
                {state.mode == 'LOGIN' ? 'Log in' : 'Create Account'}
              </Button>
            </>
          ) : null}
        </form>
      </FormProvider>

      {status === STATUS.PENDING ? <LoadingOverlay /> : null}
    </section>
  )
}

export default AuthorizationSubmission
/*                     
<div data-info="auth-providers">
    <div><span>or</span></div>
    <a>Continue with Google - soon</a>
</div> 
*/
