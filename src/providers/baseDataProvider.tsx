import React, { useEffect } from 'react'
import { ProviderProps } from 'types'
import { useDispatch } from 'react-redux'

import { fetchConstants } from 'store/constantSlice'
import { AppDispatch } from 'store'

const BaseDataProvider: React.FC<ProviderProps> = ({ children }) => {
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    console.log('hi')
    void dispatch(fetchConstants())
  }, [])

  return (<div>{ children }</div>)
}

export default BaseDataProvider
