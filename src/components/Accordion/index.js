import { createContext, useCallback, useContext, useId, useState } from "react"
import AccordionPanel from "./AccordionPanel"
import AccordionTrigger from "./AccordionTrigger"

const AccordionStateContext = createContext()
const AccordionProvider = AccordionStateContext.Provider

export const useAccordionContext = () => useContext(AccordionStateContext)

const recipeForm = {
    "item-1": {
        title: true,
        description: true,
        /** ... */
    },
    "item-2": {
        ingredients: true
    }
}
/**
 * todo: every Accordion Item has a value prop, e.g.: value="item-1"
 *  Accordion has a prop defaultValue Array ["item-1", "item-2"}, because for now, we
 *  always want multiple panels opened.
 * 
 * now we need a root that wraps the form, dif to the current approach: 
 */
/**
 * 
 * @returns ROOT
 */
function Accordion(props) {
    const { open, defaultOpen, disabled, onChange, children, ...wrapperProps } = props

    const [state, setOpen] = useState(true)

    return (
        <AccordionProvider value={{
            open: state,
            disabled: disabled,
            id: useId(),
            onOpenToggle: useCallback(() => setOpen((prevState) => !prevState), [setOpen])
        }}>
            <div {...wrapperProps}>
                {children}
            </div>
        </AccordionProvider>
    )
}

function AccordionItem(props) {
    return (
        <div>
            {props.children}
        </div>
    )
}

Accordion.Item = AccordionItem
Accordion.Trigger = AccordionTrigger
Accordion.Panel = AccordionPanel

export default Accordion
