import React from 'react'
import PropTypes from 'prop-types'
import cx from "../utils/cx"

import styles from './Checkbox.module.scss'

/**
 * This component accepts all the HTML Textarea attributes
 * @returns   React Component
 */

const CheckboxInput = React.forwardRef((props, ref) => {
  const {
    appearance,
    className,
    disabled,
    errors,
    label,
    hintContent,
    showInputLabel,
    showCheckedLabel,
    ...rest
  } = props

  const appearancesClasses = disabled ? 'disabled' : appearance

  return (
    <div 
      className={cx([className, styles.input__wrapper])}
      data-input-wrapper={''}
      >
      
      <label
        className={cx([
          styles.input__label,
          styles[`checkbox__label--${appearance}`],
          (rest.checked && showCheckedLabel) && styles['input_label--checked']
        ])}>

        <input
          ref={ref}
          className={styles['visually-hidden']}
          type="checkbox"
          {...rest}

        />

        <span
          className={cx([
            styles.checkbox__icon,
            styles[`checkbox__icon--${appearance}`]
          ])}
          aria-hidden="true"></span>

        <span
          className={cx([
            styles['input__label--text'],
            !showInputLabel && styles['visually-hidden']
          ])}>
          {label}
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

CheckboxInput.defaultProps = {
  appearance: 'standard',
  showInputLabel: true
}

export default CheckboxInput