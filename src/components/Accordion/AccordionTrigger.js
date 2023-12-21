import clsx from "clsx"
import { useAccordionContext } from "."
import { useAccordionItemContext } from "./AccordionItem"
import Button from "../Button"
import { IconChevronUp } from "../Icon"

function AccordionTrigger(props) {
  const { children, ...rest } = props
  const context = useAccordionContext()
  const { value } = useAccordionItemContext()

  const isItemActive = context.isItemActive(value)

  const onClickHandler = () => context.onChange(value)

  return (
    <button
      aria-controls={context.getPanelId(value)}
      aria-expanded={isItemActive}
      data-active={isItemActive}
      data-accordion-trigger
      id={context.getTriggerId(value)}
      onClick={onClickHandler}
      className="w-full flex justify-between items-center"
      type="button"
      {...rest}
    >
      <span>{children}</span>
      <span className={clsx("rotate-180 transition-all", { "rotate-0": isItemActive })}>
        <IconChevronUp title="Close panel" />
      </span>
    </button>
  )
}

export default AccordionTrigger
