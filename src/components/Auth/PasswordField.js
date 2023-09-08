import React from "react"
import { useFormContext } from "react-hook-form"
import { TextInput } from "../FormInput"
import PasswordStrengthMeter from "../PasswordStrengthMeter"
import { UnstyledButton } from "../Button"

import styles from './styles.module.scss'

function PasswordField({ mode, attrs: PASSWORD }) {
    const [show, setShow] = React.useState(false)
    const [password, setPassword] = React.useState('')

    const { register, formState: { errors } } = useFormContext()

    const passwordRegister = register(PASSWORD.NAME, {
        required: PASSWORD.RULES.REQUIRED,
        minLength: PASSWORD.RULES.MIN_LENGTH.VALUE
    })

    return (
        <div className={styles.password__fieldset}>
            <TextInput
                label={mode === 'SIGNUP'
                    ? PASSWORD.LABEL.SIGNUP : PASSWORD.LABEL.LOGIN}
                error={errors[PASSWORD.NAME]}
                type={show ? 'text' : 'password'}
                {...passwordRegister}
                onChange={(ev => {
                    passwordRegister.onChange(ev)
                    /** Set value to pass it to PasswordStrengthMeter as prop **/
                    setPassword(ev.target.value)
                })}
            />
            <UnstyledButton onClick={() => setShow(prev => !prev)}>
                {show ? 'hide' : 'show'}
            </UnstyledButton>

            {mode === 'SIGNUP' ? (
                <PasswordStrengthMeter
                    password={password}
                    description={PASSWORD.RULES.MIN_LENGTH.MESSAGE}
                />
            ) : null}
        </div>
    )
}

export default PasswordField
