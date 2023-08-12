import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import Home from './pages/home'
import Schools from './pages/schools/list'
import EditSchool from './pages/schools/edit'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/schools',
    element: <Schools />
  },
  {
    path: '/schools/:id',
    element: <EditSchool />
  }
])

export default router
