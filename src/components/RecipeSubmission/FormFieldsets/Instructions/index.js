import React from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import Alert from '@/components/Alert'
import { Button, UnstyledButton } from '@/components/Button'
import { ListItemInput, NewStepInput } from './StepInput'
import DraggableStepsList from '../shared/DraggableList'
import { default as FIELDS_ATTRIBUTES } from '../../constants'

import styles from './Instructions.module.scss'

function InstructionsFieldset() {
    const {
        INSTRUCTIONS: { NAME, RULES },
    } = FIELDS_ATTRIBUTES

    const { control, formState: { errors, isDirty }, watch } = useFormContext()

    const { fields, append, remove, move } = useFieldArray({
        control, name: NAME, rules: {
            required: RULES.REQUIRED
        }
    })

    /** We will keep track of the steps text and arr length */
    const steps = watch(NAME, fields)

    const [modeEditAll, setModeEditAll] = React.useState(false)

    const [activeField, setActiveField] = React.useState({
        /** If steps array is empty, we're in create recipe mode, we start with an empty input. */
        index: fields.length ? null : -1,
        active: fields.length ? false : true
    })

    React.useEffect(() => {
        steps.length === 0 && setModeEditAll(false)
    }, [steps.length])

    const onToggleEditMode = () => setModeEditAll(prev => !prev)

    const content = steps.map((step, index) => {
        return (
            <ListItemInput
                key={step.id}
                value={step.text}
                index={index}
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
                    <Button
                        disabled={activeField.active}
                        onClick={onToggleEditMode}
                    >
                        {modeEditAll ? 'Done' : 'Edit All'}
                    </Button>
                </div>
            )}

            {modeEditAll
                ? <DraggableStepsList
                    items={steps}
                    remove={remove}
                    move={move}
                    steps={true}
                />
                : <>
                    <ul className={styles['steps__list--inputs']}>
                        {content}
                    </ul>
                    {activeField.index === -1 || !steps.length
                        ? <NewStepInput
                            append={append}
                            onCancel={() => setActiveField({ index: null, active: false })}
                            className={styles['new__step--input']}
                        />
                        : <Button
                            disabled={activeField.active}
                            onClick={() => setActiveField({ index: -1, active: true })}
                        >+ Add a step
                        </Button>
                    }
                </>}
        </React.Fragment>
    )
}

export default InstructionsFieldset
