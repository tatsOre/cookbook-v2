import { useForm } from "react-hook-form"
import TextInput from "../Form/TextInput"
import Button from "../Button"

function Login({ onSubmit }) {

    const { register, handleSubmit, formState } = useForm()
    const { errors } = formState
    return (
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <TextInput
                label="Email Address"
                error={errors.email?.message}
                required
                {...register('email', { required: 'Email required' })}
            />

            <TextInput
                label="Password"
                error={errors.password?.message}
                required
                {...register('password', { required: 'Password required' })}
            />

            <Button type="submit">
                Continue
            </Button>
        </form>
    )
}

export default Login
