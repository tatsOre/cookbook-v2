import Link from "next/link"
import { getRecipeDate } from "./RecipePage/RecipeView.helpers"
import Figure from "./Figure"

function HomeCard({ recipe }) {
  const { _id, categories, cuisine, createdAt, updatedAt } = recipe

  const date = getRecipeDate(createdAt, updatedAt)

  const src = recipe.photo?.url || ""

  const getCardTag = () => {
    if (!categories && !cuisine) return

    const defaultTag = "recipes"

    let tags = categories.length ? categories.map(c => c.label) : []

    if (cuisine && cuisine.label) {
      tags = [...tags, cuisine.label]
    }

    tags = tags.filter(tag => tag.length <= 10)

    return tags[0] || defaultTag
  }

  return (
    <li className="group cursor-pointer flex flex-row items-center gap-x-3 md:gap-x-4 justify-between border-b border-neutral-200 last-of-type:border-b-0 hover:bg-white max-w-[450px] p-3 md:p-4">
      <div className="md:flex md:items-center flex-1">
        <div
          className="text-xs uppercase tracking-widest md:[writing-mode:vertical-lr] md:-rotate-180 border-b border-b-black md:border-l md:border-l-black md:border-b-0 mr-4"
        >
          {getCardTag()}
        </div>

        <div className="mt-2 md:mt-0">
          <h3 className="font-display line-clamp-2 capitalize text-balance font-bold text-xl/tight md:text-2xl/tight group-hover:underline mb-2">
            <Link href={`/recipes/${_id}`}>{recipe.title}</Link>
          </h3>

          <div className="uppercase text-xs tracking-wide">
            <span className="font-semibold">{recipe.author?.name}</span>
            <span className="mx-2">|</span>
            <span>
              {date && <time dateTime=''>{date}</time>}
            </span>
          </div>
        </div>
      </div>

      <Figure
        className="w-20 h-20 overflow-hidden [&>img]:scale-150"
        src={src}
        alt={recipe.title}
      />
    </li>
  )
}

export default HomeCard
