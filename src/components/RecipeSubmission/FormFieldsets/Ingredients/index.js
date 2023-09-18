import React from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import Alert from '@/components/Alert'
import { Button, UnstyledButton } from '@/components/Button'
import DraggableItemsList from '../shared/DraggableList'
import IngredientInput from './IngredientInput'
import { getIngredientLabel } from '@/components/RecipeView/RecipeView.helpers'
import { default as FIELDS_ATTRIBUTES, RECIPE_SCHEMA } from '../../constants'

import styles from './Ingredients.module.scss'
import { IconEdit } from '@/components/Icon'

function IngredientsFieldset() {
    const {
        INGREDIENTS: { NAME, RULES }
    } = FIELDS_ATTRIBUTES

    const { control, formState: { errors }, watch } = useFormContext()

    const { fields, append, remove, move, update } = useFieldArray({
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
            {(ingredients.length > 1 || modeEditAll) && (
                <div className={styles['edit__all--wrapper']}>
                    <p>Tap "Edit All" to organize or delete items.</p>
                    <UnstyledButton
                        disabled={activeField.active}
                        onClick={onToggleEditMode}
                    >
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

/**
            {errors?.[NAME]?.root || !content?.length ? (
                <Alert
                    appearance="danger"
                    variant='light'
                    title={errors[NAME]?.root.message || RULES.REQUIRED}
                />
            ) : null}
 */