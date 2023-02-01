import React, { useState } from 'react'
import { Button, Card, Select, Input, Space } from 'antd'
import { PlusCircleOutlined, ArrowRightOutlined, CloseCircleOutlined } from '@ant-design/icons'
import { FilterWrapper } from 'library/tables/table-filter-wrappers'

interface Props {
  name: string
  applyFilter: Function
}

const QuantityTableFilter: React.FunctionComponent<Props> = ({ name, applyFilter }) => {
  const [method, setMethod] = useState<string>('__exact')
  const [value, setValue] = useState<number>(NaN)
  const [upperValue, setUpperValue] = useState(0)
  const [appliedMethod, setAppliedMethod] = useState<string>('')
  const [appliedValue, setAppliedValue] = useState(0)
  const [isPanelOpen, setIsPanelOpen] = useState(false)

  const onApply = (): void => {
    setAppliedMethod(method)
    setAppliedValue(value)

    let filter = `${name.toLowerCase()}${method}=${value}`
    if (method === IS_BETWEEN) {
      filter = `${name.toLowerCase()}__gte=${value}&${name.toLowerCase()}__lte=${upperValue}&`
    }

    applyFilter(filter)
    setIsPanelOpen(false)
  }

  const IS_BETWEEN = '__between'
  const methodOptions = [
    {
      value: '__exact',
      label: 'Is Equal'
    },
    {
      value: '__lte',
      label: 'Is Less Than'
    },
    {
      value: '__gte',
      label: 'Is Greater Than'
    },
    {
      value: IS_BETWEEN,
      label: 'Is Between'
    }
  ]

  const getMethodDisplayValue = (key: string): string => {
    const option = methodOptions.find((option) => option.value === key)

    if (option !== undefined) return option.label

    return ''
  }

  const getPillDisplayValue = (): string => {
    if (appliedMethod !== '' && !isNaN(appliedValue)) {
      return `${getMethodDisplayValue(appliedMethod)} ${appliedValue}`
    }

    return name
  }

  const isBetweenFilter = method === IS_BETWEEN
  const isFilterActive = !isNaN(value)
  return (
    <FilterWrapper>
      {isPanelOpen && <Card
        size="small"
        style={{ top: 24, position: 'absolute', width: 200 }}
        title="Filter X"
      >
        <Space direction="vertical">
          <Select
            defaultValue="exact"
            value={method}
            style={{ width: '100%' }}
            onChange={setMethod}
            options={methodOptions}
          />
          <Space>
            <ArrowRightOutlined />
            <Input
              placeholder="Value"
              value={value}
              onChange={(e) => setValue(e.target.valueAsNumber)}
              type="number"
            />
            {isBetweenFilter && <Input
              placeholder="Value"
              value={upperValue}
              onChange={(e) => setUpperValue(e.target.valueAsNumber)}
              type="number"
            />}
          </Space>
          <Button type="primary" block onClick={() => onApply()}>Apply</Button>
        </Space>
      </Card>}
      <Button
        type="dashed"
        size="small"
        icon={<PlusCircleOutlined />}
        onClick={() => setIsPanelOpen(true)}
      >
        { getPillDisplayValue() }
        { isFilterActive && <CloseCircleOutlined/> }
      </Button>
    </FilterWrapper>

  )
}

export default QuantityTableFilter
