import React from "react"
import { useFormContext } from "react-hook-form"
import { IconCheck } from "../Icon"
import { TextInput } from "../Form"
import UnstyledButton from "../Button/UnstyledButton"

import styles from './styles.module.scss'

function PassportValidation({ mode, attrs }) {
    const [show, setShow] = React.useState(false)

    const { register, formState: { errors } } = useFormContext()

    const PASSWORD = attrs

    return (
        <div>
            <TextInput
                label={mode === 'SIGNUP'
                    ? PASSWORD.LABEL.SIGNUP : PASSWORD.LABEL.LOGIN}
                error={errors[PASSWORD.NAME]?.message}
                type={show ? 'text' : 'password'}
                {...register(PASSWORD.NAME, {
                    required: PASSWORD.RULES.REQUIRED,
                    minLength: PASSWORD.RULES.MIN_LENGTH.VALUE
                })}
            />
            <UnstyledButton onClick={() => setShow(prevState => !prevState)}>
                show
            </UnstyledButton>

            {mode === 'SIGNUP' ? (
                <p>
                    <span><IconCheck size={12} strokeWidth={3} /></span>
                    {PASSWORD.RULES.MIN_LENGTH.MESSAGE}
                </p>
            ) : null}
        </div>
    )
}


export default PassportValidation
