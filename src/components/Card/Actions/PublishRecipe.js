import React from 'react'
import useSWRMutation from 'swr/mutation'
import { fetcher } from '@/pages/_app'
import { IconLoader } from '@/components/Icon'
import UnstyledButton from '@/components/Button/UnstyledButton'
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
        <UnstyledButton onClick={onPublishClick} disabled={isMutating}>
            {isMutating
                ? <IconLoader size={20} />
                : <span>Make {recipe.public ? 'Private' : 'Public'}</span>}
        </UnstyledButton>
    )
}

export default PublishRecipe
