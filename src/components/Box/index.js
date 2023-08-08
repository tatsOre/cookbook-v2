/**
 * Intended for containers like form, section, div, ul? 
 */

export function Form(props) {
    const { children, onSubmit, ...rest } = props
    return (
        <form
            onSubmit={onSubmit}
            onKeyDown={(ev) => {
                if (ev.key === 'Enter') ev.preventDefault()
            }}
            {...rest}
            noValidate
        >
            {children}
        </form>
    )
}
