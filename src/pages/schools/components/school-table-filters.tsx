import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

import QuantityTableFilter from 'library/tables/quantity-table-filter'
import SelectTableFilter from 'library/tables/select-table-filter'

import { Store } from 'store/index'

const Wrapper = styled.div`

`

interface Props {
  onFilterChanged: Function
}

const SchoolTableFilters: React.FunctionComponent<Props> = ({ onFilterChanged }) => {
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

  return <Wrapper>
    {false && <QuantityTableFilter
      name="Students"
      applyFilter={applyAmountFilter}
    />}
    <SelectTableFilter
      name="Category"
      applyFilter={setCategoryFilter}
      options={schoolCategories}
    />
  </Wrapper>
}

export default SchoolTableFilters
