import { format, isAfter } from 'date-fns'

export const getRecipeDate = (createdAt, updatedAt) => {
  if (!createdAt || !updatedAt) return null

  try {
    const created = new Date(createdAt)
    const updated = new Date(updatedAt)

    const isUpdateAfter = isAfter(updated, created)

    return isUpdateAfter
      ? `Updated ${format(updated, "PP")}`
      : `Created ${format(created, "PP")}`

  } catch (e) {
    /** Catch format or DB dates errors  */
    process.env.NEXT_PUBLIC_NODE_ENV_FE === "development"
      && console.log(e.message)
    return null
  }
}

export const getIngredientLabel = (data) => {
  const { quantity, fraction, measure, name, prepNote } = data

  const quantityElement = quantity > 0 ? quantity + ' ' : ''
  const fractionElement = fraction?.label ? fraction?.label + ' ' : ''
  const measureElement = measure?.label
    ? measure?.label + (quantity > 1 || (quantityElement && fractionElement) ? 's' : '') + ' '
    : ''
  const nameElement = name.toLowerCase() + (prepNote ? ', ' : '')
  const prepNoteElement = prepNote.toLowerCase()

  const label = <>
    {quantityElement}{fractionElement}{measureElement}<b>{nameElement}</b>{prepNoteElement}
  </>

  return label
}
