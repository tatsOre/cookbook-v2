import PropTypes from 'prop-types'

function InputError(props) {
    const {
        children,
        className,
        id,
        ...rest
    } = props
    return (<p role='alert' id={id}>{children}</p>)
}

InputError.propTypes = {
    /** Content */
    children: PropTypes.oneOfType([
        PropTypes.string, PropTypes.node
    ]),
    id: PropTypes.string
}

export default InputError
