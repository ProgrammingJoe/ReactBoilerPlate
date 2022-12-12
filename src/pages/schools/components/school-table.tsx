import React from 'react'
import { Space, Table, Button } from 'antd'
import type { ColumnsType } from 'antd/es/table'

const columns: ColumnsType<School> = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    )
  }
]

interface School {
  name: string
}

interface Props {
  schools: School[]
  setIsFormVisible: (value: boolean) => void
}

const SchoolTable: React.FC<Props> = ({ schools, setIsFormVisible }) => {
  return (
    <div>
      <Button
        type="primary"
        onClick={() => setIsFormVisible(true)}>
          Create School
      </Button>
      <Table columns={columns} dataSource={schools} />
    </div>
  )
}

export default SchoolTable
