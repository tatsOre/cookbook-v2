import { useFieldArray, useFormContext } from 'react-hook-form'

import Accordion from '../Accordion'
import Button from '../Button'
import TextareaInput from '../Textarea'
import { RECIPE_FIELDS_ATTRIBUTES } from './utils/constants'

import styles from '@/styles/Form.module.css'

const {
    INSTRUCTIONS: { NAME, DESC, RULES, TEXT_ATTRS },
} = RECIPE_FIELDS_ATTRIBUTES


function InstructionItem(props) {
    const { index, onRemove } = props

    const { register, formState: { errors } } = useFormContext()

    const onClickHandler = (index) => onRemove(index)

    const nameError = errors[NAME]?.[index]
        && errors[NAME][index][TEXT_ATTRS.NAME]?.message

    return (
        <li className={styles.instructions}>
            <TextareaInput
                label={`${TEXT_ATTRS.LABEL} ${index + 1}`} // Step N.
                error={nameError}
                {...register(`${NAME}.${index}.${TEXT_ATTRS.NAME}`, {
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

function InstructionsFieldset() {
    const { control, formState: { errors }, watch } = useFormContext()

    const { fields, append, remove } = useFieldArray({
        control, name: NAME, rules: {
            required: RULES.REQUIRED
        }
    })

    const watchFieldArray = watch(NAME)

    const controlledFields = fields.map((field, index) => {
        return {
            ...field,
            ...watchFieldArray[index]
        }
    })

    const onAppendHandler = () => append({ [TEXT_ATTRS.NAME]: '' })

    const onRemoveHandler = (index) => remove(index)

    const listItems = controlledFields.map((inst, index) => (
        <InstructionItem
            key={inst.id}
            index={index}
            onRemove={onRemoveHandler} />
    ))

    return (
        <Accordion.Item>
            <Accordion.Trigger>How To Make</Accordion.Trigger>
            <Accordion.Panel>
                {/** ↓ Error Message or Input Error? */}
                {errors[NAME]?.root
                    && <p role='alert'>{errors[NAME].root.message}</p>}
                <ul>{listItems}</ul>
                <Button onClick={onAppendHandler}>
                    Add instruction
                </Button>
            </Accordion.Panel>
        </Accordion.Item>
    )
}

export default InstructionsFieldset
