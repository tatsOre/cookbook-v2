import { format, isAfter } from 'date-fns'

export const getRecipeDate = (createdAt, updatedAt) => {
    if (!createdAt || !updatedAt) return null

    try {
        const created = new Date(createdAt)
        const updated = new Date(updatedAt)

        const isUpdateAfter = isAfter(updated, created)

        return isUpdateAfter
            ? `Updated ${format(updated, "PPP")}`
            : `Published ${format(created, "PPP")}`

    } catch (e) {
        /** Catch format or DB dates errors  */
        process.env.NEXT_PUBLIC_NODE_ENV_FE === "development"
            && console.log(e.message)
        return null
    }
}
