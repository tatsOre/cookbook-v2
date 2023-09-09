import React from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import Alert from '@/components/Alert'
import { Button, UnstyledButton } from '@/components/Button'
import { ListItemInput, NewStepInput } from './StepInput'
import DraggableStepsList from '../DraggableList'

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

            {(steps.length > 1 || modeEditAll) && (
                <div className={styles['edit__all--alert']}>
                    <p>Tap "Edit All" to organize or delete steps. Tap a step to edit.</p>
                    <UnstyledButton onClick={onToggleEditMode}>
                        {modeEditAll ? 'Done' : 'Edit All'}
                    </UnstyledButton>
                </div>
            )}

            {modeEditAll
                ? <DraggableStepsList
                    items={steps}
                    onDelete={remove}
                    onMove={move}
                    steps={true}
                />
                : <ul className={styles['steps__list--inputs']}>
                    {content}
                </ul>}

            {activeField.index === -1 || !steps.length
                ? <NewStepInput
                    append={append}
                    onCancel={resetActiveField}
                    className={styles['new__step--input']}
                />
                : <Button onClick={showNewInput}>+ Add a step</Button>
            }
        </React.Fragment>
    )
}

export default InstructionsFieldset
