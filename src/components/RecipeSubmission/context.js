import React from "react"

const RecipeSubmissionState = React.createContext()

const RecipeSubmissionProvider = RecipeSubmissionState.Provider

export const useRecipeSubmissionContext = () => React.useContext(RecipeSubmissionState)

export default RecipeSubmissionProvider
