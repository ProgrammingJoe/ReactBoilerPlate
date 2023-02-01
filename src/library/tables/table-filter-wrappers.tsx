import styled from 'styled-components'

export const FilterWrapper = styled.span`
  position: relative;
  z-index: 20;
`

export const FilterValue = styled.span`
  display: flex;
  align-items: center;

  span:last-of-type {
    color: blue;
  }
`

export const PillWrapper = styled.span`
  display: flex;
  width: fit-content;
  flex-direction: row;
  align-items: center;
  gap: 2px;
  border: 1px dashed grey;
  padding: 0 6px;
  border-radius: 20px;
  background-color: white;

  button.ant-btn-text {
    padding: 0px;

    &:hover {
      background-color: transparent;
    }
  }

  &:hover {
    background-color: lightgrey;
  }
`
