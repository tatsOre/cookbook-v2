import { useFieldArray, useFormContext } from 'react-hook-form'
import Button from '../Button'
import TextareaInput from '../Textarea'

import styles from './RecipeForm.module.scss'

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
            <Button onClick={onClickHandler}>Delete</Button>
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
            {/** ↓ Error Message or Input Error? */}
            {errors[NAME]?.root
                && <p role='alert'>{errors[NAME].root.message}</p>}
            <ul>{listItems}</ul>
            <Button onClick={onAppendHandler}>
                Add instruction
            </Button>
        </>
    )
}

export default InstructionsFieldset
