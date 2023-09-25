import { useEffect } from 'react'

/**
 * Listen for click events that occur somewhere in the document, outside of the element itself.
 */

function useClickOutside(ref, callback) {
    useEffect(() => {
        const listener = (event) => {
            event.stopPropagation()
            
            if (ref.current && !ref.current.contains(event.target)) {
                callback();
            }
        }

        document.addEventListener('mousedown', listener)
        document.addEventListener('touchstart', listener)
        return () => {
            document.removeEventListener('mousedown', listener)
            document.removeEventListener('touchstart', listener)
        }
    }, [ref, callback])

    useEffect(() => {
        const listener = (event) => {
            if (ref.current && (event.key === 'Escape' || event.code === 'Escape')) {
                callback()
            }
        }
        document.addEventListener('keydown', listener)

        return () => {
            document.removeEventListener('keydown', listener)
        }
    }, [ref, callback])
}

export default useClickOutside
