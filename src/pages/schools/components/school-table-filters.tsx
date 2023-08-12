import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import QuantityTableFilter from 'library/tables/quantity-table-filter'
import SelectTableFilter from 'library/tables/select-table-filter'
import { TableFilterBarWrapper, OPEN_PANEL_NONE } from 'library/tables/table-filter-wrappers'

import { Store } from 'store/index'

interface Props {
  onFilterChanged: Function
}

const SchoolTableFilters: React.FunctionComponent<Props> = ({ onFilterChanged }) => {
  const OPEN_PANEL_STUDENTS = 1
  const OPEN_PANEL_CATEGORY = 2

  const [openPanel, setOpenPanel] = useState(OPEN_PANEL_NONE)
  const [amountFilter, setAmountFilter] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')
  const schoolCategories = useSelector((state: Store) => state.constants.value.schoolCategories)

  const applyAmountFilter = (filter: string): void => {
    setAmountFilter(filter)
  }

  useEffect(() => {
    createFilterString()
  }, [amountFilter, categoryFilter])

  const createFilterString = (): void => {
    let filter = ''

    if (amountFilter !== '') {
      filter += amountFilter
    }
    if (categoryFilter !== '') {
      filter += categoryFilter
    }

    onFilterChanged(filter)
  }

  return <TableFilterBarWrapper>
    <QuantityTableFilter
      filterId={OPEN_PANEL_STUDENTS}
      currentOpenPanel={openPanel}
      openPanel={(panel: number) => setOpenPanel(panel)}
      closePanel={() => setOpenPanel(OPEN_PANEL_NONE)}
      name="Students"
      applyFilter={applyAmountFilter}
    />
    <SelectTableFilter
      filterId={OPEN_PANEL_CATEGORY}
      currentOpenPanel={openPanel}
      openPanel={(panel: number) => setOpenPanel(panel)}
      closePanel={() => setOpenPanel(OPEN_PANEL_NONE)}
      name="Category"
      applyFilter={setCategoryFilter}
      options={schoolCategories.options}
    />
  </TableFilterBarWrapper>
}

export default SchoolTableFilters
