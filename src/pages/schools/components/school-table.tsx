import React from 'react'
import { Table, Button } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

import { School, District, SelectOption } from 'types'
import { Store } from 'store/index'
import { TABLE_PAGE_SIZE } from 'utils'
import TableFilterBar from 'pages/schools/components/school-table-filters'

interface Props {
  schools: School[]
  highlightedRows: School[]
  getSchoolPage: (page: number, filter: string) => void
  total: number
  editRow: Function
}

const Wrapper = styled.div`
  flex: 1;
`

const SchoolTable: React.FC<Props> = ({ schools, getSchoolPage, total, highlightedRows, editRow }) => {
  const navigate = useNavigate()
  const schoolCategories: any = useSelector((state: Store) => state.constants.value.schoolCategories)

  const getSchoolCategory = (category: string): string => {
    const categoryOption = schoolCategories.options.find((c: SelectOption) => c.value === category)

    if (categoryOption != null) {
      return categoryOption.label
    }

    return ''
  }

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
      render: (category) => <span>{getSchoolCategory(category)}</span>
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
    },
    {
      title: 'Action',
      key: 'action',
      render: (row: School) => (<div>
        <Button type="dashed" onClick={() => navigate(`/schools/${row.id}/`)}>Edit2</Button>
        <Button type="dashed" onClick={() => editRow(row)}>Edit</Button>
      </div>)
    }
  ]

  return (
    <Wrapper>
      <Table
        size="small"
        title={() => (
          <TableFilterBar
            onFilterChanged={(filter: string) => getSchoolPage(1, filter)}
          />
        )}
        rowClassName={(record, index) => index === 0 ? 'just-added-table-row' : 'default-table-row'}
        columns={columns}
        dataSource={schools}
        pagination={{
          pageSize: TABLE_PAGE_SIZE,
          total,
          onChange: (page) => getSchoolPage(page, '')
        }}
      />
    </Wrapper>
  )
}

export default SchoolTable
