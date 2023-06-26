import * as React from 'react'
import Login from '../Login'
import Spinner from '../LoadingOverlay'


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

export function useFormSubmission({ endpoint, data }) {
    const [state, dispatch] = React.useReducer(formSubmissionReducer, {
        status: 'idle',
        responseData: null,
        errorMessage: null,
    })

    const fetchBody = data ? JSON.stringify(data) : null

    React.useEffect(() => {

        console.log(fetchBody)

        if (fetchBody) {
            const delay = ms => new Promise(res => setTimeout(res, ms));

            const delayFuncion = async () => {
                await delay(5000);
                console.log("Waited 5s");

                await delay(5000);
                console.log("Waited an additional 5s");

                dispatch({ type: 'RESOLVE', responseData: data })
            };

            delayFuncion()
        }


        /**
                if (fetchBody) {
                    dispatch({ type: 'START' })
                    window
                        .fetch(endpoint, {
                            method: 'POST',
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
        
        
         */
    }, [fetchBody, endpoint])

    return state
}
