/**
 * Intended for containers like form, section, div, ul? 
 */

export function Form(props) {
    const { children, onSubmit, ...rest } = props
    return <form onSubmit={onSubmit} {...rest} noValidate>
        {children}
    </form>
}
