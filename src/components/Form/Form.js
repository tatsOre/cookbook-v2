function Form(props) {
    const { children, ...rest } = props

    const onKeyDown = (ev) => {
        if (ev.key === 'Enter') ev.preventDefault()
    }

    return (
        <form onKeyDown={onKeyDown} {...rest} noValidate>
            {children}
        </form>
    )
}

export default Form
