import React from "react"
import { useFormContext } from "react-hook-form"
import useFormSubmission, { STATUS } from "../hooks/useFormSubmission"
import Alert from "../Alert"
import Button from "../Button"
import LoadingOverlay from "../LoadingOverlay"
import { TextInput } from "../Form"
import cx from "../utils/cx"
import { default as PATHS } from '../../../config'

import styles from './styles.module.scss'

/**
 * Renders email input UI, verifies account and sets response.
 * @param {*} setStatus 
 * @returns 
 */

function EmailSubmission({ setStatus, displayNameIsSet, attrs }) {
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

    const EMAIL = attrs

    const email = register(EMAIL.NAME, {
        required: EMAIL.RULES.REQUIRED,
        validate: {
            maxLength: (v) =>
                v.length <= EMAIL.RULES.MAX_LENGTH.VALUE ||
                EMAIL.RULES.MAX_LENGTH.MESSAGE,
            matchPattern: (v) =>
                EMAIL.RULES.VALIDATION.PATTERN.test(v) ||
                EMAIL.RULES.VALIDATION.MESSAGE,
        }
    })

    const validateEmail = () => {
        trigger(EMAIL.NAME, { shouldFocus: true })

        isValid && setFormData({
            email: getValues(EMAIL.NAME),
            // set date to resend request if email remains the same:
            requestDate: new Date()
        })
    }

    return (
        <div
            className={cx([styles.email__fieldset])}
            data-active={!displayNameIsSet}
        >
            {status === STATUS.REJECTED ? (
                <Alert
                    appearance="danger"
                    variant='light'
                    title={errorMessage}
                    style={{ marginBottom: '1rem' }}
                />
            ) : null}

            <TextInput
                label={EMAIL.LABEL}
                placeholder={EMAIL.PLACEHOLDER}
                autoComplete={EMAIL.NAME}
                type="email"
                error={errors[EMAIL.NAME]}
                {...email}
                onChange={(ev => {
                    email.onChange(ev)
                    errors.email && clearErrors(EMAIL.NAME)
                })}
            />

            <Button onClick={validateEmail} fullWidth>Continue</Button>

            {status === STATUS.PENDING ? <LoadingOverlay /> : null}
        </div>
    )
}

export default EmailSubmission
