import React, { useEffect, useState } from 'react'

import SchoolsAPI from 'plugins/schoolsAPI'
import SchoolTable from './components/school-table'
import CreateSchool from './components/create-school'
import BasicPage from 'library/page-templates/basic-page'
import { School } from 'types'
import { TABLE_PAGE_SIZE } from 'utils'

const Schools: React.FunctionComponent = () => {
  const [schools, setSchools] = useState<School[]>([])
  const [total, setTotal] = useState<number>(0)
  const [isFormVisible, setIsFormVisible] = useState(false)

  const getSchools = async (page: number, filter: string): Promise<void> => {
    const offset = page - 1

    try {
      const response = await SchoolsAPI.get(`schools/?${filter}&offset=${offset * TABLE_PAGE_SIZE}&limit=${TABLE_PAGE_SIZE}`)
      setSchools(response.data.results)
      setTotal(response.data.count)
    } catch (error) {
      console.log('oh no request failed')
    }
  }

  useEffect(() => {
    void getSchools(1, '')
  }, [])

  const insertNewData = (school: any): void => {
    setIsFormVisible(false)

    const filteredData = schools.filter((s: any) => s.name !== school.name)
    filteredData.unshift(school)
    setSchools(filteredData)
  }

  const getSchoolPage = (page: number, filter: string): void => {
    void getSchools(page, filter)
  }

  return (
    <BasicPage>
      { isFormVisible
        ? <CreateSchool insertNewData={insertNewData}/>
        : <SchoolTable
            schools={schools}
            setIsFormVisible={setIsFormVisible}
            getSchoolPage={getSchoolPage}
            total={total}
          />
      }
    </BasicPage>
  )
}

export default Schools
