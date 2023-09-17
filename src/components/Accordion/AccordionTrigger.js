import { useAccordionContext } from "."
import { useAccordionItemContext } from "./AccordionItem"
import { UnstyledButton } from "../Button"
import { IconPlus } from "../Icon"
import cx from "@/components/utils/cx"

import styles from './Alert.module.scss'

function AccordionTrigger(props) {
    const { children, ...rest } = props
    const context = useAccordionContext()
    const { value } = useAccordionItemContext()

    const isItemActive = context.isItemActive(value)

    const onClickHandler = () => context.onChange(value)

    return (
        <UnstyledButton
            aria-controls={context.getPanelId(value)}
            aria-expanded={isItemActive}
            className={cx([styles.accordion__trigger])}
            data-active={isItemActive || undefined}
            data-accordion-trigger
            id={context.getTriggerId(value)}
            onClick={onClickHandler}
            {...rest}
        >
            <span>{children}</span>
            <IconPlus size={26} title="Close panel" />
        </UnstyledButton>
    )
}

export default AccordionTrigger
