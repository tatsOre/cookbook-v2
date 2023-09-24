import React from 'react'
import useSWRMutation from 'swr/mutation'
import useUser from '@/lib/useUser'
import { fetcher } from '@/pages/_app'
import { IconBookmark } from '@/components/Icon'
import { IconButton } from '@/components/Button'
import Modal from '@/components/Modal'
import { default as PATHS } from '../../../../config'

function BookmarkRecipe({ recipe, onUpdateFavorites }) {
    const [showModal, setShowModal] = React.useState(false)

    const UPDATE_FAV_URL = PATHS.USER.UPDATE_FAVORITES + recipe._id

    const {
        data, isMutating, trigger
    } = useSWRMutation(
        UPDATE_FAV_URL, () => fetcher(UPDATE_FAV_URL, { method: 'PATCH' })
    )

    const { user, mutate: mutateUser } = useUser()

    React.useEffect(() => {
        console.log({ data })
        if (data) {
            onUpdateFavorites && onUpdateFavorites(recipe._id)
            mutateUser()
        }
    }, [data])

    const onBookmarkClick = () => {
        user?.favorites?.includes(recipe._id) ? setShowModal(true) : trigger()
    }

    const modalProps = {
        children: (
            <p>
                Are you sure you want to remove <b>{recipe.title}</b> from your box?
            </p>
        ),
        onCancel: () => setShowModal(false),
        onConfirm: () => {
            setShowModal(false)
            trigger()
        }
    }

    return (
        <React.Fragment>
            {showModal && <Modal {...modalProps} />}
            <IconButton
                aria-checked={user?.favorites?.includes(recipe._id)}
                ariaLabel="Delete from your favorites"
                data-action="bookmark"
                role="switch"
                onClick={onBookmarkClick}
                disabled={isMutating}
                icon={<IconBookmark />}
                small
            />
        </React.Fragment>
    )
}

export default BookmarkRecipe
