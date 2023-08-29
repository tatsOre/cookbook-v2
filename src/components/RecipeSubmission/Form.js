import Accordion from "../Accordion"
import GeneralInfoFieldset from "./FormFieldsets/01_GeneralInfo"
import IngredientsFieldset from "./FormFieldsets/02_Ingredients"
import InstructionsFieldset from "./FormFieldsets/03_Instructions"
import ExtraInfoFieldset from "./FormFieldsets/04_ExtraInfo"

import { RECIPE_FIELDS_ATTRIBUTES } from "./utils"

import styles from './styles.module.scss'

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


function RecipeForm(props) {
    const { id, onSubmit, assets } = props

    return (
        <form id={id} onSubmit={onSubmit} noValidate>
            <Accordion.Item value="item-1">
                <Accordion.Trigger>About</Accordion.Trigger>
                <Accordion.Panel className={styles.about__fieldset}>
                    <GeneralInfoFieldset
                        fields={{
                            TITLE,
                            DESCRIPTION,
                            MAIN_INGR,
                            SERVINGS,
                            TIME,
                            CUISINE,
                            CATEGORIES,
                            PUBLIC
                        }}
                        assets={assets} />
                </Accordion.Panel>
            </Accordion.Item>
            <Accordion.Item value="item-2">
                <Accordion.Trigger>Ingredients</Accordion.Trigger>
                <Accordion.Panel className={styles.ingredients__fieldset}>
                    <IngredientsFieldset
                        fields={{ INGREDIENTS }}
                        assets={assets}
                    />
                </Accordion.Panel>
            </Accordion.Item>
            <Accordion.Item value="item-3">
                <Accordion.Trigger>Directions</Accordion.Trigger>
                <Accordion.Panel className={styles.instructions__fieldset}>
                    <InstructionsFieldset
                        fields={{ INSTRUCTIONS }} />
                </Accordion.Panel>
            </Accordion.Item>
            <Accordion.Item value="item-4">
                <Accordion.Trigger>
                    Comments & Photos
                </Accordion.Trigger>
                <Accordion.Panel className={styles.extrainfo__fieldset}>
                    <ExtraInfoFieldset
                        fields={{ PHOTO, COMMENTS }}
                    />
                </Accordion.Panel>
            </Accordion.Item>
        </form>
    )
}

export default RecipeForm
