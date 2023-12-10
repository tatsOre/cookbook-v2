import React from 'react'
import { useRecipeSubmissionContext } from '../../context'
import { Button } from '@/components/Button'
import Dropdown from '@/components/Dropdown'
import { NumberInput, TextInput } from '@/components/FormInput'
import { default as FIELDS_ATTRIBUTES } from '../../constants'

import styles from './Ingredients.module.scss'

function IngredientInput({ onSave, onCancel, data, index, withCloseButton }) {
  const { assets } = useRecipeSubmissionContext()

  const { INGREDIENTS: { INGR_ATTRS } } = FIELDS_ATTRIBUTES

  const { QTY, FRACTION, MEASURE, NAME: INGR, PREP_NOTE } = INGR_ATTRS

  const [values, setValues] = React.useState(data)

  const [error, setError] = React.useState(null)

  const appendIngredient = () => {
    if (!values.name) {
      return setError({
        type: 'required',
        message: INGR.RULES.REQUIRED
      })
    }
    onSave(values)
    setValues(data)
  }

  const onCancelHandler = () => onCancel()

  const onInputChange = (ev) => {
    (ev.target.name === INGR.NAME && error) && setError(null)
    const updated = { ...values, [ev.target.name]: ev.target.value }
    setValues(updated)
  }

  const onFractionChange = (val) => {
    const updated = { ...values, fraction: val }
    setValues(updated)
  }

  const onMeasureChange = (val) => {
    const updated = { ...values, measure: val }
    setValues(updated)
  }

  return (
    <div className={styles['ingredient__item--wrapper']}>
      <div className={styles['ingredient__input--group']}>
        <NumberInput
          label={QTY.LABEL}
          name={QTY.NAME}
          onChange={onInputChange}
          value={values[QTY.NAME]}
          autoFocus
        />

        <Dropdown
          label={FRACTION.LABEL}
          name={FRACTION.NAME}
          options={assets.fraction_options}
          onChange={onFractionChange}
          value={values[FRACTION.NAME]}
        />

        <Dropdown
          label={MEASURE.LABEL}
          name={MEASURE.NAME}
          options={assets.measure_options}
          onChange={onMeasureChange}
          value={values[MEASURE.NAME]}
        />

        <TextInput
          error={error}
          label={INGR.LABEL}
          name={INGR.NAME}
          onChange={onInputChange}
          placeholder={INGR.PLACEHOLDER}
          value={values[INGR.NAME]}
          required
        />

        <TextInput
          label={PREP_NOTE.LABEL}
          name={PREP_NOTE.NAME}
          placeholder={PREP_NOTE.PLACEHOLDER}
          onChange={onInputChange}
          value={values[PREP_NOTE.NAME]}
        />
      </div>

      {withCloseButton ? (
        <Button
          data-action="close"
          onClick={onCancelHandler}>
          cancel
        </Button>
      ) : null}

      <Button
        data-action="save"
        onClick={appendIngredient}>
        {index !== undefined ? 'Save' : 'Add to the list'}
      </Button>
    </div>
  )
}

export default IngredientInput
