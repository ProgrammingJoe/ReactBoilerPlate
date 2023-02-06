import React, { useState, ReactNode } from 'react'
import { Button, Card, Select, Space } from 'antd'
import { PlusCircleOutlined, CloseCircleOutlined } from '@ant-design/icons'
import { SelectOption } from 'types'
import { FilterWrapper, PillWrapper, FilterValue, OPEN_PANEL_NONE } from 'library/tables/table-filter-wrappers'

interface Props {
  name: string
  filterId: number
  options: SelectOption[]
  currentOpenPanel: number
  openPanel: Function
  applyFilter: Function
}

const SelectTableFilter: React.FC<Props> = ({
  name, options, applyFilter, currentOpenPanel, openPanel, filterId
}) => {
  const [option, setOption] = useState('')
  const [appliedOption, setAppliedOption] = useState<string>('')

  const onApply = (): void => {
    setAppliedOption(option)

    const filter = `${name.toLowerCase()}=${option}`

    applyFilter(filter)
    openPanel(OPEN_PANEL_NONE)
  }

  const clearSelection = (): void => {
    setAppliedOption('')
    applyFilter('')
    openPanel(OPEN_PANEL_NONE)
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
  const isPanelOpen = filterId === currentOpenPanel
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

export default SelectTableFilter
