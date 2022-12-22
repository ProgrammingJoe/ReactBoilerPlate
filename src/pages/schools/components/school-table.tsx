import React from 'react'
import { Table, Button, Typography } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { TableHeader } from 'library/tables'

import { School } from 'types'
const { Title } = Typography

const columns: ColumnsType<School> = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <p>{text}</p>
  },
  {
    title: 'Action',
    key: 'action',
    render: (_) => (<p>something</p>)
  }
]

interface Props {
  schools: School[]
  setIsFormVisible: (value: boolean) => void
}

const SchoolTable: React.FC<Props> = ({ schools, setIsFormVisible }) => {
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
      <Table columns={columns} dataSource={schools} />
    </div>
  )
}

export default SchoolTable
