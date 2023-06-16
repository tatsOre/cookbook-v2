const cx = (values) => {
    if (Array.isArray(values)) {
        return values.filter(Boolean).join(' ')
    } else if (typeof values == 'string') {
        return values
    } else {
        console.warn('Provide and array or string for className')
    }
}

export default cx
