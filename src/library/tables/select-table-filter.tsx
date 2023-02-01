import React, { useState, ReactNode } from 'react'
import { Button, Card, Select, Space } from 'antd'
import { PlusCircleOutlined, CloseCircleOutlined } from '@ant-design/icons'
import { SelectOption } from 'types'
import { FilterWrapper, PillWrapper, FilterValue } from 'library/tables/table-filter-wrappers'

interface Props {
  name: string
  options: SelectOption[]
  applyFilter: Function
}

const SelectTableFilter: React.FC<Props> = ({ name, options, applyFilter }) => {
  const [option, setOption] = useState('')
  const [appliedOption, setAppliedOption] = useState<string>('')
  const [isPanelOpen, setIsPanelOpen] = useState(false)

  const onApply = (): void => {
    setAppliedOption(option)

    const filter = `${name.toLowerCase()}=${option}`

    applyFilter(filter)
    setIsPanelOpen(false)
  }

  const clearSelection = (): void => {
    setAppliedOption('')
    applyFilter('')
    setIsPanelOpen(false)
  }

  const getMethodDisplayValue = (currentOption: string): string => {
    const optionDetails = options.find((option) => option.value === currentOption)

    if (optionDetails !== undefined) return optionDetails.label

    return currentOption
  }

  const getPillDisplayValue = (): ReactNode => {
    if (appliedOption !== '') {
      return (
        <FilterValue>
          <span>{name} | </span>
          <span>{getMethodDisplayValue(appliedOption)}</span>
        </FilterValue>
      )
    }

    return <span>{name}</span>
  }

  const isFilterActive = appliedOption !== ''
  return (
    <FilterWrapper>
      {isPanelOpen && <Card
        size="small"
        style={{ top: 50, position: 'absolute', width: 200 }}
        title="Filter X"
      >
        <Space direction="vertical" style={{ width: '100%' }}>
          <Select
            defaultValue="exact"
            value={option}
            style={{ width: '100%' }}
            onChange={setOption}
            options={options}
          />
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
            onClick={() => setIsPanelOpen(true)}
          />
            )}
        <Button
          type="text"
          size="small"
          onClick={() => setIsPanelOpen(true)}
        >
          { getPillDisplayValue() }
        </Button>
      </PillWrapper>
    </FilterWrapper>

  )
}

export default SelectTableFilter
