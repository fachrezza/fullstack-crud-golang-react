import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from 'react-router-dom'

import './index.css'

import Login from './pages/Login'
import Register from './pages/Register'

import AdminDashboard from './pages/AdminDashboard'
import UserDashboard from './pages/UserDashboard'

const token = localStorage.getItem('token')
const role = localStorage.getItem('role')

function Home() {

  if (!token) {
    return <Navigate to="/login" />
  }

  if (role === 'admin') {
    return <AdminDashboard />
  }

  return <UserDashboard />
}

ReactDOM.createRoot(
  document.getElementById('root')
).render(

  <BrowserRouter>

    <Routes>

      <Route
        path="/"
        element={<Home />}
      />

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

    </Routes>

  </BrowserRouter>
)