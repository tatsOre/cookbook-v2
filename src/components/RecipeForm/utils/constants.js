// Enter one or two sentences that describe the recipe. Is it easy to make or hard? What would you serve it with? How long does it take?

export const CUISINE_OPTIONS = [
    { _id: '00001', label: 'indian' },
    { _id: '00002', label: 'cuban' },
    { _id: '00003', label: 'some' },
    { _id: '00004', label: 'latino' },
    { _id: '00005', label: 'american' },
    { _id: '00006', label: 'thai' },
    { _id: '00000', label: 'other' },
]

export const CATEGORIES_OPTIONS = [
    { _id: '0000A', label: 'vegetarian' },
    { _id: '0000B', label: 'easy' },
    { _id: '0000C', label: 'for two' },
    { _id: '0000D', label: 'bread' },
    { _id: '0000E', label: 'dessert' },
    { _id: '0000F', label: 'cookies and pastries' },
]

export const FRACTIONS_OPTIONS = [
    { _id: 'X0001', label: "0", decimal: 0 },
    { _id: 'X0002', label: "⅛", decimal: 0.125 }, // 1/8  ⅛ &#8539;
    { _id: 'X0003', label: "¼", decimal: 0.25 }, // 1/4 ¼  &#188;
    { _id: 'X0004', label: "⅓", decimal: 0.33333333333333 }, // 1/3  ⅓  &#8531;
    { _id: 'X0005', label: "½", decimal: 0.5 }, // 1/2 ½  &#189;
    { _id: 'X0006', label: "⅔", decimal: 0.66666666666667 }, // 2/3 ⅔  &#8532;
    { _id: 'X0007', label: "¾", decimal: 0.75 }, // 3/4 ¾ &#190;
]

export const MEASURE_OPTIONS = [
    { _id: "MO001", label: "teaspoon" },
    { _id: "MO002", label: "tablespoon" },
    { _id: "MO003", label: "cup" },
    { _id: "MO004", label: "gallon" },
    { _id: "MO005", label: "gram" },
    { _id: "MO006", label: "pound" },
    { _id: "MO007", label: "kilogram" },
    { _id: "MO008", label: "ounce" },
    { _id: "MO009", label: "litre" }
]

export const ASSETS = {
    CUISINE_OPTIONS: CUISINE_OPTIONS,
    CATEGORIES_OPTIONS: CATEGORIES_OPTIONS,
    MEASURE_OPTIONS: MEASURE_OPTIONS,
    FRACTIONS_OPTIONS: FRACTIONS_OPTIONS
}


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

const BASE_RULES = {
    minValueErrorMsg(value) {
        return `Must be an integer greater than or equal to ${value}`
    },
    maxValueErrorMsg(value) {
        return `Must be an integer less than or equal to ${value}`
    },
    REQUIRED_DEFAULT: 'This field is required 🙁'
}

const RECIPE_FIELDS_ATTRIBUTES = {
    TITLE: {
        DESC: 'The description for the field Title',
        LABEL: 'Title',
        NAME: 'title',
        PLACEHOLDER: 'e.g. Passion Fruit Dessert',
        RULES: {
            REQUIRED: BASE_RULES.REQUIRED_DEFAULT
        }
    },
    DESCRIPTION: {
        DESC: 'The description for the field Description',
        LABEL: 'Description',
        NAME: 'description',
        PLACEHOLDER: 'e.g Indulge in the tangy and tropical flavors of passion fruit with this refreshing and luscious dessert...',
        RULES: {
            REQUIRED: BASE_RULES.REQUIRED_DEFAULT
        }
    },
    MAIN_INGR: {
        DESC: 'The description for the field Main Ingredient',
        LABEL: 'Main Ingredient',
        NAME: 'mainIngredient',
        PLACEHOLDER: 'e.g. Passion Fruit',
        RULES: {
            REQUIRED: BASE_RULES.REQUIRED_DEFAULT
        }
    },
    SERVINGS: {
        DESC: 'The description for the field Serving',
        LABEL: 'Servings',
        NAME: 'servings',
        RULES: {
            MIN: BASE_RULES.minValueErrorMsg(0)
        }
    },
    TIME: {
        COOK: {
            DESC: 'The description for the field Cook.Time',
            LABEL: 'Cook time',
            NAME: 'time.cook', // (*)Added `time` field name.
            RULES: {
                MIN: BASE_RULES.minValueErrorMsg(0)
            }
        },
        PREP: {
            DESC: 'The description for the field Cook.Prep',
            LABEL: 'Prep time',
            NAME: 'time.prep', // (*)Added `time` field name.
            RULES: {
                MIN: BASE_RULES.minValueErrorMsg(0)
            }
        }
    },
    CUISINE: {
        DESC: 'Lorem Impsum Morten',
        LABEL: 'Cuisine',
        NAME: 'cuisine',
    },
    CATEGORIES: {
        DESC: 'Please choose up to three.',
        LABEL: 'Categories',
        NAME: 'categories',
    },
    PUBLIC: {
        DESC: '',
        LABEL: 'Show recipe.',
        NAME: 'public'
    },
    INGREDIENTS: {
        NAME: 'ingredients',
        RULES: {
            REQUIRED: 'At least one ingredient is required'
        },
        INGR_ATTRS: {
            QTY: {
                LABEL: 'Quantity',
                NAME: 'quantity'
            },
            FRACTION: {
                LABEL: 'Fraction(?)',
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
                LABEL: 'Prep Note',
                NAME: 'prepNote',
                PLACEHOLDER: 'e.g. sifted'
            }
        },
        get ingrLabels() {
            return Object.keys(this.INGR_ATTRS).map(key => this.INGR_ATTRS[key].LABEL)
        }
    },
    INSTRUCTIONS: {
        DESC: 'Como se hace esta vuelta?',
        NAME: 'instructions',
        RULES: {
            REQUIRED: 'At least one is required',
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
        DESC: 'Include any specific comments on what should be improved, added, etc.',
        LABEL: 'Comments & Notes',
        NAME: 'comments'
    }
}

export { RECIPE_FIELDS_ATTRIBUTES, RECIPE_SCHEMA }
