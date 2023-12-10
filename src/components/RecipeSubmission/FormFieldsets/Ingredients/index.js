import React from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import Alert from '@/components/Alert'
import { Button, UnstyledButton } from '@/components/Button'
import DraggableItemsList from '../shared/DraggableList'
import IngredientInput from './IngredientInput'
import { IconAlertCircle, IconEdit } from '@/components/Icon'
import { getIngredientLabel } from '@/components/RecipeView/RecipeView.helpers'
import { default as FIELDS_ATTRIBUTES, RECIPE_SCHEMA } from '../../constants'

import styles from './Ingredients.module.scss'

function IngredientsFieldset() {
  const {
    INGREDIENTS: { NAME, RULES }
  } = FIELDS_ATTRIBUTES

  const {
    control, formState: { errors, dirtyFields }, watch
  } = useFormContext()

  const { fields, append, remove, move, update } = useFieldArray({
    control, name: NAME, rules: {
      required: RULES.REQUIRED
    }
  })
  /** We will keep track of the ingredient names and arr length */
  const ingredients = watch(NAME, fields)

  const [modeEditAll, setModeEditAll] = React.useState(false)

  const [activeField, setActiveField] = React.useState({
    /** If array is empty, we are in create recipe mode, we start with an empty input. */
    /** null is closed, -1 is new input active */
    index: fields.length ? null : -1,
    active: fields.length ? false : true
  })

  React.useEffect(() => {
    ingredients.length === 0 && setModeEditAll(false)
  }, [ingredients.length])

  const onToggleEditMode = () => setModeEditAll(prev => !prev)

  // Has dirtyFields.ingredients.[0].name been touched?
  const isDirty = dirtyFields[NAME]?.[0]?.["name"]

  const content = fields.map((item, index) => {
    return (
      <li key={item._id || index}>
        {activeField.index === index ?
          <IngredientInput
            data={item}
            index={index}
            onSave={(values) => {
              update(index, values)
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
            <span>{getIngredientLabel(item)}</span>
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
          <p>Tap <b>"Edit All"</b> to organize or delete items.</p>

          <UnstyledButton onClick={onToggleEditMode} >
            {modeEditAll ? 'Done' : 'Edit All'}
          </UnstyledButton>
        </div>
      )}

      {modeEditAll
        ? <DraggableItemsList
          items={ingredients}
          remove={remove}
          move={move}
        />
        : <>
          <ul className={styles['ingredients__list--inputs']}>
            {content}
          </ul>

          {activeField.index === -1 || !ingredients.length
            ? <IngredientInput
              data={RECIPE_SCHEMA.ingredients[0]}
              onSave={(values) => {
                append(values)
                setActiveField({ index: null, active: false })
              }}
              onCancel={() => setActiveField({ index: null, active: false })}
              withCloseButton={!!ingredients.length}
            />
            : <Button
              disabled={activeField.active}
              onClick={() => setActiveField({ index: -1, active: true })}
              className={styles['add__new--button']}
            >
              + Add an ingredient
            </Button>
          }
        </>}
    </React.Fragment >
  )
}

export default IngredientsFieldset
