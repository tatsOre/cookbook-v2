const RECIPE_SCHEMA = {
    title: '',
    description: '',
    mainIngredient: '',
    time: {
        prep: '', /** Number */
        cook: '', /** Number */
        total: '' /** Number */
    },
    photo: '',
    servings: '', /** Number */
    ingredients: [
        {
            quantity: '', /** Number */
            fraction: null, /** Object */
            measure: null, /** Object */
            name: '',
            prepNote: ''
        }
    ],
    instructions: [{ text: '' }],
    categories: [], /** [Object] */
    cuisine: null, /** Object */
    public: false,
    comments: ''
}

export const NEW_RECIPE = {
    'ingredients': RECIPE_SCHEMA.ingredients,
    'instructions': RECIPE_SCHEMA.instructions
}

const BASE_RULES = {
    minValueErrorMsg(value) {
        return `Must be an integer greater than or equal to ${value}`
    },
    maxValueErrorMsg(value) {
        return `Must be an integer less than or equal to ${value}`
    },
    REQUIRED_DEFAULT: 'This field is required.'
}

export const RECIPE_FIELDS_ATTRIBUTES = {
    TITLE: {
        DESC: 'Enter a catchy and descriptive title for your recipe. This will be the main identifier for your dish.',
        LABEL: 'Title',
        NAME: 'title',
        PLACEHOLDER: 'e.g. Spicy Thai Chicken Curry',
        RULES: {
            REQUIRED: 'Please provide a title for your recipe.'
        }
    },
    DESCRIPTION: {
        DESC: 'Include any unique features, flavors, or highlights that make it special.',
        LABEL: 'Summary',
        NAME: 'description',
        PLACEHOLDER: 'e.g. This aromatic curry combines tender chicken, vibrant vegetables, and a rich blend of Thai spices...',
        RULES: {
            REQUIRED: 'Please provide a description for your recipe.'
        }
    },
    MAIN_INGR: {
        DESC: '',
        LABEL: 'What is the main ingredient of your dish?',
        NAME: 'mainIngredient',
        PLACEHOLDER: 'e.g. Passion Fruit',
        RULES: {
            REQUIRED: 'Main ingredient is required.'
        }
    },
    SERVINGS: {
        DESC: '',
        LABEL: 'Servings',
        NAME: 'servings',
        RULES: {
            MIN: BASE_RULES.minValueErrorMsg(0)
        }
    },
    TIME: {
        COOK: {
            DESC: '',
            LABEL: 'Cook time',
            NAME: 'time.cook', // (*)Added `time` field name.
            RULES: {
                MIN: BASE_RULES.minValueErrorMsg(0)
            }
        },
        PREP: {
            DESC: '',
            LABEL: 'Prep. time',
            NAME: 'time.prep', // (*)Added `time` field name.
            RULES: {
                MIN: BASE_RULES.minValueErrorMsg(0)
            }
        }
    },
    CUISINE: {
        DESC: 'The regional or cultural category that your recipe belongs to.',
        LABEL: 'Cuisine',
        NAME: 'cuisine',
    },
    CATEGORIES: {
        DESC: 'Choose up to three.',
        LABEL: 'Categories',
        NAME: 'categories',
    },
    PUBLIC: {
        DESC: '',
        LABEL: 'I agree to make this recipe public and let other members use it.',
        NAME: 'public'
    },
    INGREDIENTS: {
        NAME: 'ingredients',
        RULES: {
            REQUIRED: 'At least one ingredient is required.'
        },
        INGR_ATTRS: {
            QTY: {
                LABEL: 'Quantity',
                NAME: 'quantity'
            },
            FRACTION: {
                LABEL: 'Fraction',
                NAME: 'fraction'
            },
            MEASURE: {
                LABEL: 'Measure',
                NAME: 'measure'
            },
            NAME: {
                LABEL: 'Item Name', // Item Name? Ingr Name?,
                NAME: 'name',
                PLACEHOLDER: 'e.g. flour', // Nice to have: random ingr name when user adds new ingr.
                RULES: {
                    REQUIRED: BASE_RULES.REQUIRED_DEFAULT
                }
            },
            PREP_NOTE: {
                LABEL: 'Prep. Note',
                NAME: 'prepNote',
                PLACEHOLDER: 'e.g. sifted'
            }
        },
        get ingrLabels() {
            return Object.keys(this.INGR_ATTRS).map(key => this.INGR_ATTRS[key].LABEL)
        }
    },
    INSTRUCTIONS: {
        DESC: '',
        NAME: 'instructions',
        RULES: {
            REQUIRED: 'At least one step is required.',
        },
        TEXT_ATTRS: {
            LABEL: 'Step',
            NAME: 'text',
            RULES: {
                REQUIRED: BASE_RULES.REQUIRED_DEFAULT
            }
        }
    },
    PHOTO: {
        DESC: 'The description for the field Photo',
        LABEL: 'La pic pal Face!',
        NAME: 'photo'
    },
    COMMENTS: {
        DESC: 'Share any additional notes or comments about your recipe. You can mention personal anecdotes, serving suggestions, variations, or any helpful tips.',
        LABEL: 'Comments & Notes',
        PLACEHOLDER: 'e.g. Feel free to adjust the spiciness level by adding more or less red curry paste. This dish pairs wonderfully with steamed jasmine rice and a refreshing cucumber salad...',
        NAME: 'comments'
    }
}

export const deNormalizeData = (values) => {
    if (!values) return
    const instructions = values.instructions?.length
        ? values.instructions.map(inst => ({ text: inst }))
        : [{ text: '' }]
    return {
        ...values,
        instructions
    }
}

export const normalizeData = (values) => {
    const instructions = values.instructions?.map(inst => inst.text)

    const categories = values.categories?.map(cat => cat._id)

    const ingredients = values.ingredients.map(ingr => ({
        ...ingr,
        quantity: ingr.quantity || 0,
        fraction: ingr.fraction ? ingr.fraction._id : null,
        measure: ingr.measure ? ingr.measure._id : null
    }))
    
    return {
        ...values,
        servings: values.servings || 0,
        categories,
        ingredients,
        instructions,
        cuisine: values.cuisine?._id
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
} = RECIPE_FIELDS_ATTRIBUTES

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

