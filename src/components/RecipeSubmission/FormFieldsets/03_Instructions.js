import { useFieldArray, useFormContext, useWatch } from 'react-hook-form'
import Alert from '@/components/Alert'
import Button from '@/components/Button'
import { TextInput } from '@/components/FormInput'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import styles from '../styles.module.scss'
import UnstyledButton from '@/components/Button/UnstyledButton'
import { IconGripVertical, IconTrash } from '@/components/Icon'
import React from 'react'

function InstructionStep({
    index,
    value,
    onRemove,
    instItemAtts: TEXT_ATTRS,
    parentField: PARENT_FIELD,
}) {
    const [showField, setShowField] = React.useState(false)

    const [label, setLabel] = React.useState(value)

    const { register, formState: { errors } } = useFormContext()

    const nameError = errors[PARENT_FIELD]?.[index]?.[TEXT_ATTRS.NAME]

    const stepNameKey = `${PARENT_FIELD}.${index}.${TEXT_ATTRS.NAME}`

    const onCancel = () => {
        !value && onRemove(index)
        setShowField(false)
    }

    const inputRegister = register(stepNameKey, {
        required: TEXT_ATTRS.RULES.REQUIRED
    })

    return (
        <li className={styles['instructions__list--item']} style={{ position: "relative" }}>

            {!showField && value ? (
                <UnstyledButton
                    data-name="step-idle"
                    onClick={() => setShowField(true)}
                >
                    <span>
                        <b>{`${TEXT_ATTRS.LABEL} ${index + 1}`}.</b>
                        {' '}
                        {label}
                    </span>
                </UnstyledButton>
            ) : null}

            {showField || !value ? (
                <>
                    <UnstyledButton data-name="delete" onClick={onCancel}>
                        Close
                    </UnstyledButton>

                    <TextInput
                        autoFocus={showField}
                        multiline
                        label={`${TEXT_ATTRS.LABEL} ${index + 1}`} // Step {index}
                        error={nameError}
                        {...inputRegister}
                        onChange={(ev) => {
                            inputRegister.onChange(ev)
                            setLabel(ev.target.value)
                        }}
                    />
                </>
            ) : null}
        </li>
    )
}

function InstructionsFieldset({ fields }) {
    const [modeEditAll, setModeEditAll] = React.useState(false)

    const {
        INSTRUCTIONS: { NAME, RULES, TEXT_ATTRS },
    } = fields

    const { control, formState: { errors } } = useFormContext()

    const { fields: steps, append, remove, move } = useFieldArray({
        control, name: NAME, rules: {
            required: RULES.REQUIRED
        }
    })

    const onAppendHandler = () => append({ [TEXT_ATTRS.NAME]: '' })

    const onRemoveHandler = (index) => remove(index)

    const showEditAll = steps.filter(step => step.text).length > 1

    const contentFields = steps.map((step, index) => {
        return (
            <InstructionStep
                key={step.id}
                value={step.text}
                index={index}
                instItemAtts={TEXT_ATTRS}
                parentField={NAME}
                onRemove={onRemoveHandler}
            />
        )
    })

    return (
        <React.Fragment>
            {errors[NAME]?.root || !contentFields.length ? (
                <Alert
                    appearance="danger"
                    variant='light'
                    title={errors[NAME]?.root.message || RULES.REQUIRED}
                />
            ) : null}

            {showEditAll && (
                <div style={{ backgroundColor: 'lightgrey' }}>
                    <p>Tap "Edit All" to organize or delete steps. Tap a step to edit.</p>
                    <UnstyledButton
                        onClick={() => setModeEditAll(prev => !prev)}
                    >
                        {modeEditAll ? 'Done' : 'Edit All'}
                    </UnstyledButton>
                </div>
            )}

            {modeEditAll
                ? <DraggableStepsList
                    steps={steps}
                    onDelete={onRemoveHandler}
                    onMove={move}
                />
                : (<>
                    <ul className={styles.instructions__list}>{contentFields}</ul>
                    <Button onClick={onAppendHandler}>
                        + Add a step
                    </Button>
                </>)}


        </React.Fragment>
    )
}

function DraggableStepsList({ steps, onDelete, onMove }) {
    const onDragEndHandler = ({ destination, source }) => {
        // dropped outside the list:
        if (!destination) return
        // same item:
        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return
        }
        onMove(source.index, destination.index)
    }

    const filtered = steps.filter(step => step.text)

    const content = filtered.map((step, index) => {
        const di_id = `drag-ingr-${step.id}`

        return (
            <Draggable key={di_id} draggableId={di_id} index={index}>
                {(provided) => (
                    <li
                        key={step.id}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className={styles.draggable__item}
                    >
                        <UnstyledButton
                            ariaLabel={`Delete Step No. ${index + 1}`}
                            className={styles['button__icon--delete']}
                            onClick={() => onDelete(index)}
                        >
                            <IconTrash size={20} strokeWidth={1.5} />
                        </UnstyledButton>

                        <span>
                            <b>Step {index + 1}.</b>
                            {' '}
                            {step.text}
                        </span>

                        <UnstyledButton
                            ariaLabel="Drag and drop step"
                            {...provided.dragHandleProps}
                            data-type="drag-handler"
                        >
                            <IconGripVertical />
                        </UnstyledButton>
                    </li>
                )}
            </Draggable>
        )
    })
    return (
        <DragDropContext onDragEnd={onDragEndHandler}>
            <Droppable droppableId='dnd-ingredients-list' direction='vertical'>
                {(provided) => (
                    <ul
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className={styles.instructions__list}
                    >
                        {content}
                        {provided.placeholder}
                    </ul>
                )}
            </Droppable>
        </DragDropContext>
    )
}

export default InstructionsFieldset
