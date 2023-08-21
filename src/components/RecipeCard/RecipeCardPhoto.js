import Image from 'next/image'
import { getRandomCardPattern } from "./utils"

function RecipeCardPhoto({ recipe }) {
    if (recipe.photo) {
        return (
            <Image fill src={recipe.photo} alt={`${recipe.title} photo`} />
        )
    }
    const defaultPicture = getRandomCardPattern()
    return <Image width={400} height={400} src={defaultPicture} alt='pattern' />
}

export default RecipeCardPhoto
