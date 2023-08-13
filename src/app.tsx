// App.tsx
import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Home from './pages/home'
import Schools from './pages/schools/list'
import EditSchool from './pages/schools/edit'

import BasicPage from './library/page-templates/basic-page'

const App: React.FunctionComponent = () => {
  return (
    <BasicPage>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/schools" element={<Schools />} />
        <Route path="/schools/:id" element={<EditSchool />} />
      </Routes>
    </BasicPage>
  )
}

export default App
