import React, { useEffect, useState } from 'react'

import SchoolsAPI from 'plugins/schoolsAPI'
import SchoolTable from './components/school-table'
import CreateSchool from './components/create-school'
import BasicPage from 'library/page-templates/basic-page'
import { School } from 'types'

const Schools: React.FunctionComponent = () => {
  const [schools, setSchools] = useState<School[]>([])
  const [isFormVisible, setIsFormVisible] = useState(false)

  useEffect(() => {
    const getSchools = async (): Promise<void> => {
      try {
        const response = await SchoolsAPI.get('schools')
        setSchools(response.data)
      } catch (error) {
        console.log('oh no request failed')
      }
    }

    void getSchools()
  }, [])

  const insertNewData = (school: any): void => {
    setIsFormVisible(false)

    const filteredData = schools.filter((s: any) => s.name !== school.name)
    filteredData.unshift(school)
    setSchools(filteredData)
  }

  return (
    <BasicPage>
      { isFormVisible
        ? <CreateSchool insertNewData={insertNewData}/>
        : <SchoolTable schools={schools} setIsFormVisible={setIsFormVisible}/>
      }
    </BasicPage>
  )
}

export default Schools
