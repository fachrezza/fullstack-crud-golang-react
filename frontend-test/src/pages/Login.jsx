import { useState } from 'react'
import axios from 'axios'

function Login() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const login = async () => {

    try {

    const response = await axios.post(
      'http://localhost:8080/login',
      {
        email,
        password
      }
    )

    localStorage.setItem(
      'token',
      response.data.token
    )

    localStorage.setItem(
      'role',
      response.data.role
    )

    window.location.href = '/'

    } catch (error) {

      console.log(error)

      alert('Login gagal')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">

      <div className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-md">

        <div className="text-center mb-8">

          <h1 className="text-4xl font-bold text-slate-800">
            Login
          </h1>

          <p className="text-slate-500 mt-2">
            Sistem CRUD Mahasiswa
          </p>

        </div>

        <div className="space-y-5">

          <input
            type="email"
            placeholder="Email"
            className="w-full border p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          <button
            onClick={login}
            className="w-full bg-blue-600 hover:bg-blue-500 transition-all text-white p-4 rounded-xl font-semibold"
          >
            Login
          </button>

        </div>

        {/* REGISTER LINK */}

        <div className="text-center mt-6">

          <p className="text-slate-500">
            Belum punya akun?
          </p>

          <button
            onClick={() =>
              window.location.href = '/register'
            }
            className="mt-3 text-blue-600 hover:text-blue-500 font-semibold"
          >
            Register Sekarang
          </button>

        </div>

      </div>

    </div>
  )     
}

export default Login