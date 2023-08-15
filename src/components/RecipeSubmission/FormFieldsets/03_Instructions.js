import { useFieldArray, useFormContext } from 'react-hook-form'
import Alert from '@/components/Alert'
import Button from '@/components/Button'
import DeleteButton from '@/components/Button/DeleteButton'
import { TextInput } from '@/components/Form'

import styles from '../styles.module.scss'

function InstructionItem(props) {
    const {
        index,
        onRemove,
        instItemAtts: TEXT_ATTRS,
        parentField: PARENT_FIELD
    } = props

    const { register, formState: { errors } } = useFormContext()

    const nameError = errors[PARENT_FIELD]?.[index]?.[TEXT_ATTRS.NAME]

    return (
        <li className={styles['instructions__list--item']}>
            <TextInput
                multiline
                label={`${TEXT_ATTRS.LABEL} ${index + 1}`} // Step {index}
                error={nameError}
                {...register(`${PARENT_FIELD}.${index}.${TEXT_ATTRS.NAME}`, {
                    required: TEXT_ATTRS.RULES.REQUIRED
                })}
            />
            <DeleteButton
                ariaLabel="Delete instruction step"
                className={styles['button__icon--delete']}
                onClick={() => onRemove(index)}
            />
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
            <Button onClick={onAppendHandler}>
                + Add new step
            </Button>
        </>
    )
}

export default InstructionsFieldset
