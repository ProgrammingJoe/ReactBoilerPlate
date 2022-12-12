import React from 'react'
import { Button, Form, Input } from 'antd'
import SchoolsAPI from 'plugins/schoolsAPI'

interface School {
  name: string
}

interface Props {
  insertNewData: (value: School) => void
}

const CreateSchool: React.FC<Props> = ({ insertNewData }) => {
  const submitSchool = (values: School): void => {
    SchoolsAPI.post(
      'schools', values
    ).then((response) => {
      insertNewData(response.data)
    }).catch(() => {

    })
  }

  const onFinish = (values: School): void => {
    submitSchool(values)
  }

  const onFinishFailed = (errorInfo: any): void => {
    console.log('Failed:', errorInfo)
  }

  return (
    <Form
      name="basic"
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

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Create
        </Button>
      </Form.Item>
    </Form>
  )
}

export default CreateSchool
