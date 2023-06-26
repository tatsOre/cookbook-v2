import React from "react"


const RecipeSubmissionContext = React.createContext()
const RecipeSubmissionProvider = RecipeSubmissionContext.Provider

export const useRecipeSubmissionContext =
    () => useContext(RecipeSubmissionProvider)

function x(props) {

    return (
        <RecipeSubmissionProvider value={{
         

        }}>
            {props.children}
        </RecipeSubmissionProvider>
    )
}

export default x
