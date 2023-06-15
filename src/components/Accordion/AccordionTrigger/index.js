import cx from "@/components/utils/cx"
import { useAccordionContext } from ".."
import { useAccordionItemContext } from "../AccordionItem/context"
import Button from "@/components/Button"

function AccordionTrigger(props) {
    const { children, ...rest } = props
    const context = useAccordionContext()
    const { value } = useAccordionItemContext()

    const isItemActive = context.isItemActive(value)
    const onClickHandler = () => context.onChange(value)

    return (
        <Button // todo make an unstyled button
            aria-controls={context.getPanelId(value)}
            aria-expanded={isItemActive}
            className={cx([context.className])}
            data-active={isItemActive || undefined}
            data-accordion-trigger
            id={context.getTriggerId(value)}
            onClick={onClickHandler}
            {...rest}
        >
            <span>{children}</span>
            <span>v</span> {/** Add Chevron */}
        </Button>
    )
}

export default AccordionTrigger
