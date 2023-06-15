// Enter one or two sentences that describe the recipe. Is it easy to make or hard? What would you serve it with? How long does it take?

const RECIPE_SCHEMA = {
    title: '',
    description: '',
    mainIngredient: '',
    time: {
        prep: 0,
        cook: 0,
        total: 0
    },
    photo: '',
    servings: 0,
    ingredients: [
        {
            quantity: 0,
            fraction: null,
            measure: null,
            name: "",
            prepNote: ""
        }
    ],
    instructions: [],
    categories: [],
    cuisine: null,
    public: false,
    comments: "",
    get ingrSchema() {
        return this.ingredients[0]
    }
}

const BASE_RULES = {
    minValueErrorMsg(value) {
        return `Must be an integer greater than or equal to ${value}`
    },
    maxValueErrorMsg(value) {
        return `Must be an integer less than or equal to ${value}`
    },
    REQUIRED_DEFAULT: 'This field is required'
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
        DESC: '',
        LABEL: 'Cuisine',
        NAME: 'cuisine',
    },
    CATEGORIES: {
        DESC: 'Please choose up to three.',
        LABEL: 'Categories',
        NAME: 'categories',
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
                PLACEHOLDER: 'e.g. Milk', // Nice to have: random ingr name when user adds new ingr.
                RULES: {
                    REQUIRED: BASE_RULES.REQUIRED_DEFAULT
                }
            },
            PREP_NOTE: {
                LABEL: 'Prep Note',
                NAME: 'prepNote'
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
            LABEL: 'step',
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
