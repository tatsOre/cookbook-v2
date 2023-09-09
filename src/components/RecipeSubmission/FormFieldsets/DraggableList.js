import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { IconButton } from '@/components/Button'
import { IconCircleMinus, IconGripVertical } from '@/components/Icon'

import styles from '../styles.module.scss'
import { getIngredientLabel } from '@/components/RecipeView/RecipeView.helpers'

function DraggableItemsList({ items, remove, move, className, steps }) {
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
        move(source.index, destination.index)
    }

    const onDeleteClickHandler = () => {
        console.log('Delete')
        //remove(index)
    }

    const props = {
        ariaLabelDelete: steps ? 'Delete Step No. ' : 'Delete ',
        ariaLabelDragHandler: 'Drag and drop',
        id: steps ? 'dnd-steps-list' : 'dnd-ingr-list'
    }

    const content = items.map((item, index) => {
        const di_id = `drag-item-${item.id}`

        return (
            <Draggable key={di_id} draggableId={di_id} index={index}>
                {(provided) => (
                    <li
                        key={item.id}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                    >
                        <IconButton
                            ariaLabel={`Delete Step No. ${index + 1}`}
                            onClick={onDeleteClickHandler}
                            data-action="show-delete"
                            icon={<IconCircleMinus />}
                        />

                        {steps
                            ? <span><b>Step {index + 1}. </b>{item.text}</span>
                            : <span>{getIngredientLabel(item)}</span>
                        }

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
            <Droppable droppableId={props.id} direction='vertical'>
                {(provided) => (
                    <ul
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className={styles['draggable__list']}
                    >
                        {content}
                        {provided.placeholder}
                    </ul>
                )}
            </Droppable>
        </DragDropContext>
    )
}

export default DraggableItemsList
