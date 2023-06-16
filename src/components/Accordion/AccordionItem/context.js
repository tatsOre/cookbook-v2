import { createContext, useContext } from "react"

const AccordionItemContext = createContext()
export const AccordionItemProvider = AccordionItemContext.Provider

export const useAccordionItemContext = () => useContext(AccordionItemContext)
