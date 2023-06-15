import { useAccordionContext } from ".."

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
            style={{ paddingBlock: '1rem', width: '100%', backgroundColor: '#F1F9FF' }}
        >
            {children}
        </button>
    )
}

export default AccordionTrigger
