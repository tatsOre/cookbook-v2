import React from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import Alert from '@/components/Alert'
import Button from '@/components/Button'
import UnstyledButton from '@/components/Button/UnstyledButton'
import { ListItemInput, NewStepInput } from './StepInput'
import DraggableStepsList from './DraggableList'

import styles from './Instructions.module.scss'

function InstructionsFieldset({ fields }) {
    const {
        INSTRUCTIONS: { NAME, RULES, TEXT_ATTRS },
    } = fields

    const { control, formState: { errors, isDirty } } = useFormContext()

    const { fields: steps, append, remove, move } = useFieldArray({
        control, name: NAME, rules: {
            required: RULES.REQUIRED
        }
    })

    const [modeEditAll, setModeEditAll] = React.useState(false)

    const [activeField, setActiveField] = React.useState({
        /** If steps array is empty, we're in create recipe mode, we start with an empty input. */
        index: steps.length ? null : -1,
        value: null
    })

    React.useEffect(() => {
        steps.length === 0 && setModeEditAll(false)
    }, [steps.length])

    const onRemoveHandler = (index) => remove(index)

    const onToggleEditMode = () => setModeEditAll(prev => !prev)

    const resetActiveField = () => setActiveField({ index: null, value: null })

    const showNewInput = () => setActiveField({ index: -1, value: null })

    const content = steps.map((step, index) => {
        return (
            <ListItemInput
                key={step.id}
                value={step.text}
                index={index}
                instItemAtts={TEXT_ATTRS}
                parentField={NAME}
                activeField={activeField}
                setActiveField={setActiveField}
            />
        )
    })

    return (
        <React.Fragment>
            {errors[NAME]?.root || (!steps.length && isDirty) ? (
                <Alert
                    appearance="danger"
                    variant='light'
                    title={errors[NAME]?.root.message || RULES.REQUIRED}
                />
            ) : null}

            {activeField.index === -1 || !steps.length
                ? <NewStepInput
                    append={append}
                    onCancel={resetActiveField}
                />
                : <Button onClick={showNewInput}>+ Add a step</Button>
            }

            {(steps.length > 1 || modeEditAll) && (
                <div>
                    <p>Tap "Edit All" to organize or delete steps. Tap a step to edit.</p>
                    <UnstyledButton onClick={onToggleEditMode}>
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
                : <ul className={styles.instructions__list}>
                    {content}
                </ul>}
        </React.Fragment>
    )
}

export default InstructionsFieldset
