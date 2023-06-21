import React from 'react'
import PropTypes from 'prop-types'
import cx from "../utils/cx"
import Input from '../Input'

import styles from './Checkbox.module.scss'

/**
 * This component accepts all the HTML Textarea attributes
 * @returns   React Component
 */

const CheckboxInput = React.forwardRef((props, ref) => {
  const appearance = props.disabled ? 'disabled' : props.appearance
console.log(props)
  const getCheckboxProps = () => {
    const {
      appearance,
      className,
      errors,
      label,
      hintContent,
      showInputLabel,
      showCheckedLabel,
      ...otherProps
    } = props
    return { ...otherProps }
  }
  return (
    <div className={cx([props.className, 'checkbox-wrapper'])}>

      <label
        className={cx([
          'checkbox-label',
          `checkbox-label--${appearance}`,
          props.checked && props.showCheckedLabel && 'checkbox-label--checked'
        ])}>
        <input
          ref={ref}
          className="visually-hidden"
          type="checkbox"
          {...getCheckboxProps()}

        />

        <span
          className={cx([
            'checkbox-checkmark',
            `checkbox-checkmark--${appearance}`,
            props.checked && 'checkbox-checkmark--checked'
          ])}
          aria-hidden="true"></span>

        <span
          className={cx([
            'checkbox-label--text',
            !props.showInputLabel && 'visually-hidden'
          ])}>
          {props.label}
        </span>
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
  errors: PropTypes.string,

  /** The text that appears next to the input. Should always be set even when hidden for accessibility support. */
  label: PropTypes.node,

  /** Sets styling to the label text when the input is checked. Customize according to context. */
  showCheckedLabel: PropTypes.bool,

  /** Defaults to true, but set to `false` to visibly hide the content passed to `inputLabel`. */
  showInputLabel: PropTypes.bool,

  /** Text displayed directly under the input with additional information about the expected input */
  hintContent: PropTypes.string,
  /** Optional change handler
   */
  onChange: PropTypes.func,

  /** The input value */
  value: PropTypes.string
}

CheckboxInput.defaultProps = {
  appearance: 'standard',
  showInputLabel: true
}

export default CheckboxInput