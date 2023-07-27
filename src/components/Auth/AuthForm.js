import React from "react"
import { useForm } from "react-hook-form"
import TextInput from "../Form/TextInput"
import Button from "../Button"
import UnstyledButton from "../Button/UnstyledButton"
import Link from "next/link"

function AuthForm({ onSubmit, mode }) {
    const [showPassword, setShowPassword] = React.useState(false)

    const { register, handleSubmit, formState } = useForm()
    const { errors } = formState

    const signup = mode === 'register'

    return (
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
            {signup ? (
                <TextInput
                    label="Your name"
                    error={errors.password?.message}
                    placeholder="Carmen Berzatto"
                    {...register('name', { required: 'Please enter your full name' })}
                />
            ) : null}

            <TextInput
                label="Your email address"
                placeholder="bearberzatto@yeschef.com"
                error={errors.email?.message}
                {...register('email', { required: 'Please provide an email address' })}
            />

            <TextInput
                label="Create password"
                description="Password must be at least 6 characters"
                error={errors.password?.message}
                type="password"
                {...register('password', { required: 'Please create a password' })}
            />

            {signup ? (
                <TextInput
                    label="Confirm your password"
                    error={errors['passwordRepeat']?.message}
                    {...register('passwordRepeat', { required: 'Please confirm your password' })}
                />
            ) : null}

            <Button type="submit">
                {signup ? 'Create Account' : 'Sign in'}
            </Button>

            <p>Already have an account?</p>

            <Link href='/' passHref legacyBehavior>
                <UnstyledButton>login</UnstyledButton>
            </Link>


        </form>
    )
}

export default AuthForm
