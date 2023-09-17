import React from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import Alert from '@/components/Alert'
import { Button, UnstyledButton } from '@/components/Button'
import DraggableItemsList from '../shared/DraggableList'
import { RegisteredInput, NewIngredientInput } from './IngrInput'
import { default as FIELDS_ATTRIBUTES } from '../../constants'

import styles from './Ingredients.module.scss'

function IngredientsFieldset() {
    const {
        INGREDIENTS: { NAME, RULES }
    } = FIELDS_ATTRIBUTES

    const { control, formState: { errors }, watch } = useFormContext()

    const { fields, append, remove, move } = useFieldArray({
        control, name: NAME, rules: {
            required: RULES.REQUIRED
        }
    })
    /** We will keep track of the ingredient names and arr length */
    const ingredients = watch(NAME, fields)

    const [modeEditAll, setModeEditAll] = React.useState(false)

    const [activeField, setActiveField] = React.useState({
        /** If array is empty, we're in create recipe mode, we start with an empty input. */
        /** null is closed, -1 is new input active */
        index: fields.length ? null : -1,
        active: fields.length ? false : true
    })

    React.useEffect(() => {
        ingredients.length === 0 && setModeEditAll(false)
    }, [ingredients.length])

    const onToggleEditMode = () => setModeEditAll(prev => !prev)

    const content = ingredients.map((item, index) => {
        return <RegisteredInput
            key={item._id}
            item={item}
            index={index}
            activeField={activeField}
            setActiveField={setActiveField}
        />
    })

    return (
        <React.Fragment>
            {(ingredients.length > 1 || modeEditAll) && (
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
                        ? <NewIngredientInput
                            append={append}
                            onCancel={() => setActiveField({ index: null, active: false })}
                        />
                        : <Button
                            disabled={activeField.active}
                            onClick={() => setActiveField({ index: -1, active: true })}
                        >
                            + Add an ingredient
                        </Button>
                    }
                </>}
        </React.Fragment >
    )
}

export default IngredientsFieldset

/**
            {errors?.[NAME]?.root || !content?.length ? (
                <Alert
                    appearance="danger"
                    variant='light'
                    title={errors[NAME]?.root.message || RULES.REQUIRED}
                />
            ) : null}
 */