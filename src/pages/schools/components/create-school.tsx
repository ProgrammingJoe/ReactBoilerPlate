import React from 'react'
import { Button, Form, Input, Select } from 'antd'
import SchoolsAPI from 'plugins/schoolsAPI'

const { Option } = Select

interface School {
  name: string
}

interface Props {
  insertNewData: (value: School) => void
}

const CreateSchool: React.FC<Props> = ({ insertNewData }) => {
  const submitSchool = async (values: School): Promise<void> => {
    try {
      const response = await SchoolsAPI.post('schools', values)
      insertNewData(response.data)
    } catch (error) {

    }
  }

  const onFinish = (values: School): void => {
    void submitSchool(values)
  }

  const onFinishFailed = (errorInfo: any): void => {
    console.log('Failed:', errorInfo)
  }

  return (
    <Form
      name="basic"
      layout="vertical"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: 'Please input a school name' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item name="gender" label="Gender" rules={[{ required: true }]}>
          <Select
            placeholder="Select a option and change input text above"
            allowClear
          >
            <Option value="male">male</Option>
            <Option value="female">female</Option>
            <Option value="other">other</Option>
          </Select>
        </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Create
        </Button>
      </Form.Item>
    </Form>
  )
}

export default CreateSchool
