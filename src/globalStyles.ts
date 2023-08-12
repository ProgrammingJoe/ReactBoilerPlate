import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background: #F3F3F3;
    font-family: Open-Sans, Helvetica, Sans-Serif;
  }

  .ant-form-item-label {
    font-weight: 500;
  }

  .ant-form {
    .ant-form-item:last-of-type {
      margin-bottom: 0px;
    }
  }

  .just-added-table-row,
  .default-table-row {
    -webkit-transition: background-color 500ms linear;
    -ms-transition: background-color 500ms linear;
    transition: background-color 500ms linear;
  }

  .just-added-table-row {
    background-color: aliceblue;
  }

  .default-table-row {
    background-color: white;
  }
`

export default GlobalStyle
