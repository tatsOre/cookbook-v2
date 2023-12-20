import React from 'react'

export const STATUS = {
    IDLE: 'idle',
    PENDING: 'pending',
    RESOLVED: 'resolved',
    REJECTED: 'rejected'
}

function formSubmissionReducer(state, action) {
    switch (action.type) {
        case 'START': {
            return {
                status: STATUS.PENDING,
                responseData: null,
                errorMessage: null
            }
        }
        case 'RESOLVE': {
            return {
                status: STATUS.RESOLVED,
                responseData: action.responseData,
                errorMessage: null,
            }
        }
        case 'REJECT': {
            return {
                status: STATUS.REJECTED,
                responseData: null,
                errorMessage: action.error.message,
            }
        }
        default:
            throw new Error(`Unsupported type: ${action.type}`)
    }
}
/**
 * `useFormSubmission` hook uses the useEffect hook to trigger the form submission 
 * when the fetchBody (stringified data) changes. It performs a network request 
 * using the fetch API and updates the state based on the response.
 * @param {*} param0 
 * @returns 
 */
function useFormSubmission({ endpoint, data, method }) {
    const [state, dispatch] = React.useReducer(formSubmissionReducer, {
        status: STATUS.IDLE,
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
                            message: 'An unexpected error has occurred. Please try later.'
                        }
                    })
                })
        }
    }, [fetchBody])

    return state
}

export default useFormSubmission
