import React from 'react'
import useSWRMutation from 'swr/mutation'
import { fetcher } from '@/pages/_app'
import { IconBookmark } from '@/components/Icon'
import UnstyledButton from '@/components/Button/UnstyledButton'
import { default as PATHS } from '../../../../config'

function BookmarkRecipe({ recipe, onUpdateFavorites, className }) {
    const UPDATE_FAV_URL = PATHS.USER.UPDATE_FAVORITES + recipe._id

    const {
        data, error, isMutating, trigger
    } = useSWRMutation(
        UPDATE_FAV_URL, () => fetcher(UPDATE_FAV_URL, { method: 'PATCH' })
    )

    React.useEffect(() => {
        error && console.log(error)
        data && onUpdateFavorites(recipe._id)
    }, [data])

    const onUpdateFavoritesClick = () => trigger()

    return (
        <UnstyledButton
            aria-checked="true"
            ariaLabel="Delete from your favorites"
            role="switch"
            className={className}
            onClick={onUpdateFavoritesClick}
            disabled={isMutating}
        >
            <IconBookmark />
        </UnstyledButton>
    )
}

export default BookmarkRecipe
