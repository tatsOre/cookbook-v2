function DroppableList(props) {
    const { children, innerRef, ...rest } = props
    return (
        <ul {...rest} ref={innerRef}>
            {children}
        </ul>
    )
}

function DraggableListItem(props) {
    const { innerRef, ...rest } = props
    return <li {...rest} ref={innerRef}></li>
}

DroppableList.Item = DraggableListItem
export default DroppableList
