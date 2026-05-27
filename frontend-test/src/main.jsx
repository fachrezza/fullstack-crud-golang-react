import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  BrowserRouter,
  Routes,
 Route
} from 'react-router-dom'

import './index.css'

import Register from './pages/Register.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Login from './pages/Login.jsx'

ReactDOM.createRoot(
  document.getElementById('root')
).render(

  <BrowserRouter>

    <Routes>

      {/* DASHBOARD */}
      <Route
        path="/"
        element={<Dashboard />}
      />

      {/* LOGIN */}
      <Route
        path="/login"
        element={<Login />}
      />

      {/* REGISTER */}
      <Route
        path="/register"
        element={<Register />}
      />

    </Routes>

  </BrowserRouter>
)