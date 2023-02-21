import React, { useEffect, useState } from 'react'
import { Typography, Button } from 'antd'

import SchoolsAPI from 'plugins/schoolsAPI'
import SchoolTable from './components/school-table'
import CreateSchool from './components/create-school'
import BasicPage from 'library/page-templates/basic-page'
import { School } from 'types'
import { TABLE_PAGE_SIZE } from 'utils'
import { InlineTableFormSpace, TableHeader } from 'library/tables/table-wrappers'

const { Title } = Typography

const Schools: React.FunctionComponent = () => {
  const [schools, setSchools] = useState<School[]>([])
  const [highlightedRows, setHighlightedRows] = useState<School[]>([])
  const [total, setTotal] = useState<number>(0)
  const [isFormVisible, setIsFormVisible] = useState(false)

  const getSchools = async (page: number, filter: string): Promise<void> => {
    const offset = page - 1

    try {
      const response = await SchoolsAPI.get(
        `schools/?${filter}&offset=${offset * TABLE_PAGE_SIZE}&limit=${TABLE_PAGE_SIZE}`
      )
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
    highlightRow(school)
    setSchools(filteredData)
  }

  const highlightRow = (row: School): void => {
    setHighlightedRows(currentRows => [...currentRows, row])
  }

  const getSchoolPage = (page: number, filter: string): void => {
    void getSchools(page, filter)
  }

  return (
    <BasicPage>
      <TableHeader>
        <Title level={2}>Schools</Title>
        {!isFormVisible && (<Button
          type="primary"
          onClick={() => setIsFormVisible(true)}>
            Create School
        </Button>)}
      </TableHeader>
      <InlineTableFormSpace>
        <SchoolTable
          schools={schools}
          highlightedRows={highlightedRows}
          getSchoolPage={getSchoolPage}
          total={total}
        />
        {isFormVisible && (<CreateSchool
          insertNewData={insertNewData}
          hideForm={() => setIsFormVisible(false)}
        />)}
      </InlineTableFormSpace>
    </BasicPage>
  )
}

export default Schools
