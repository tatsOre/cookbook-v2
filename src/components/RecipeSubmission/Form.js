import Accordion from "../Accordion"
import {
    GeneralInfoFieldset,
    IngredientsFieldset,
    InstructionsFieldset,
    ExtraInfoFieldset
} from "./FormFieldsets"

import styles from './styles.module.scss'

function RecipeForm({ onSubmit }) {
    return (
        <form
            id="submit-recipe-form"
            onSubmit={onSubmit}
            className={styles['recipe__form--wrapper']}
            noValidate
        >
            <Accordion.Item value="item-1">
                <Accordion.Trigger>About</Accordion.Trigger>
                <Accordion.Panel >
                    <GeneralInfoFieldset />
                </Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item value="item-2">
                <Accordion.Trigger>Ingredients</Accordion.Trigger>
                <Accordion.Panel >
                    <IngredientsFieldset />
                </Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item value="item-3">
                <Accordion.Trigger>Directions</Accordion.Trigger>
                <Accordion.Panel >
                    <InstructionsFieldset />
                </Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item value="item-4">
                <Accordion.Trigger>Extra Details</Accordion.Trigger>
                <Accordion.Panel >
                    <ExtraInfoFieldset />
                </Accordion.Panel>
            </Accordion.Item>
        </form>
    )
}

export default RecipeForm
