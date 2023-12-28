import React from 'react'
import useSWRMutation from 'swr/mutation'
import { fetcher } from '@/pages/_app'
import Button from '@/components/Button'
import { default as PATHS } from '../../../../config'

function PublishRecipe({ recipe, onPublish }) {
  const PUBLISH_URL = PATHS.RECIPES.PUBLISH + recipe._id

  const { isMutating, trigger } = useSWRMutation(
    PUBLISH_URL,
    () => fetcher(PUBLISH_URL, { method: 'PATCH' }),
    {
      onSuccess: (data) => onPublish(data.doc, data.public),
      onError: (err) => console.log(err)
    }
  )

  const onPublishClick = () => trigger()

  return (
    <Button
      onClick={onPublishClick}
      disabled={isMutating}
      secondary
      compact
    >
      {recipe.public ? 'Unpublish' : 'Publish'}
    </Button>
  )
}

export default PublishRecipe
