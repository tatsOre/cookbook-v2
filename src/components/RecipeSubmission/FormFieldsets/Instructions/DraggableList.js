import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import UnstyledButton from '@/components/Button/UnstyledButton'
import { IconGripVertical, IconTrash } from '@/components/Icon'

import styles from './Instructions.module.scss'

function DraggableStepsList({ steps, onDelete, onMove }) {
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

    const content = steps.map((step, index) => {
        const di_id = `drag-ingr-${step.id}`

        return (
            <Draggable key={di_id} draggableId={di_id} index={index}>
                {(provided) => (
                    <li
                        key={step.id}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className={styles.draggable__item}
                    >
                        <UnstyledButton
                            ariaLabel={`Delete Step No. ${index + 1}`}
                            className={styles['button__icon--delete']}
                            onClick={() => onDelete(index)}
                        >
                            <IconTrash size={20} strokeWidth={1.5} />
                        </UnstyledButton>

                        <span><b>Step {index + 1}. </b>{step.text}</span>

                        <UnstyledButton
                            ariaLabel="Drag and drop step"
                            {...provided.dragHandleProps}
                            data-type="drag-handler"
                        >
                            <IconGripVertical />
                        </UnstyledButton>
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
                        className={styles.instructions__list}
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
