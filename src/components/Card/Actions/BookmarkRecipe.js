import React from 'react'
import useSWRMutation from 'swr/mutation'
import { fetcher } from '@/pages/_app'
import { IconBookmark } from '@/components/Icon'
import { IconButton } from '@/components/Button'
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
        <IconButton
            aria-checked="true"
            ariaLabel="Delete from your favorites"
            data-action="bookmark"
            role="switch"
            className={className}
            onClick={onUpdateFavoritesClick}
            disabled={isMutating}
            icon={<IconBookmark />}
            small
        />
    )
}

export default BookmarkRecipe
