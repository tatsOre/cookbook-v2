import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import Button from '@/components/Button'
import { IconCircleMinus, IconGripVertical } from '@/components/Icon'


import styles from '../../styles.module.scss'
import { getIngredientLabel } from '../../../../utils/recipe-format'

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

  const droppableId = steps ? 'dnd-steps-list' : 'dnd-ingr-list'

  const content = items.map((item, index) => {
    const id = item._id ? item._id : index
    const di_id = `drag-item-${id}`

    const labelDelete = steps
      ? `Delete step ${index + 1}` : `Delete ${item.name}`

    const labelDragHandler = 'Move ' + (steps ? 'step' : item.name)

    return (
      <Draggable key={di_id} draggableId={di_id} index={index}>
        {(provided) => (
          <li
            key={item.id}
            ref={provided.innerRef}
            {...provided.draggableProps}
          >
            <Button
              ariaLabel={labelDelete}
              onClick={() => remove(index)}
              data-action="show-delete"
              withLeftIcon={<IconCircleMinus />}
              unstyled
            />

            {steps
              ? <span><b>Step {index + 1}. </b>{item.text}</span>
              : <span>{getIngredientLabel(item)}</span>
            }

            <Button
              ariaLabel={labelDragHandler}
              {...provided.dragHandleProps}
              data-action="drag-handler"
              withLeftIcon={<IconGripVertical />}
              unstyled
            />
          </li>
        )}
      </Draggable>
    )
  })
  return (
    <DragDropContext onDragEnd={onDragEndHandler}>
      <Droppable droppableId={droppableId} direction='vertical'>
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
