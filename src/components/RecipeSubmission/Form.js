import Accordion from "../Accordion"
import { Form } from "../Box"
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
    const { id, onChange, onSubmit, assets } = props

    return (
        <Form
            id={id}
            onChange={onChange}
            onSubmit={onSubmit}
        >
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
                        fields={{ INGREDIENTS, INGR_SCHEMA: assets.INGR_SCHEMA }}
                        assets={assets}
                    />
                </Accordion.Panel>
            </Accordion.Item>
            <Accordion.Item value="item-3">
                <Accordion.Trigger>How To Make</Accordion.Trigger>
                <Accordion.Panel className={styles.instructions__fieldset}>
                    <InstructionsFieldset
                        fields={{ INSTRUCTIONS }} />
                </Accordion.Panel>
            </Accordion.Item>
            <Accordion.Item value="item-4">
                <Accordion.Trigger>
                    Extra Comments & Photos
                </Accordion.Trigger>
                <Accordion.Panel className={styles.extracontent__fieldset}>
                    <ExtraInfoFieldset
                        fields={{ PHOTO, COMMENTS }}
                    />
                </Accordion.Panel>
            </Accordion.Item>
        </Form>
    )
}

export default RecipeForm
