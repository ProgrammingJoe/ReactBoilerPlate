import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { fetchConstants } from 'store/constantSlice'
import { AppDispatch } from 'store'

const BaseDataProvider: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    void dispatch(fetchConstants())
  }, [])

  return (<div/>)
}

export default BaseDataProvider
