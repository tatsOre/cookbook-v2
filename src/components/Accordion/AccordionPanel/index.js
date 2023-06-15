import { useAccordionContext } from ".."

function AccordionPanel(props) {
    const { children, ...panelProps } = props
    const context = useAccordionContext()
    return (
        <div id={context.id} {...panelProps}
            style={{ height: context.open ? '100%' : '0px', overflow: 'hidden' }}>
            {children}
        </div>
    )
}


export default AccordionPanel
