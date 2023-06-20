import { createContext, useCallback, useContext, useId, useState } from "react"

import AccordionItem from "./AccordionItem"
import AccordionPanel from "./AccordionPanel"
import AccordionTrigger from "./AccordionTrigger"
import cx from "../utils/cx"

const AccordionStateContext = createContext()
const AccordionProvider = AccordionStateContext.Provider

export const useAccordionContext = () => useContext(AccordionStateContext)

/**
 * @returns ACCORDION ROOT
 */

function Accordion(props) {
    const { value, onChange, className, children, id, ...rest } = props
    const _id = id || useId()

    const isItemActive = (item) => value.includes(item)

    const onItemChangeHandler = (item) => {
        let nextState = []
        if (value.includes(item)) {
            nextState = value.filter(i => i !== item)
        } else {
            nextState = [...value, item]
        }
        onChange(nextState)
    }

    const classes = cx([className])

    return (
        <AccordionProvider value={{
            id: _id,
            onChange: onItemChangeHandler,
            isItemActive,
            getTriggerId: (v) => `${_id}-trigger-${v}`,
            getPanelId: (v) => `${_id}-panel-${v}`

        }}>
            <div className={classes} {...rest}> {children} </div>
        </AccordionProvider>
    )
}


Accordion.Item = AccordionItem
Accordion.Trigger = AccordionTrigger
Accordion.Panel = AccordionPanel

export default Accordion
