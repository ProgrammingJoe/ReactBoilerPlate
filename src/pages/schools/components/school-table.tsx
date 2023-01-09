import React from 'react'
import { Table, Button, Typography } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { TableHeader } from 'library/tables'
import { useSelector } from 'react-redux'

import { School, District } from 'types'
import { Store } from 'store/index'
import { TABLE_PAGE_SIZE } from 'utils'
import TableFilterBar from 'library/table-filter-bar'
const { Title } = Typography

interface Props {
  schools: School[]
  setIsFormVisible: (value: boolean) => void
  getSchoolPage: (page: number) => void
  total: number
}

const SchoolTable: React.FC<Props> = ({ schools, setIsFormVisible, getSchoolPage, total }) => {
  const highschoolCategories: any = useSelector((state: Store) => state.constants.value.highschoolCategories)

  const columns: ColumnsType<School> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (name) => <p>{name}</p>
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: (category) => <p>{highschoolCategories[category]}</p>
    },
    {
      title: 'District',
      dataIndex: 'district',
      key: 'district',
      render: (district: District) => <p>{district.name}</p>
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
      <TableFilterBar/>
      <Table
        columns={columns}
        dataSource={schools}
        pagination={{
          pageSize: TABLE_PAGE_SIZE,
          total,
          onChange: getSchoolPage
        }}
      />
    </div>
  )
}

export default SchoolTable
