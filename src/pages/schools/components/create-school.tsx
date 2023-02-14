import React, { useEffect, useState } from 'react'
import { Button, Form, Input, Select, Typography } from 'antd'
import { CloseOutlined } from '@ant-design/icons'
import SchoolsAPI from 'plugins/schoolsAPI'
import { useSelector } from 'react-redux'
import { FormHeader } from 'library/forms/form-wrappers'

import { School, District } from 'types'
import { Store } from 'store/index'

const { Option } = Select
const { Title } = Typography

interface Props {
  insertNewData: (value: School) => void
  hideForm: Function
}

const CreateSchool: React.FC<Props> = ({ insertNewData, hideForm }) => {
  const schoolCategories = useSelector((state: Store) => state.constants.value.schoolCategories)
  const [districts, setDistricts] = useState<District[]>([])

  useEffect(() => {
    const getDistricts = async (): Promise<void> => {
      try {
        const response = await SchoolsAPI.get('districts')
        setDistricts(response.data.results)
      } catch (error) {
        console.log('oh no request failed')
      }
    }

    void getDistricts()
  }, [])

  const submitSchool = async (values: School): Promise<void> => {
    try {
      const response = await SchoolsAPI.post('schools/', values)
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
      labelAlign="left"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      requiredMark="optional"
      style={{
        maxWidth: 320,
        backgroundColor: 'white',
        padding: 12,
        borderRadius: 6
      }}
    >
      <FormHeader>
        <Title level={4} style={{ margin: '0' }}>Create School</Title>
        <Button type="default" onClick={() => hideForm()} shape="circle" icon={<CloseOutlined />}/>
      </FormHeader>

      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: 'Please input a school name' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item name="category" label="Category" rules={[{ required: true }]}>
        <Select
          placeholder="Select a option and change input text above"
          allowClear
        >
          {schoolCategories.map((key) => (
            <Option value={key.value} key={key.value}>{ key.label }</Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item name="district_id" label="District" rules={[{ required: true }]}>
        <Select
          placeholder="Select a option and change input text above"
          allowClear
        >
          {districts.map((district) => (
            <Option value={district.id} key={district.id}>{ district.name }</Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item style={{ textAlign: 'right' }}>
        <Button type="primary" htmlType="submit">
          Create
        </Button>
      </Form.Item>
    </Form>
  )
}

export default CreateSchool
