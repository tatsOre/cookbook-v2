import React from "react"
// unused

const RecipeSubmissionContext = React.createContext()
const RecipeSubmissionProvider = RecipeSubmissionContext.Provider

export const useRecipeSubmissionContext =
    () => React.useContext(RecipeSubmissionProvider)

function context(props) {
    return (
        <RecipeSubmissionProvider value={{}}>
            {props.children}
        </RecipeSubmissionProvider>
    )
}

export default context
