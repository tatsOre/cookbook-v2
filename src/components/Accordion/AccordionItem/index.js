import { useAccordionContext } from ".."
import { AccordionItemProvider } from "./context"
import cx from "@/components/utils/cx"

function AccordionItem(props) {
    const { children, value } = props
    const context = useAccordionContext()

    return (
        <AccordionItemProvider value={{ value }}>
            <div
                className={cx([context.className])}
                data-item-active={context.isItemActive(value) || undefined}>
                {children}
            </div>
        </AccordionItemProvider>
    )
}

export default AccordionItem
