import React from "react"
import PropTypes from 'prop-types'
import { useFormContext } from "react-hook-form"
import useFormSubmission, { STATUS } from "@/lib/useFormSubmission"
import Alert from "../Alert"
import Button from "../Button"
import LoaderOverlay from "../Loader/LoaderOverlay"
import { TextInput } from "../FormInput"
import { default as PATHS } from '../../../config'

import styles from './styles.module.scss'

function EmailField({ setStatus, displayNameIsSet, attrs: EMAIL }) {
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

    const emailRegister = register(EMAIL.NAME, {
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

    const checkIfEmailExists = () => {
        trigger(EMAIL.NAME, { shouldFocus: true })

        isValid && setFormData({
            email: getValues(EMAIL.NAME),
            // set date to resend request if email remains the same:
            requestDate: new Date()
        })
    }

    return (
        <div
            className={styles.email__fieldset}
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
                autoFocus
                {...emailRegister}
                onChange={(ev => {
                    emailRegister.onChange(ev)
                    errors.email && clearErrors(EMAIL.NAME)
                })}
            />

            <Button onClick={checkIfEmailExists} fullWidth>Continue</Button>

            {status === STATUS.PENDING ? <LoaderOverlay /> : null}
        </div>
    )
}

EmailField.propTypes = {
    setStatus: PropTypes.func,
    displayNameIsSet: PropTypes.bool,
    attrs: PropTypes.object
}

export default EmailField
