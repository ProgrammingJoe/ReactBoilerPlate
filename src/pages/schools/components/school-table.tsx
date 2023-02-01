import React from 'react'
import { Table, Button, Typography } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { TableHeader } from 'library/tables'
import { useSelector } from 'react-redux'

import { School, District, SelectOption } from 'types'
import { Store } from 'store/index'
import { TABLE_PAGE_SIZE } from 'utils'
import TableFilterBar from 'pages/schools/components/school-table-filters'
const { Title } = Typography

interface Props {
  schools: School[]
  setIsFormVisible: (value: boolean) => void
  getSchoolPage: (page: number, filter: string) => void
  total: number
}

const SchoolTable: React.FC<Props> = ({ schools, setIsFormVisible, getSchoolPage, total }) => {
  const schoolCategories: any = useSelector((state: Store) => state.constants.value.schoolCategories)

  const columns: ColumnsType<School> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (name) => <span>{name}</span>
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: (category) => <span>{schoolCategories.find((c: SelectOption) => c.value === category).label}</span>
    },
    {
      title: 'District',
      dataIndex: 'district',
      key: 'district',
      render: (district: District) => <span>{district.name}</span>
    },
    {
      title: 'Student Count',
      dataIndex: 'number_of_students',
      key: 'number_of_students',
      render: (numberOfStudents) => <span>{numberOfStudents}</span>
    }
  ]

  return (
    <div>
      <TableHeader>
        <Title level={2}>Schools</Title>
        <Button
          type="primary"
          onClick={() => setIsFormVisible(true)}>
            Create School
        </Button>
      </TableHeader>
      <Table
        size="small"
        title={() => (
          <TableFilterBar
            onFilterChanged={(filter: string) => getSchoolPage(1, filter)}
          />
        )}
        columns={columns}
        dataSource={schools}
        pagination={{
          pageSize: TABLE_PAGE_SIZE,
          total,
          onChange: (page) => getSchoolPage(page, '')
        }}
      />
    </div>
  )
}

export default SchoolTable
