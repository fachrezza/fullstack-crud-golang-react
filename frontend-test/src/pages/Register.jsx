import { useState } from 'react'
import axios from 'axios'

function Register() {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('user')

  const register = async () => {

    try {

      await axios.post(
        'http://localhost:8080/register',
        {
          name,
          email,
          password,
          role
        }
      )

      alert('Register berhasil')

      window.location.href = '/login'

    } catch (error) {

      console.log(error)

      alert('Register gagal')
    }
  }

  return (

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-700 to-indigo-900">

      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-10">

        {/* HEADER */}

        <div className="text-center mb-8">

          <h1 className="text-4xl font-bold text-slate-800">
            Create Account
          </h1>

          <p className="text-slate-500 mt-2">
            Register untuk masuk dashboard
          </p>

        </div>

        {/* FORM */}

        <div className="space-y-5">

          {/* NAME */}

          <div>

            <label className="block mb-2 text-sm font-semibold text-slate-700">
              Name
            </label>

            <input
              type="text"
              placeholder="Masukkan nama"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              className="
                w-full
                border
                border-slate-300
                rounded-xl
                px-4
                py-3
                outline-none
                focus:ring-2
                focus:ring-purple-500
                transition-all
              "
            />
            

          </div>

          {/* EMAIL */}

          <div>

            <label className="block mb-2 text-sm font-semibold text-slate-700">
              Email
            </label>

            <input
              type="email"
              placeholder="Masukkan email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="
                w-full
                border
                border-slate-300
                rounded-xl
                px-4
                py-3
                outline-none
                focus:ring-2
                focus:ring-purple-500
                transition-all
              "
            />

          </div>

          {/* PASSWORD */}

          <div>

            <label className="block mb-2 text-sm font-semibold text-slate-700">
              Password
            </label>

            <input
              type="password"
              placeholder="Masukkan password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="
                w-full
                border
                border-slate-300
                rounded-xl
                px-4
                py-3
                outline-none
                focus:ring-2
                focus:ring-purple-500
                transition-all
              "
            />

          </div>
            <select
                onChange={(e) => setRole(e.target.value)}
                className="w-full border p-3 rounded-xl"
            >

                <option value="user">
                    User
                </option>

                <option value="admin">
                    Admin
                </option>

            </select>
          {/* BUTTON */}

          <button
            onClick={register}
            className="
              w-full
              bg-purple-600
              hover:bg-purple-500
              text-white
              font-semibold
              py-3
              rounded-xl
              transition-all
              shadow-lg
            "
          >
            Register
          </button>

        </div>

        {/* FOOTER */}

        <div className="mt-8 text-center text-sm text-slate-500">

          <p>
            Sudah punya akun?
          </p>

          <button
            onClick={() =>
              window.location.href = '/login'
            }
            className="
              mt-2
              text-purple-600
              hover:text-purple-500
              font-semibold
            "
          >
            Login disini
          </button>

        </div>

      </div>

    </div>
  )
}

export default Register