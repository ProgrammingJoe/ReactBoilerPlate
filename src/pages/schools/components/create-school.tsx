import React, { useEffect, useState } from 'react'
import { Button, Form, Input, Select, Typography } from 'antd'
import { CloseOutlined } from '@ant-design/icons'
import SchoolsAPI, { getFirstErrorMessage } from 'plugins/schoolsAPI'
import { useSelector } from 'react-redux'
import { FormHeader, FormFooter } from 'library/forms/form-wrappers'

import { School, District } from 'types'
import { Store } from 'store/index'

const { Option } = Select
const { Title, Text } = Typography

interface Props {
  insertNewData: (value: School) => void
  hideForm: Function
}

const CreateSchool: React.FC<Props> = ({ insertNewData, hideForm }) => {
  const schoolCategories = useSelector((state: Store) => state.constants.value.schoolCategories)
  const [districts, setDistricts] = useState<District[]>([])
  const [errorMessage, setErrorMessage] = useState('')

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
    } catch (err) {
      setErrorMessage(getFirstErrorMessage(err))
    }
  }

  const onFinish = (values: School): void => {
    let formHasErrors = false

    if (values.category === schoolCategories.Highschool) {
      formHasErrors = true
      setErrorMessage('You cannot choose highschool because I said so!')
    }

    if (!formHasErrors) {
      void submitSchool(values)
    }
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
        width: 320,
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

      <Form.Item
        name="category"
        label="Category"
        rules={[{ required: true, message: 'Please select a category' }]}>
        <Select
          placeholder="Select a option and change input text above"
          allowClear
        >
          {schoolCategories.options.map((key) => (
            <Option value={key.value} key={key.value}>{ key.label }</Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        name="district_id"
        label="District"
        rules={[{ required: true, message: 'Please select a district' }]}>
        <Select
          placeholder="Select a option and change input text above"
          allowClear
        >
          {districts.map((district) => (
            <Option value={district.id} key={district.id}>{ district.name }</Option>
          ))}
        </Select>
      </Form.Item>

      <FormFooter>
        <div>
          {errorMessage !== '' && <Text type="danger">{ errorMessage }</Text>}
        </div>
        <Form.Item style={{ textAlign: 'right' }}>
          <Button type="primary" htmlType="submit">
            Create
          </Button>
        </Form.Item>
      </FormFooter>
    </Form>
  )
}

export default CreateSchool
