import { useEffect, useState } from 'react'
import axios from 'axios'

function UserDashboard() {

  const token = localStorage.getItem('token')

  const [mahasiswa, setMahasiswa] = useState([])

  useEffect(() => {

    getMahasiswa()

  }, [])

  const api = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  const getMahasiswa = async () => {

    try {

      const response = await api.get('/mahasiswa')

      setMahasiswa(response.data.data)

    } catch (error) {

      console.log(error)
    }
  }

  return (

    <div className="min-h-screen bg-slate-100 p-10">

      <div className="max-w-6xl mx-auto">

        <div className="flex justify-between items-center mb-10">

          <div>

            <h1 className="text-4xl font-bold">
              User Dashboard
            </h1>

            <p className="text-gray-500 mt-2">
              Statistik Mahasiswa
            </p>

          </div>

          <button
            onClick={() => {
              localStorage.clear()
              window.location.href = '/login'
            }}
            className="bg-red-500 text-white px-5 py-2 rounded-xl"
          >
            Logout
          </button>

        </div>

        {/* STAT CARD */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

          <div className="bg-white p-6 rounded-2xl shadow">

            <h2 className="text-gray-500">
              Total Mahasiswa
            </h2>

            <p className="text-4xl font-bold mt-3">
              {mahasiswa.length}
            </p>

          </div>

        </div>

        {/* TABLE */}

        <div className="bg-white rounded-2xl shadow overflow-hidden">

          <table className="w-full">

            <thead className="bg-blue-600 text-white">

              <tr>

                <th className="p-5 text-left">
                  Nama
                </th>

                <th className="p-5 text-left">
                  NIM
                </th>

                <th className="p-5 text-left">
                  Jurusan
                </th>

              </tr>

            </thead>

            <tbody>

              {
                mahasiswa.map((item) => (

                  <tr
                    key={item.id}
                    className="border-b"
                  >

                    <td className="p-5">
                      {item.nama}
                    </td>

                    <td className="p-5">
                      {item.nim}
                    </td>

                    <td className="p-5">
                      {item.jurusan?.nama_jurusan}
                    </td>

                  </tr>
                ))
              }

            </tbody>

          </table>

        </div>

      </div>

    </div>
  )
}

export default UserDashboard