import React from "react"
import Link from "next/link"
import Image from "next/image"
import useUser from "@/hooks/useUser"
import Layout from "../Layout"
import { getIngredientLabel, getRecipeDate } from "./RecipeView.helpers"

function RecipeShowPhoto({ photo, title }) {
  return (
    photo && photo.url ? (
      <figure>
        <Image fill={true} src={photo.url} alt={`${title} picture`} />
      </figure>
    ) : null
  )
}

function RecipeTags({ cuisine, categories }) {
  return (
    cuisine || categories?.length ? (
      <div className="print:hidden uppercase text-xs tracking-widest">
        <span className="inline-block mb-2 mr-2">Recipe under:</span>

        <ul className="inline-flex flex-wrap font-bold">
          {cuisine && cuisine.label !== 'other' && (
            <li
              className="pr-3 [&:not(:last-child)]:border-r border-black"
              data-field="cuisine"
              key={cuisine._id}>
              {cuisine.label}
            </li>
          )}

          {categories && categories.length > 0 &&
            categories.map(cat => (
              <li
                className="px-3 [&:first-child]:pl-0 [&:not(:last-child)]:border-r border-black"
                data-field="category" key={cat._id}>
                {cat.label}
              </li>
            ))
          }
        </ul>
      </div>
    ) : null
  )
}

function RecipeView({ data }) {
  const { user } = useUser()

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
    <Layout
      headerExtraContent={!user && <Link href="/login">Login</Link>}
    >
      <div className="w-11/12 md:w-10/12 screen:pt-12 screen:md:pt-14">
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
              {user?._id !== author?._id && author?.name && (
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
                <span class="text-white text-xs font-bold">Save</span>
              </button>

              <button
                className="mx-4 w-fit h-8 px-7 py-4 bg-neutral-700 justify-center items-center gap-2.5 inline-flex tracking-wide"
                type="button"
                onClick={() => window.print()}
              >
                <span class="text-white text-xs font-bold">Print</span>
              </button>

              {user?._id === author?._id && (
                <Link
                  className="w-fit h-8 px-7 py-4 bg-neutral-700 justify-center items-center gap-2.5 inline-flex tracking-wide"
                  href={`/edit/${_id}`}
                >
                  <span class="text-white text-xs font-bold">Edit</span>
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
      </div>
    </Layout>
  )
}

export default RecipeView
