import { format, isAfter } from 'date-fns'

export const getRecipeDate = (createdAt, updatedAt) => {
    if (!createdAt || !updatedAt) return null

    const created = new Date(createdAt)
    const updated = new Date(updatedAt)

    const isUpdateAfter = isAfter(updated, created)

    const date = isUpdateAfter
        ? `Updated ${format(updated, "PPP")}`
        : `Published ${format(created, "PPP")}`

    return date
}
