import React from 'react'
import useSWRMutation from 'swr/mutation'
import { fetcher } from '@/pages/_app'
import Button from '@/components/Button'
import { default as PATHS } from '../../../../config'

function PublishRecipe({ recipe, onPublish }) {
  const PUBLISH_URL = PATHS.RECIPES.PUBLISH + recipe._id

  const {
    data, error, isMutating, trigger
  } = useSWRMutation(
    PUBLISH_URL,
    () => fetcher(PUBLISH_URL, { method: 'PATCH' })
  )

  React.useEffect(() => {
    error && console.log(error)
    data && onPublish(data.doc, data.public)
  }, [data])

  const onPublishClick = () => trigger()

  return (
    <Button
      onClick={onPublishClick}
      disabled={isMutating}
      secondary
      compact
    >
      Make {recipe.public ? 'Private' : 'Public'}
    </Button>
  )
}

export default PublishRecipe
