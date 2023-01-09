import React from 'react'
import { Form, Input, Select } from 'antd'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

import { Store } from 'store/index'

const { Option } = Select

const Wrapper = styled.div`
  padding: 8px;
  border-radius: 6px;
  border: 1px solid #d3d3d3;
  background-color: white;
  margin-bottom: 12px;
`

const TableFilterBar: React.FunctionComponent = () => {
  const highschoolCategories = useSelector((state: Store) => state.constants.value.highschoolCategories)
  const onFinish = (): void => {}

  const onFinishFailed = (): void => {}

  return <Wrapper>
    <Form
      name="basic"
      layout="inline"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        wrapperCol={{ span: 12 }}
        name="name"
      >
        <Input placeholder="name"/>
      </Form.Item>

      <Form.Item name="category" wrapperCol={{ span: 12 }}>
        <Select
          placeholder="Select a option and change input text above"
          allowClear
        >
          {Object.entries(highschoolCategories).map((key) => (
            <Option value={key[0]} key={key[0]}>{ key[1] }</Option>
          ))}
        </Select>
      </Form.Item>
    </Form>
  </Wrapper>
}

export default TableFilterBar
