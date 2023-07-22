import React from 'react'

function formSubmissionReducer(state, action) {
    switch (action.type) {
        case 'START': {
            return {
                status: 'pending',
                responseData: null,
                errorMessage: null
            }
        }
        case 'RESOLVE': {
            return {
                status: 'resolved',
                responseData: action.responseData,
                errorMessage: null,
            }
        }
        case 'REJECT': {
            return {
                status: 'rejected',
                responseData: null,
                errorMessage: action.error.message,
            }
        }
        default:
            throw new Error(`Unsupported type: ${action.type}`)
    }
}

function useFormSubmission({ endpoint, data, method }) {
    const [state, dispatch] = React.useReducer(formSubmissionReducer, {
        status: 'idle',
        responseData: null,
        errorMessage: null,
    })

    const fetchBody = data ? JSON.stringify(data) : null

    React.useEffect(() => {
        if (fetchBody) {
            dispatch({ type: 'START' })
            window
                .fetch(endpoint, {
                    method: method || 'POST',
                    body: fetchBody,
                    headers: {
                        "Access-Control-Allow-Credentials": true,
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                })
                .then(async response => {
                    const data = await response.json()
                    if (response.ok) {
                        dispatch({ type: 'RESOLVE', responseData: data })
                    } else {
                        dispatch({ type: 'REJECT', error: data })
                    }
                })
                .catch(error => {
                    process.env.NEXT_PUBLIC_NODE_ENV_FE === "development"
                        && console.log(error)
                    dispatch({
                        type: 'REJECT',
                        error: {
                            message: 'An unexpected error has occurred. Please try again.'
                        }
                    })
                })
        }
    }, [fetchBody, endpoint, method])

    return state
}

export default useFormSubmission
