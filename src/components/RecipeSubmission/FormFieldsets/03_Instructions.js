import { useFieldArray, useFormContext } from 'react-hook-form'
import Alert from '@/components/Alert'
import { IconCircleMinus } from '@/components/Icon'
import Button from '../../Button'
import UnstyledButton from '../../Button/UnstyledButton'
import TextareaInput from '../../Form/TextareaInput'

import styles from '../styles.module.scss'

function InstructionItem(props) {
    const {
        index,
        onRemove,
        instItemAtts: TEXT_ATTRS,
        parentField: PARENT_FIELD
    } = props

    const { register, formState: { errors } } = useFormContext()

    const onClickHandler = (index) => onRemove(index)

    const nameError = errors[PARENT_FIELD]?.[index]
        && errors[PARENT_FIELD][index][TEXT_ATTRS.NAME]?.message

    return (
        <li className={styles['instructions__list--item']}>
            <TextareaInput
                label={`${TEXT_ATTRS.LABEL} ${index + 1}`} // Step {index}
                error={nameError}
                {...register(`${PARENT_FIELD}.${index}.${TEXT_ATTRS.NAME}`, {
                    required: TEXT_ATTRS.RULES.REQUIRED
                })}
            />
            <UnstyledButton
                className={styles['button__icon--delete']}
                onClick={onClickHandler}
            >
                <IconCircleMinus size={32} />
            </UnstyledButton>
        </li>
    )
}

/**
 * NAME: 'instructions'
 * @returns 
 */

function InstructionsFieldset({ fields }) {
    const {
        INSTRUCTIONS: { NAME, DESC, RULES, TEXT_ATTRS },
    } = fields

    const { control, formState: { errors } } = useFormContext()

    const { fields: instructions, append, remove } = useFieldArray({
        control, name: NAME, rules: {
            required: RULES.REQUIRED
        }
    })

    const onAppendHandler = () => append({ [TEXT_ATTRS.NAME]: '' })

    const onRemoveHandler = (index) => remove(index)

    const listItems = instructions.map((inst, index) => (
        <InstructionItem
            key={inst.id}
            index={index}
            instItemAtts={TEXT_ATTRS}
            parentField={NAME}
            onRemove={onRemoveHandler}
        />
    ))

    return (
        <>
            {errors[NAME]?.root || !listItems.length ? (
                <Alert
                    appearance="danger"
                    variant='light'
                    title={errors[NAME]?.root.message || RULES.REQUIRED}
                />
            ) : null}
            <ul className={styles.instructions__list}>{listItems}</ul>
            <Button onClick={onAppendHandler}>+ Add New Step</Button>
        </>
    )
}

export default InstructionsFieldset
