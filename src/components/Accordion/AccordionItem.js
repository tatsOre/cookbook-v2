import React from "react"
import { useAccordionContext } from "."

const AccordionItemContext = React.createContext()
const AccordionItemProvider = AccordionItemContext.Provider

export const useAccordionItemContext = () => React.useContext(AccordionItemContext)

function AccordionItem(props) {
  const { children, value } = props
  const context = useAccordionContext()

  return (
    <AccordionItemProvider value={{ value }}>
      <div
        data-item-active={context.isItemActive(value) || undefined}>
        {children}
      </div>
    </AccordionItemProvider>
  )
}

export default AccordionItem
