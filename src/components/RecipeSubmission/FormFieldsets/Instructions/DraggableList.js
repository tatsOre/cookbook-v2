import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { IconButton } from '@/components/Button'
import { IconCircleMinus, IconGripVertical, IconTrash } from '@/components/Icon'

function DraggableStepsList({ steps, onDelete, onMove, className }) {
    const onDragEndHandler = ({ destination, source }) => {
        // dropped outside the list:
        if (!destination) return
        // same item:
        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return
        }
        onMove(source.index, destination.index)
    }

    const onDeleteClickHandler = () => {
        console.log('Delete')
        //onDelete(index)
    }

    const content = steps.map((step, index) => {
        const di_id = `drag-ingr-${step.id}`

        return (
            <Draggable key={di_id} draggableId={di_id} index={index}>
                {(provided) => (
                    <li
                        key={step.id}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                    >
                        <IconButton
                            ariaLabel={`Delete Step No. ${index + 1}`}
                            onClick={onDeleteClickHandler}
                            data-action="show-delete"
                            icon={<IconCircleMinus />}
                        />

                        <span><b>Step {index + 1}. </b>{step.text}</span>

                        <IconButton
                            ariaLabel="Drag and drop step"
                            {...provided.dragHandleProps}
                            data-action="drag-handler"
                            icon={<IconGripVertical />}
                        />
                    </li>
                )}
            </Draggable>
        )
    })
    return (
        <DragDropContext onDragEnd={onDragEndHandler}>
            <Droppable droppableId='dnd-ingredients-list' direction='vertical'>
                {(provided) => (
                    <ul
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className={className}
                    >
                        {content}
                        {provided.placeholder}
                    </ul>
                )}
            </Droppable>
        </DragDropContext>
    )
}

export default DraggableStepsList
