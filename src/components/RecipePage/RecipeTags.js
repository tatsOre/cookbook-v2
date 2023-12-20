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

export default RecipeTags
