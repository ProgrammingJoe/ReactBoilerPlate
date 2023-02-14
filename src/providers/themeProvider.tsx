import { ConfigProvider } from 'antd'
import React from 'react'
import { ProviderProps } from 'types'

const ThemeProvider: React.FC<ProviderProps> = ({ children }) => (
  <ConfigProvider
    theme={{
      token: {
        colorPrimary: '#00b96b'
      }
    }}
  >
    { children }
  </ConfigProvider>
)

export default ThemeProvider
