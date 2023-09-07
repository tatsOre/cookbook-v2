import React from 'react'
import useSWRMutation from 'swr/mutation'
import { fetcher } from '@/pages/_app'
import { IconLoader } from '@/components/Icon'
import Modal from '@/components/Modal'
import UnstyledButton from '@/components/Button/UnstyledButton'
import { default as PATHS } from '../../../../config'

function DeleteRecipe({ recipe, onDelete }) {
    const [showModal, setShowModal] = React.useState(false)

    const DELETE_URL = PATHS.RECIPES_ENDPOINT + '/' + recipe._id

    const {
        data, error, isMutating, trigger
    } = useSWRMutation(
        DELETE_URL,
        () => fetcher(DELETE_URL, { method: 'DELETE' })
    )

    React.useEffect(() => {
        if (data && !error) onDelete(recipe._id)
    }, [data])

    const onDeleteClick = () => setShowModal(true)

    const modalProps = {
        heading: 'Are you sure?',
        children: (
            <p>
                Deleting <i>{recipe.title}</i> means that you will{' '}
                <strong>permanently lose</strong> the data about this recipe.
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

            <UnstyledButton onClick={onDeleteClick} disabled={isMutating}>
                {isMutating ? <IconLoader size={20} /> : <span>Delete</span>}
            </UnstyledButton>
        </React.Fragment>
    )
}

export default DeleteRecipe