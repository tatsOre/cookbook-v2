import React from 'react'

function formSubmissionReducer(state, action) {
    switch (action.type) {
        case 'START': {
            return { status: 'pending', responseData: null, errorMessage: null }
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
        console.log('Submitting payload:', fetchBody, 'Endpoint:', endpoint)
        return // For testing.

        if (fetchBody) {
            dispatch({ type: 'START' })
            window
                .fetch(endpoint, {
                    method: method || 'POST',
                    body: fetchBody,
                    headers: {
                        'content-type': 'application/json',
                    },
                })
                .then(async response => {
                    const data = await response.json()
                    if (response.ok) {
                        dispatch({ type: 'RESOLVE', responseData: data })
                    } else {
                        dispatch({ type: 'REJECT', error: data })
                    }
                })
        }
    }, [fetchBody, endpoint, method])

    return state
}

export default useFormSubmission
