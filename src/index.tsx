import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'

import reportWebVitals from './reportWebVitals'
import router from './router'
import GlobalStyle from './globalStyles'
import store from 'store/index'
import { Provider } from 'react-redux'
import BaseDataProvider from 'providers/baseDataProvider'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

root.render(
  <Provider store={store}>
    <BaseDataProvider>
      <React.StrictMode>
        <GlobalStyle/>
        <RouterProvider router={router} />
      </React.StrictMode>
    </BaseDataProvider>
  </Provider>

)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
