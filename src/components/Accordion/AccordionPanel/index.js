import cx from "@/components/utils/cx"
import { useAccordionContext } from ".."
import { useAccordionItemContext } from "../AccordionItem/context"

function AccordionPanel(props) {
    const { children, ...rest } = props
    const context = useAccordionContext()
    const { value } = useAccordionItemContext()
    const isActive = context.isItemActive(value)

    return (
        <div
            aria-labelledby={context.getTriggerId(value)}
            id={context.getPanelId(value)}
            className={cx([context.className])}
            style={{ height: isActive ? '100%' : '0px', overflow: isActive ? 'hidden' : 'auto' }}
            {...rest}
        >
            {children}
        </div>
    )
}


export default AccordionPanel
