import React from 'react'
import useSWRMutation from 'swr/mutation'
import { fetcher } from '@/pages/_app'
import Modal from '@/components/Modal'
import Button from '@/components/Button'
import { default as PATHS } from '../../../../config'

function DeleteRecipe({ recipe, onDelete }) {
  const [showModal, setShowModal] = React.useState(false)

  const DELETE_URL = PATHS.RECIPES_ENDPOINT + '/' + recipe._id

  const { isMutating, trigger } = useSWRMutation(
    DELETE_URL,
    () => fetcher(DELETE_URL, { method: 'DELETE' }),
    {
      onSuccess: () => onDelete(recipe._id),
      onError: (err) => console.log(err)
    }
  )

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
      <Button
        onClick={onDeleteClick}
        disabled={isMutating}
        danger
        compact
      >
        Delete
      </Button>
    </React.Fragment>
  )
}

export default DeleteRecipe
