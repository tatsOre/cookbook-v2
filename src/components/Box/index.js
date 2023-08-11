/**
 * Intended for containers like form, section, div, ul? 
 */

export function Form(props) {
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
