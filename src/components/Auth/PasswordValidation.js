import React from "react"
import { useFormContext } from "react-hook-form"
import { IconCheck } from "../Icon"
import { TextInput } from "../Form"
import UnstyledButton from "../Button/UnstyledButton"

import styles from './styles.module.scss'
import zxcvbn from "zxcvbn"
import cx from "../utils/cx"

function PasswordStrengthMeter({ password = '', description }) {
    const result = zxcvbn(password)

    console.log(result.score)

    const createPasswordLabel = (result) => {
        switch (result.score) {
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

    const progress = [... new Array(4)].map((_, index) => {
        const style = index + 1 <= result.score ? '--filled' : ''
        return <div className={styles[`progress__bar${style}`]} key={index}></div>
    })

    return (
        <div className={styles.password__strength__meter}>
            <div
                className={cx([styles['progress__wrapper']])}
                data-score={result.score}
            >
                {progress}
            </div>
            <p>
                {password ? 'Password strength: ' : 'Set a password '}
                <b>{password ? createPasswordLabel(result) : ''}</b>
            </p>
            <div className={cx([styles.pill])} data-valid={password.length > 7}>
                <IconCheck size={14} strokeWidth={4} />{' '}
                <span> {description}</span>
            </div>
        </div>
    )
}

function PasswordValidation({ mode, attrs }) {
    const [show, setShow] = React.useState(false)

    const { register, formState: { errors }, getValues } = useFormContext()

    const PASSWORD = attrs

    return (
        <div className={styles.password__fieldset}>
            <TextInput
                label={mode === 'SIGNUP'
                    ? PASSWORD.LABEL.SIGNUP : PASSWORD.LABEL.LOGIN}
                error={errors[PASSWORD.NAME]}
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
                <PasswordStrengthMeter
                    password={getValues(PASSWORD.NAME)}
                    description={PASSWORD.RULES.MIN_LENGTH.MESSAGE}
                />
            ) : null}
        </div>
    )
}


export default PasswordValidation
