import React from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import Alert from '@/components/Alert'
import Button from '@/components/Button'
import UnstyledButton from '@/components/Button/UnstyledButton'
import { ListItemInput, NewStepInput } from './StepInput'
import DraggableStepsList from './DraggableList'

import styles from './Instructions.module.scss'

function InstructionsFieldset({ fields }) {
    const [modeEditAll, setModeEditAll] = React.useState(false)

    const [activeField, setActiveField] = React.useState({
        index: null,
        value: null
    })

    const {
        INSTRUCTIONS: { NAME, RULES, TEXT_ATTRS },
    } = fields

    const { control, formState: { errors } } = useFormContext()

    const { fields: steps, append, remove, move } = useFieldArray({
        control, name: NAME, rules: {
            required: RULES.REQUIRED
        }
    })

    const onRemoveHandler = (index) => remove(index)

    const showEditAll = steps.filter(step => step.text).length > 1

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
            {errors[NAME]?.root || !steps.length ? (
                <Alert
                    appearance="danger"
                    variant='light'
                    title={errors[NAME]?.root.message || RULES.REQUIRED}
                />
            ) : null}

            {showEditAll && (
                <div style={{
                    backgroundColor: 'lightgrey',
                    marginBlockEnd: '2rem',
                }}>
                    <p>Tap "Edit All" to organize or delete steps. Tap a step to edit.</p>
                    <UnstyledButton onClick={() => setModeEditAll(prev => !prev)}>
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
                : (
                    <>
                        {activeField.index === -1
                            ? <NewStepInput
                                append={append}
                                onCancel={() => setActiveField({ index: null, value: null })}
                            />
                            : <Button
                                onClick={() => setActiveField({ index: -1, value: null })}
                            >+ Add a step
                            </Button>
                        }

                        <ul className={styles.instructions__list}>
                            {content}
                        </ul>
                    </>)}


        </React.Fragment>
    )
}

export default InstructionsFieldset
