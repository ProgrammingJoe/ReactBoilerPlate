import React, { useEffect, useState } from 'react'
import { Button, Form, Input, Select } from 'antd'
import SchoolsAPI from 'plugins/schoolsAPI'
import { useSelector } from 'react-redux'

import { School, District } from 'types'
import { Store } from 'store/index'

const { Option } = Select

interface Props {
  insertNewData: (value: School) => void
}

const CreateSchool: React.FC<Props> = ({ insertNewData }) => {
  const highschoolCategories = useSelector((state: Store) => state.constants.value.highschoolCategories)
  const [districts, setDistricts] = useState<District[]>([])

  useEffect(() => {
    const getDistricts = async (): Promise<void> => {
      try {
        const response = await SchoolsAPI.get('districts')
        setDistricts(response.data)
      } catch (error) {
        console.log('oh no request failed')
      }
    }

    void getDistricts()
  }, [])

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

      <Form.Item name="category" label="Category" rules={[{ required: true }]}>
        <Select
          placeholder="Select a option and change input text above"
          allowClear
        >
          {Object.entries(highschoolCategories).map((key) => (
            <Option value={key[0]} key={key[0]}>{ key[1] }</Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item name="district" label="District" rules={[{ required: true }]}>
        <Select
          placeholder="Select a option and change input text above"
          allowClear
        >
          {districts.map((district) => (
            <Option value={district.id} key={district.id}>{ district.name }</Option>
          ))}
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
