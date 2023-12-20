import Link from "next/link"
import RecipeTags from "./RecipeTags"
import { getIngredientLabel, getRecipeDate } from "../../utils/recipe-format"

function RecipeArticle({ data, isAuthor }) {
  const {
    _id,
    author,
    title,
    description,
    servings,
    ingredients,
    instructions,
    categories,
    cuisine,
    comments,
    photo,
    createdAt,
    updatedAt
  } = data

  const date = getRecipeDate(createdAt, updatedAt)

  return (
    <article className="screen:max-w-prose print:text-sm">
      <section>
        <RecipeTags categories={categories} cuisine={cuisine} />

        <h1 className="capitalize text-balance font-display font-black text-3xl screen:md:text-[40px] screen:md:leading-120 my-4 md:mb-8">
          {title}
        </h1>

        <p className="screen:leading-7 screen:text-balance whitespace-break-spaces">
          {description}
        </p>

        <div className="text-sm mt-3 mb-6 [&>*:not(:last-child)]:after:content-['|'] [&>*]:after:mx-2">
          {!isAuthor && author?.name && (
            <span>By <b>{author.name}</b></span>
          )}

          <span>{date}</span>

          {servings > 0 && <span>Serves {servings}</span>}
        </div>

        <div className="print:hidden">
          <button
            className="disabled:opacity-75 w-fit h-8 px-7 py-4 bg-neutral-700 justify-center items-center gap-2.5 inline-flex tracking-wide"
            type="button"
            disabled
          >
            <span className="text-white text-xs font-bold">Save</span>
          </button>

          <button
            className="mx-4 w-fit h-8 px-7 py-4 bg-neutral-700 justify-center items-center gap-2.5 inline-flex tracking-wide"
            type="button"
            onClick={() => window.print()}
          >
            <span className="text-white text-xs font-bold">Print</span>
          </button>

          {isAuthor && (
            <Link
              className="w-fit h-8 px-7 py-4 bg-neutral-700 justify-center items-center gap-2.5 inline-flex tracking-wide"
              href={`/edit/${_id}`}
            >
              <span className="text-white text-xs font-bold">Edit</span>
            </Link>
          )}
        </div>
      </section>

      <section>
        <h2 className="mt-10 mb-6 w-fit screen:lowercase screen:text-3xl screen:md:text-4xl font-bold font-display screen:font-condensed screen:border-b-4 border-black print:my-4">
          Ingredients
        </h2>
        <ul role="list" className="marker:text-black list-disc pl-5 space-y-3">
          {ingredients.map((ing, index) => (
            <li key={index}>{getIngredientLabel(ing)}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="mt-10 mb-6 w-fit screen:lowercase screen:text-3xl screen:md:text-4xl font-bold font-display screen:font-condensed screen:border-b-4 border-black print:my-4">
          Directions
        </h2>
        <ul role="list" className="space-y-3">
          {instructions.map((step, index) => (
            <li key={`step ${index + 1}`}>
              <p className="screen:leading-loose"><b>{index + 1}. </b>{step}</p>
            </li>
          ))}
        </ul>
      </section>

      {comments && (
        <section>
          <h2 className="mt-10 print:mt-4 mb-6 w-fit screen:lowercase screen:text-2xl screen:md:text-3xl font-bold font-display screen:font-condensed screen:border-b-4 border-black">
            Cooking Notes
          </h2>
          <p className="screen:leading-6 text-sm whitespace-break-spaces">{comments}</p>
        </section>
      )}
    </article>
  )
}

export default RecipeArticle
