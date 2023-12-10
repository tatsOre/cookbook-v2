import Link from "next/link"
import { getRecipeDate } from "./RecipeView/RecipeView.helpers"
import Figure from "./Figure"

function HomeCard({ recipe }) {
  const { _id, createdAt, updatedAt } = recipe

  const date = getRecipeDate(createdAt, updatedAt)

  const src = recipe.photo?.url || ""

  return (
    <li className="group cursor-pointer flex flex-row items-center gap-x-4 justify-between border-b border-neutral-200 last-of-type:border-b-0 hover:bg-white max-w-[450px] p-3 md:p-4">
      <div className="md:flex md:items-center flex-1">
        <span
          className="text-xs uppercase tracking-widest md:[writing-mode:vertical-lr] md:-rotate-180 mr-4 border-b border-b-black md:border-l md:border-l-black md:border-b-0"
        >
          dinner
        </span>

        <div className="mt-1 md:mt-0">
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
        className="ml-4 w-20 h-20 overflow-hidden [&>img]:scale-150"
        src={src}
        alt={recipe.title}
      />
    </li>
  )
}

export default HomeCard
