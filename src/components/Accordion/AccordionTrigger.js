import clsx from "clsx"
import { useAccordionContext } from "."
import { useAccordionItemContext } from "./AccordionItem"
import { UnstyledButton } from "../Button"
import { IconChevronUp } from "../Icon"

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
      className={clsx(
        "w-full flex justify-between items-center"
      )}
      data-active={isItemActive}
      data-accordion-trigger
      id={context.getTriggerId(value)}
      onClick={onClickHandler}
      {...rest}
    >
      <span>{children}</span>
      <span className={clsx("transition-all", { "-rotate-180": isItemActive })}>
        <IconChevronUp title="Close panel" />
      </span>
    </UnstyledButton>
  )
}

export default AccordionTrigger
