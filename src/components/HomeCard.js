import Link from "next/link"
import clsx from "clsx"
import Figure from "./Figure"
import { getRecipeDate } from "../utils/recipe-format"

function HomeCard({ recipe }) {
  const { _id, categories, cuisine, createdAt, updatedAt, title } = recipe

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
    <li className={clsx(
      "group relative flex flex-row justify-between items-center gap-x-3 md:gap-x-4",
      "hover:bg-white max-w-[450px] p-3 md:p-4",
      "border-b border-neutral-200 last-of-type:border-b-0"
    )}>
      <Link
        className="absolute inset-0 z-10"
        href={`/recipes/${_id}`}
        title={`Go to ${title} article`}
      />

      <div className="md:flex md:items-center flex-1">
        <span className={clsx(
          "text-xs uppercase tracking-widest md:[writing-mode:vertical-lr] mr-4",
          "md:-rotate-180 border-b border-b-black md:border-l md:border-l-black md:border-b-0"
        )}>
          {getCardTag()}
        </span>

        <div className="mt-2 md:mt-0">
          <h3 className="font-display line-clamp-2 capitalize text-balance font-bold text-xl/tight md:text-2xl/tight group-hover:underline mb-2">
            {recipe.title}
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
