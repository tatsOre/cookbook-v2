import PropTypes from 'prop-types'

function InputDescription(props) {
    const {
        children,
        className,
        id,
        ...rest
    } = props
    return (<p id={id}>{children}</p>)
}

InputDescription.propTypes = {
    /** Content */
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
}

export default InputDescription
