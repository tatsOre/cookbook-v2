import cx from "@/components/utils/cx"
import { useAccordionContext } from "."
import { useAccordionItemContext } from "./AccordionItem"
import UnstyledButton from "@/components/Button/UnstyledButton"

import styles from './styles.module.scss'
import { IconArrowDownRight } from "../Icon"

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
            <div className={styles['accordion__trigger--icon']}>
                <IconArrowDownRight size={36} strokeWidth={1}/>
            </div>
        </UnstyledButton>
    )
}

export default AccordionTrigger
