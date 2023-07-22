import React from "react"
import { useForm } from "react-hook-form"
import TextInput from "../Form/TextInput"
import Button from "../Button"

function Login({ onSubmit }) {
    const [state, setState] = React.useState(false)

    const { register, handleSubmit, formState } = useForm()
    const { errors } = formState
    return (
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <p>Join Cookbook</p>

            <fieldset>
                {state ? (
                    <button onClick={() => setState(false)}>
                        edit
                    </button>
                ) : null}

                <TextInput
                    label="Email Address"
                    error={errors.email?.message}
                    required
                    {...register('email', { required: 'Email required' })}
                />
                
                {!state ? (
                    <Button onClick={() => setState(true)}>
                        Continue
                    </Button>

                ) : null}
            </fieldset>

            {state ? (
                <fieldset>
                    <TextInput
                        label="Password"
                        error={errors.password?.message}
                        required
                        {...register('password', { required: 'Password required' })}
                    />
                    <Button>
                        Create Account
                    </Button>
                </fieldset>

            ) : null}




        </form>
    )
}

export default Login
