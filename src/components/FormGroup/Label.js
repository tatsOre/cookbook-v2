import PropTypes from 'prop-types'
import clsx from 'clsx'

function Label(props) {
  const {
    children,
    className,
    htmlFor,
    id,
    required,
    hideInputLabel,
    ...rest
  } = props

  const classes = clsx(
    className, "input-label font-semibold inline-block", { "sr-only": hideInputLabel }
  )

  return (
    <label
      id={id}
      htmlFor={htmlFor}
      className={classes}
      aria-hidden={hideInputLabel}
      {...rest}
    >
      {children}
      {required && <span className='text-red-400' aria-hidden>*</span>}
    </label>)
}

Label.defaultProps = {
  hideInputLabel: false
}

Label.propTypes = {
  /** Content */
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),

  /** Adds an asterisk to the label if the input is require */
  required: PropTypes.bool,

  /** Defaults to true, but set to `false` to visibly hide the content passed to `label` */
  hideInputLabel: PropTypes.bool,
}

export default Label
