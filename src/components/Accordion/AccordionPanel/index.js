import cx from "@/components/utils/cx"
import { useAccordionContext } from ".."
import { useAccordionItemContext } from "../AccordionItem/context"

import styles from '../Accordion.module.scss'

function AccordionPanel(props) {
    const { children, ...rest } = props
    const context = useAccordionContext()
    const { value } = useAccordionItemContext()
    const isItemActive = context.isItemActive(value)
// divide content from collapsible div
    return (
        <div
            aria-labelledby={context.getTriggerId(value)}
            data-active={isItemActive || undefined}
            data-accordion-panel
            id={context.getPanelId(value)}
            className={cx([styles.collapse__panel])}
            {...rest}
        >
            <div className={cx([
                context.className, styles.accordion__panel
            ])}>
                {children}
            </div>
        </div>
    )
}


export default AccordionPanel
