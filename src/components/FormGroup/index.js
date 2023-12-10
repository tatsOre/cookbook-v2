import { IconAlertCircle } from '../Icon'
import clsx from 'clsx'
import Label from './Label'
import styles from './FormGroup.module.scss'

const Wrapper = ({ className, children, name }) => {
    return (
        <div
            className={clsx(className, styles.form__group)}
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
                    className={styles.input__description}
                    id={description.id}>
                    {description.children}
                </p>
                : null}

            {children}

            {error?.children ?
                <p className={styles.input__error} id={error.id} role='alert'>
                    <IconAlertCircle size={16} />&nbsp;{error.children}
                </p>
                : null}
        </Wrapper>
    )
}

FormGroup.Wrapper = Wrapper
FormGroup.Label = Label

export default FormGroup
