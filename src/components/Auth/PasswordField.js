import React from "react"
import { useFormContext } from "react-hook-form"
import { IconCheck } from "../Icon"
import { TextInput } from "../Form"
import UnstyledButton from "../Button/UnstyledButton"

import styles from './styles.module.scss'
import zxcvbn from "zxcvbn"
import cx from "../utils/cx"

function PasswordStrengthMeter({ password = '', description }) {
    const strength = zxcvbn(password).score

    const createPasswordLabel = (value) => {
        switch (value) {
            case 0:
                return 'Weak';
            case 1:
                return 'Weak';
            case 2:
                return 'Fair';
            case 3:
                return 'Good';
            case 4:
                return 'Strong';
            default:
                return null;
        }
    }

    return (
        <div className={styles.password__strength__meter}>
            <div className={styles['strength-meter']}>
                <div className={styles['strength-meter-fill']} data-strength={strength}></div>
            </div>
            <p>
                {password ? 'Password strength: ' : 'Set a password'}
                <b>{password ? createPasswordLabel(strength) : ''}</b>
            </p>
            <div className={cx([styles.pill])} data-valid={password.length > 7}>
                <IconCheck size={14} strokeWidth={4} />{' '}
                <span> {description}</span>
            </div>
        </div>
    )
}

function PasswordField({ mode, attrs: PASSWORD }) {
    const [show, setShow] = React.useState(false)
    const [password, setPassword] = React.useState()

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
