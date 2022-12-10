import React, { useEffect } from 'react'

import schoolsAPI from '../plugins/schoolsAPI'

const Schools: React.FunctionComponent = () => {
  useEffect(() => {
    const getSchools = async (): Promise<void> => {
      try {
        await schoolsAPI.get('schools')
      } catch (error) {
        console.log('oh no request failed')
      }
    }

    void getSchools()
  }, [])

  return <div>A list of schools</div>
}

export default Schools
