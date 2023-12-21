import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'

/**
 * This component accepts all the HTML button attributes
 * If an action button is needed, use the prop withLeftIcon|withRightIcon for the icon and an ariaLabel
 * @returns   React Component
 */

const Button = (props) => {
  const {
    ariaLabel,
    children,
    className,
    compact,
    disabled,
    fullWidth,
    isProcessing,
    withLeftIcon,
    withRightIcon,
    uppercase,
    type = 'button',
    primary,
    secondary,
    danger,
    unstyled = false,
    ...rest
  } = props

  const isActionButton = !children && !!(withLeftIcon || withRightIcon)

  const classes = clsx(
    "justify-center items-center inline-flex",
    !unstyled && "gap-2 border transition-all",
    !unstyled && !isActionButton ? compact ? "px-3.5 h-8 sm:h-7" : "px-8 py-2.5" : undefined,
    isActionButton ? compact ? "h-10 w-10 md:h-8 md:w-8" : "h-10 w-10" : undefined,
    primary && "bg-neutral-700 border-neutral-700 text-white", // temp colors
    secondary && "bg-neutral-100 border-neutral-700",
    danger && "bg-red-500 border-red-500 text-white",
    disabled && "disabled:opacity-75",
    fullWidth && "w-full",
    className
  )

  const labelClasses = clsx(
    "w-full",
    !unstyled && "font-semibold tracking-wider",
    !unstyled ? compact ? "text-[0.65rem]" : "text-xs" : undefined,
    uppercase && "uppercase",
  )

  return (
    <button
      aria-label={ariaLabel}
      className={classes}
      disabled={disabled || isProcessing}
      type={type}
      {...rest}
    >
      {withLeftIcon && (
        <span aria-hidden="true">{withLeftIcon}</span>
      )}

      {!isActionButton && <span className={labelClasses}>{children}</span>}

      {withRightIcon && (
        <span aria-hidden="true">{withRightIcon}</span>
      )}
    </button>
  )
}

Button.propTypes = {
  /** If the button triggers new content to appear (e.g.: modals and dropdowns) */
  ariaHaspopup: PropTypes.bool,

  /** If the button does not contain text children. (e.g.: icon buttons) */
  ariaLabel: PropTypes.string,

  /** Is the button is enabled? */
  disabled: PropTypes.bool,

  /** Button text content */
  children: PropTypes.node,

  /** Optional click handler */
  onClick: PropTypes.func,

  /** Optional focus handler */
  onFocus: PropTypes.func,

  /** HTML attribute */
  type: PropTypes.oneOf(['button', 'reset', 'submit'])
}

export default Button
