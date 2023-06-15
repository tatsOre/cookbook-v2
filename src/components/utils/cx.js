const cx = (arr) =>
    Array.isArray(arr) ? arr.filter(Boolean).join(' ') : ''

export default cx
