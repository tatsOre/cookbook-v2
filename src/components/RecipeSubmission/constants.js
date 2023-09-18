export const RECIPE_SCHEMA = {
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
            fraction: undefined, /** Object */
            measure: undefined, /** Object */
            name: '',
            prepNote: ''
        }
    ],
    instructions: [{ text: '' }],
    categories: [], /** [ID] */
    cuisine: null, /** ID */
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
    REQUIRED_DEFAULT: 'This field is required.'
}

export default {
    TITLE: {
        DESC: 'Enter a catchy and descriptive title for your recipe. This will be the main identifier for your dish.',
        LABEL: 'Name your recipe',
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
                LABEL: 'Amount',
                NAME: 'quantity'
            },
            FRACTION: {
                LABEL: 'Fraction',
                NAME: 'fraction'
            },
            MEASURE: {
                LABEL: 'Unit',
                NAME: 'measure'
            },
            NAME: {
                LABEL: 'Ingredient', // Item Name? Ingr Name?,
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
        INGR_SCHEMA: RECIPE_SCHEMA.ingredients[0],
        get ingrLabels() {
            return Object.keys(this.INGR_ATTRS).map(key => this.INGR_ATTRS[key].LABEL)
        }
    },
    INSTRUCTIONS: {
        DESC: 'Each recipe step should be helpful, easy to understand, and focus on clear actions related to the recipe.',
        PLACEHOLDER: 'e.g. Season the chicken breasts with salt and pepper on both sides...',
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
        DESC: 'Take photos using a phone or camera. You can always edit this field later.',
        LABEL: 'Liven up your recipe post with a picture',
        NAME: 'photo'
    },
    COMMENTS: {
        DESC: 'Share any additional notes or comments about your recipe. You can mention personal anecdotes, serving suggestions, variations, or any helpful tips.',
        LABEL: 'Comments & Notes',
        PLACEHOLDER: 'e.g. Feel free to adjust the spiciness level by adding more or less red curry paste. This dish pairs wonderfully with steamed jasmine rice and a refreshing cucumber salad...',
        NAME: 'comments'
    }
}
