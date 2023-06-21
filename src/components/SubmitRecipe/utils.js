import { RECIPE_FIELDS_ATTRIBUTES } from "../RecipeForm/utils/constants"

const {
    TITLE,
    DESCRIPTION,
    MAIN_INGR,
    SERVINGS,
    TIME,
    CUISINE,
    CATEGORIES,
    PHOTO,
    COMMENTS,
    INGREDIENTS,
    INSTRUCTIONS,
    PUBLIC
} = RECIPE_FIELDS_ATTRIBUTES

export const deNormalizeData = (values) => {
    const instructions = values.instructions?.length
        ? values.instructions.map(inst => ({ text: inst }))
        : [{ text: '' }]
    return {
        ...values,
        instructions
    }
}

export const normalizeData = (values) => {
    console.log(values)
    const instructions = values.instructions?.map(inst => inst.text)
    const categories = values.categories?.map(cat => cat._id)
    // TODO: NORMALIZE FRACTION & MEASURE IN INGRE.
    return {
        ...values,
        categories,
        instructions,
        cuisine: values.cuisine?._id
    }
}

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
