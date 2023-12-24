import Link from "next/link"
import Figure from "../Figure"
import DeleteRecipe from "./Actions/DeleteRecipe"
import PublishRecipe from "./Actions/PublishRecipe"
import { getRecipeDate } from "../../utils/recipe-format"

function UserRecipeCard({ recipe, onPublish, onDelete }) {
  const { _id, title, createdAt, updatedAt } = recipe

  const date = getRecipeDate(createdAt, updatedAt)

  const src = recipe.photo?.url || ""

  const tempLinkClasses = "text-xs font-semibold tracking-wider justify-center items-center gap-2 border transition-all inline-flex bg-neutral-700 border-neutral-700 text-white px-3.5 h-8 sm:h-7"

  return (
    <li className="group flex flex-row gap-x-3 md:gap-x-4 justify-between border border-neutral-400 hover:bg-white p-2 font-display">
      <Link href={`/recipes/${_id}`} title={`Go to ${title} article`}>
        <Figure
          className="w-20 h-full overflow-hidden [&>img]:scale-150 bg-neutral-900"
          src={src}
          alt={recipe.title}
        />
      </Link>

      <div className="flex-1">
        <h3 className="w-fit line-clamp-2 capitalize text-balance font-bold text-xl/tight hover:underline mb-1">
          <Link href={`/recipes/${_id}`}>{title}</Link>
        </h3>

        <div className="text-xs tracking-wide">
          <span>
            {date && <>
              <span>Last Updated: </span>
              <time dateTime=''>{date}</time>
            </>}
          </span>
        </div>

        <div className="flex gap-x-2 mt-2">
          <Link className={tempLinkClasses} href={`/edit/${_id}`}>Edit</Link>
          <PublishRecipe recipe={recipe} onPublish={onPublish} />
          <DeleteRecipe recipe={recipe} onDelete={onDelete} />
        </div>
      </div>
    </li>
  )
}

export default UserRecipeCard
