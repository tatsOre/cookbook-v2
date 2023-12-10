import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'

import styles from './Checkbox.module.scss'

/**
 * This component accepts all the HTML Checkbox type attributes
 * @returns   React Component
 */

const CheckboxInput = React.forwardRef((props, ref) => {
  const {
    appearance = 'standard',
    checked,
    className,
    errors,
    label,
    hintContent,
    id,
    showInputLabel = true,
    showCheckedLabel,
    ...rest
  } = props

  const _id = id || React.useId()

  return (
    <div
      className={clsx(className, styles.input__wrapper)}
      data-input-wrapper={props.name}
    >
      <input id={_id} ref={ref} type="checkbox" {...rest} />
      <label
        htmlFor={_id}
        className={clsx(
          styles.input__label,
          !showInputLabel && styles['visually-hidden'],
          (checked && showCheckedLabel) && styles['input__label--checked']
        )}>
        {label}
      </label>
    </div>
  )
})

CheckboxInput.propTypes = {
  /** Sets the style of the component. Defaults to `standard`, but supports `error` and `success`. */
  appearance: PropTypes.string,

  /** Whether or not the input is checked */
  checked: PropTypes.bool,

  /** Custom `class` for the input wrapper */
  className: PropTypes.string,

  /** Whether or not the input is enabled */
  disabled: PropTypes.bool,

  /** Sets the contents for validation errors and will be displayed below the input element. */
  error: PropTypes.string,

  /** The text that appears next to the input. Should always be set even when hidden for accessibility support. */
  label: PropTypes.node,

  /** Sets styling to the label text when the input is checked. Customize according to context. */
  showCheckedLabel: PropTypes.bool,

  /** Defaults to true, but set to `false` to visibly hide the content passed to `inputLabel`. */
  showInputLabel: PropTypes.bool,

  /** Text displayed directly under the input with additional information about the expected input */
  description: PropTypes.string,
}

export default CheckboxInput
