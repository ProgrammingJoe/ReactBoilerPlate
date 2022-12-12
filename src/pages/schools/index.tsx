import React, { useEffect, useState } from 'react'
import { Layout } from 'antd'

import SchoolsAPI from 'plugins/schoolsAPI'
import SchoolTable from './components/school-table'
import CreateSchool from './components/create-school'

const { Content } = Layout

const Schools: React.FunctionComponent = () => {
  const [schools, setSchools] = useState<any[]>([])
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
    <Layout>
      <Content>
        { isFormVisible
          ? <CreateSchool insertNewData={insertNewData}/>
          : <SchoolTable schools={schools} setIsFormVisible={setIsFormVisible}/>
        }
      </Content>
    </Layout>
  )
}

export default Schools
