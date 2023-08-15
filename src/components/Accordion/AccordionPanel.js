import cx from "@/components/utils/cx"
import { useAccordionContext } from "."
import { useAccordionItemContext } from "./AccordionItem"

import styles from './Alert.module.scss'

function AccordionPanel(props) {
    const { className, children, ...rest } = props
    const context = useAccordionContext()
    const { value } = useAccordionItemContext()
    const isItemActive = context.isItemActive(value)

    return (
        <div
            aria-labelledby={context.getTriggerId(value)}
            data-active={isItemActive}
            data-accordion-panel
            id={context.getPanelId(value)}
            className={cx([styles['accordion__panel--collapsible']])}
            {...rest}
        >
            <div
                data-accordion-content
                data-active={isItemActive}
                className={cx([
                    className,
                    styles['accordion__panel--content'],
                ])}>
                {children}
            </div>
        </div>
    )
}


export default AccordionPanel
