import React from 'react'
import { useParams } from 'react-router-dom'

import BasicPage from 'library/page-templates/basic-page'

const EditSchool: React.FunctionComponent = () => {
  const { id } = useParams()

  return (
    <BasicPage>
      <p>Editing {id}</p>
    </BasicPage>
  )
}

export default EditSchool
