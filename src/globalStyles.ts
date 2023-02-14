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
`

export default GlobalStyle
