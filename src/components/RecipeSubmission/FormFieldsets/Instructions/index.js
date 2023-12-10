import React from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import Alert from '@/components/Alert'
import { Button, UnstyledButton } from '@/components/Button'
import InstructionInput from './InstructionInput'
import DraggableStepsList from '../shared/DraggableList'
import { IconAlertCircle, IconEdit } from '@/components/Icon'
import { default as FIELDS_ATTRIBUTES } from '../../constants'

import styles from './Instructions.module.scss'

function InstructionsFieldset() {
  const {
    INSTRUCTIONS: { NAME, RULES, TEXT_ATTRS },
  } = FIELDS_ATTRIBUTES

  const {
    control, formState: { errors, dirtyFields }, watch
  } = useFormContext()

  const { fields, append, remove, move, update } = useFieldArray({
    control, name: NAME, rules: {
      required: RULES.REQUIRED
    }
  })

  const [modeEditAll, setModeEditAll] = React.useState(false)

  const [activeField, setActiveField] = React.useState({
    /** If steps array is empty, we are in create recipe mode, we start with an empty input. */
    index: fields.length ? null : -1,
    active: fields.length ? false : true
  })

  /** We will keep track of the arr length */
  watch(NAME, fields)

  React.useEffect(() => {
    fields.length === 0 && setModeEditAll(false)
  }, [fields.length])

  const onToggleEditMode = () => setModeEditAll(prev => !prev)

  // Has dirtyFields.instructions.[0].text been touched?
  const isDirty = dirtyFields[NAME]?.[0]?.[TEXT_ATTRS.NAME]

  const content = fields.map((step, index) => {
    /** step id comes from useFieldArray.  */
    return (
      <li key={step.id || index}>
        {activeField.index === index ?
          <InstructionInput
            data={step.text}
            index={index}
            onSave={(value) => {
              update(index, value)
              setActiveField({ index: null, active: false })
            }}
            onCancel={() => {
              setActiveField({ index: null, active: false })
            }}
            withCloseButton
          /> :
          <UnstyledButton
            data-action="step-idle"
            onClick={() => {
              setActiveField({ index, active: true })
            }}
          >
            <span><b>{TEXT_ATTRS.LABEL} {index + 1}.</b> {step.text}</span>
            <IconEdit size={20} strokeWidth={1.5} />
          </UnstyledButton>}
      </li>
    )
  })

  return (
    <React.Fragment>
      {errors[NAME]?.root || (!fields.length && isDirty) ? (
        <Alert appearance="danger" icon={<IconAlertCircle />}>
          {errors[NAME]?.root.message || RULES.REQUIRED}
        </Alert>
      ) : null}

      {fields.length > 0 && (
        <div className={styles['edit__all--wrapper']}>
          <p>Tap <b>"Edit All"</b> to organize or delete steps.</p>

          <UnstyledButton onClick={onToggleEditMode} >
            {modeEditAll ? 'Done' : 'Edit All'}
          </UnstyledButton>
        </div>
      )}

      {modeEditAll
        ? <DraggableStepsList
          items={fields}
          remove={remove}
          move={move}
          steps={true}
        />
        : <>
          <ul className={styles['steps__list--inputs']}>
            {content}
          </ul>

          {activeField.index === -1 || !fields.length
            ? <InstructionInput
              data=""
              onSave={append}
              onCancel={() => setActiveField({ index: null, active: false })}
              withCloseButton={!!fields.length}
            />
            : <Button
              disabled={activeField.active}
              onClick={() => setActiveField({ index: -1, active: true })}
              className={styles['add__new--button']}
            >
              + Add a step
            </Button>
          }
        </>}
    </React.Fragment>
  )
}

export default InstructionsFieldset
