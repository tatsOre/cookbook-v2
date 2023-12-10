import React from "react"
import PropTypes from 'prop-types'
import AccordionItem from "./AccordionItem"
import AccordionPanel from "./AccordionPanel"
import AccordionTrigger from "./AccordionTrigger"

const AccordionStateContext = React.createContext()
const AccordionProvider = AccordionStateContext.Provider

export const useAccordionContext = () => React.useContext(AccordionStateContext)

/**
 * @returns ACCORDION ROOT
 */

function Accordion(props) {
  const { active, setActive, children, id, multiple, ...rest } = props

  const uid = React.useId()
  const _id = id || uid

  const isItemActive = (item) => active.includes(item)

  const onItemChangeHandler = (item) => {
    let nextState = []

    if (multiple) {
      if (active.includes(item)) {
        nextState = active.filter(i => i !== item)
      } else {
        nextState = [...active, item]
      }
      setActive(nextState)
    } else {
      nextState = active.includes(item) ? nextState : [item]
      setActive(nextState)
    }
  }

  return (
    <AccordionProvider value={{
      id: _id,
      onChange: onItemChangeHandler,
      isItemActive,
      getTriggerId: (v) => `${_id}-trigger-${v}`,
      getPanelId: (v) => `${_id}-panel-${v}`,
      ...rest
    }}>
      {children}
    </AccordionProvider>
  )
}

Accordion.defaultProps = {
  active: []
}

Accordion.propTypes = {
  active: PropTypes.arrayOf(PropTypes.string),
  setActive: PropTypes.func,
  children: PropTypes.node,
  id: PropTypes.string
}

Accordion.Item = AccordionItem
Accordion.Trigger = AccordionTrigger
Accordion.Panel = AccordionPanel

export default Accordion
