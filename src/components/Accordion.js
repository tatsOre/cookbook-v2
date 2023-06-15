import { createContext, useCallback, useContext, useId, useState } from "react"


const AccordionStateContext = createContext()
const AccordionProvider = AccordionStateContext.Provider

function useAccordionContext() {
    const context = useContext(AccordionStateContext)
    return context
}

/**
 * 
 * @returns ROOT
 */
function Accordion(props) {
    // OPEN, SET OPEN, disabled, defaultopen pueden venir desde el demo, o sea quien usa el component
    // al igual que otras props como clases, styles, etc.
    // default open: will be open at first?
    // CHECK: https://mantine.dev/core/accordion/
    // https://www.radix-ui.com/docs/primitives/components/accordion

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

function AccordionTrigger(props) {
    const { children, ...triggerProps } = props
    const context = useAccordionContext()

    return (
        <button
            aria-controls={context.id}
            aria-expanded={context.open || false}
            disabled={context.disabled}
            onClick={context.onOpenToggle}
            {...triggerProps}
            type="button"
            style={{ paddingBlock: '1rem', width: '100%', backgroundColor: '#F1F9FF'}}
        >
            {children}
        </button>
    )
}

function AccordionPanel(props) {
    const { children, ...panelProps } = props
    const context = useAccordionContext()
    return (
        <div id={context.id} {...panelProps}>
            {context.open && children}
        </div>
    )
}

Accordion.Item = Accordion
Accordion.Trigger = AccordionTrigger
Accordion.Panel = AccordionPanel

export default Accordion
