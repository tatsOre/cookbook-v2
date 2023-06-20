import { useAccordionContext } from ".."
import { AccordionItemProvider } from "./context"

function AccordionItem(props) {
    const { children, value } = props
    const context = useAccordionContext()

    return (
        <AccordionItemProvider value={{ value }}>
            <div
                data-item-active={context.isItemActive(value) || undefined}>
                {children}
            </div>
        </AccordionItemProvider>
    )
}

export default AccordionItem
