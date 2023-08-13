function Form(props) {
    const { children, ...rest } = props
    return <form {...rest} noValidate> {children} </form>
}

export default Form
