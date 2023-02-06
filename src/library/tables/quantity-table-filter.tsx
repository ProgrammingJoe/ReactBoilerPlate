import React, { useState, ReactNode } from 'react'
import { Button, Card, Select, Input, Space } from 'antd'
import { PlusCircleOutlined, ArrowRightOutlined, CloseCircleOutlined } from '@ant-design/icons'
import { FilterWrapper, PillWrapper, FilterValue, OPEN_PANEL_NONE } from 'library/tables/table-filter-wrappers'

interface Props {
  name: string
  filterId: number
  currentOpenPanel: number
  openPanel: Function
  applyFilter: Function
}

const QuantityTableFilter: React.FunctionComponent<Props> = ({
  name, applyFilter, currentOpenPanel, openPanel, filterId
}) => {
  const [method, setMethod] = useState<string>('__exact')
  const [value, setValue] = useState<number>(NaN)
  const [upperValue, setUpperValue] = useState(0)
  const [appliedMethod, setAppliedMethod] = useState<string>('')
  const [appliedValue, setAppliedValue] = useState(0)

  const onApply = (): void => {
    setAppliedMethod(method)
    setAppliedValue(value)

    let filter = `${name.toLowerCase()}${method}=${value}&`
    if (method === IS_BETWEEN) {
      filter = `${name.toLowerCase()}__gte=${value}&${name.toLowerCase()}__lte=${upperValue}&`
    }

    applyFilter(filter)
    openPanel(OPEN_PANEL_NONE)
  }

  const clearSelection = (): void => {
    setAppliedValue(0)
    setAppliedMethod('')
    applyFilter('')
    openPanel(OPEN_PANEL_NONE)
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

  const getPillDisplayValue = (): ReactNode => {
    if (appliedMethod !== '' && !isNaN(appliedValue)) {
      return (
        <FilterValue>
          <span>{name} | </span>
          <span>{`${getMethodDisplayValue(appliedMethod)} ${appliedValue}`}</span>
        </FilterValue>
      )
    }

    return <span>{ name }</span>
  }

  const isBetweenFilter = method === IS_BETWEEN
  const isFilterActive = !isNaN(value)
  const isPanelOpen = currentOpenPanel === filterId
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
      <PillWrapper>
        { isFilterActive
          ? (
          <Button
            type="text"
            size="small"
            icon={<CloseCircleOutlined />}
            onClick={() => clearSelection()}
          />
            )
          : (
          <Button
            type="text"
            size="small"
            icon={<PlusCircleOutlined />}
            onClick={() => openPanel(filterId)}
          />
            )}
        <Button
          type="text"
          size="small"
          onClick={() => openPanel(filterId)}
        >
          { getPillDisplayValue() }
        </Button>
      </PillWrapper>
    </FilterWrapper>

  )
}

export default QuantityTableFilter
