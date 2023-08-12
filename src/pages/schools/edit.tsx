import React from 'react'
import { useParams } from 'react-router-dom'

const EditSchool: React.FunctionComponent = () => {
  const { id } = useParams()

  return (
    <div>
      <p>Editing {id}</p>
    </div>
  )
}

export default EditSchool
