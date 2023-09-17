import { default as FIELDS_ATTRIBUTES } from './constants'

export const deNormalizeData = (values) => {
    if (!values) return

    const instructions = values.instructions?.length
        && values.instructions.map(inst => ({ text: inst }))

    return {
        ...values,
        instructions
    }
}

/**
 * 
 * @param {*} values 
 * @returns 
 */

export const normalizeData = (values) => {
    const instructions = values.instructions?.map(inst => inst.text)

    const categories = values.categories?.map(cat => cat._id)

    const ingredients = values.ingredients?.map(ingr => ({
        ...ingr,
        quantity: ingr.quantity || 0,
        fraction: ingr.fraction ? ingr.fraction._id : undefined,
        measure: ingr.measure ? ingr.measure._id : undefined
    }))

    return {
        ...values,
        categories,
        ingredients,
        instructions,
        cuisine: values.cuisine?._id ?? undefined,
        servings: values.servings || 0,
        // If photo is empty, it comes as an object. Schema field type == string.
        photo: typeof values.photo === 'string' ? values.photo : ''
    }
}

const {
    TITLE,
    DESCRIPTION,
    MAIN_INGR,
    SERVINGS,
    TIME,
    CUISINE,
    CATEGORIES,
    PHOTO,
    PUBLIC,
    COMMENTS,
    INGREDIENTS,
    INSTRUCTIONS
} = FIELDS_ATTRIBUTES

const accordionFormFieldsets = {
    "item-1": [
        TITLE.NAME,
        DESCRIPTION.NAME,
        MAIN_INGR.NAME,
        CUISINE.NAME,
        CATEGORIES.NAME,
        SERVINGS.NAME,
        PUBLIC.NAME
    ],
    "item-2": [INGREDIENTS.NAME],
    'item-3': [INSTRUCTIONS.NAME],
    'item-4': [PHOTO.NAME, COMMENTS.NAME]
}

export const getFormAccordionState = (errors) => {
    let state = []
    for (const key in accordionFormFieldsets) {
        for (const field of accordionFormFieldsets[key]) {
            if (errors[field]) {
                state = [...state, key]
                break
            }
        }
    }
    return state
}

