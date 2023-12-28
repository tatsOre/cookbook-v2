import { IconAlertCircle } from '../Icon'
import clsx from 'clsx'
import Label from './Label'
import styles from './FormGroup.module.scss'

const Wrapper = ({ className, children, name }) => {
  return (
    <div
      className={clsx(className, styles.form__group, "w-full")}
      data-input-wrapper={name}
    >
      {children}
    </div>
  )
}

function FormGroup(props) {
  const {
    className,
    children,
    description,
    error,
    label,
  } = props

  return (
    <Wrapper className={className} name={children.props.name}>
      <Label {...label} />

      {description?.children ?
        <p
          className="text-neutral-500 text-xs md:text-sm"
          id={description.id}>
          {description.children}
        </p>
        : null}

      {children}

      {error?.children ?
        <p
          id={error.id}
          role="alert"
          className="text-red-500 text-xs inline-flex items-center"
        >
          <IconAlertCircle size={16} />&nbsp;{error.children}
        </p>
        : null}
    </Wrapper>
  )
}

FormGroup.Wrapper = Wrapper
FormGroup.Label = Label

export default FormGroup
