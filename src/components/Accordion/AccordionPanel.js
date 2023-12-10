import clsx from "clsx"
import { useAccordionContext } from "."
import { useAccordionItemContext } from "./AccordionItem"

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
      className={clsx("overflow-hidden", isItemActive ? "h-auto" : "h-0")}
      {...rest}
    >
      <div
        data-accordion-content
        data-active={isItemActive}
        className={clsx(className, { "sr-only": !isItemActive })}
      >
        {children}
      </div>
    </div>
  )
}

export default AccordionPanel
