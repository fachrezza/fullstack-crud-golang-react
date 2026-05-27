import { useEffect, useState } from 'react'
import axios from 'axios'
import { Navigate } from 'react-router-dom'

function Dashboard() {

  // =========================
  // AUTH CHECK
  // =========================

  const token = localStorage.getItem('token')

  if (!token) {
    return <Navigate to="/login" />
  }


  const logout = () => {

    localStorage.removeItem('token')

    window.location.href = '/login'
  }

  // =========================
  // AXIOS INSTANCE
  // =========================

  const api = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  // =========================
  // STATES
  // =========================

  const [mahasiswa, setMahasiswa] = useState([])
  const [jurusan, setJurusan] = useState([])
  const [editId, setEditId] = useState(null)
  const [loading, setLoading] = useState(false)

  const [form, setForm] = useState({
    nama: '',
    umur: '',
    nim: '',
    tgl_lahir: '',
    alamat: '',
    jurusan_id: ''
  })

  // =========================
  // LOAD DATA
  // =========================

  useEffect(() => {

    getMahasiswa()
    getJurusan()

  }, [])

  // =========================
  // GET MAHASISWA
  // =========================

  const getMahasiswa = async () => {

    try {

      setLoading(true)

      const response = await api.get('/mahasiswa')

      setMahasiswa(response.data.data)

    } catch (error) {

      console.log(error)

      alert('Gagal mengambil data mahasiswa')

    } finally {

      setLoading(false)
    }
  }

  // =========================
  // GET JURUSAN
  // =========================

  const getJurusan = async () => {

    try {

      const response = await api.get('/jurusan')

      setJurusan(response.data.data)

    } catch (error) {

      console.log(error)

      alert('Gagal mengambil jurusan')
    }
  }

  // =========================
  // RESET FORM
  // =========================

  const resetForm = () => {

    setForm({
      nama: '',
      umur: '',
      nim: '',
      tgl_lahir: '',
      alamat: '',
      jurusan_id: ''
    })

    setEditId(null)
  }

  // =========================
  // CREATE
  // =========================

  const createMahasiswa = async () => {

    try {

      if (
        !form.nama ||
        !form.umur ||
        !form.nim ||
        !form.tgl_lahir ||
        !form.alamat ||
        !form.jurusan_id
      ) {
        alert('Semua field wajib diisi')
        return
      }

      await api.post('/mahasiswa', form)

      alert('Data berhasil ditambahkan')

      getMahasiswa()

      resetForm()

    } catch (error) {

      console.log(error)

      alert('Gagal tambah data')
    }
  }

  // =========================
  // UPDATE
  // =========================

  const updateMahasiswa = async () => {

    try {

      await api.put(
        `/mahasiswa/${editId}`,
        form
      )

      alert('Data berhasil diupdate')

      getMahasiswa()

      resetForm()

    } catch (error) {

      console.log(error)

      alert('Gagal update data')
    }
  }

  // =========================
  // DELETE
  // =========================

  const deleteMahasiswa = async (id) => {

    const confirmDelete = window.confirm(
      'Yakin ingin menghapus data?'
    )

    if (!confirmDelete) return

    try {

      await api.delete(`/mahasiswa/${id}`)

      alert('Data berhasil dihapus')

      getMahasiswa()

    } catch (error) {

      console.log(error)

      alert('Gagal delete data')
    }
  }

  // =========================
  // EDIT
  // =========================

  const editMahasiswa = (item) => {

    setEditId(item.id)

    setForm({
      nama: item.nama,
      umur: item.umur,
      nim: item.nim,
      tgl_lahir: item.tgl_lahir,
      alamat: item.alamat,
      jurusan_id: item.jurusan_id
    })

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (

    <div className="min-h-screen bg-slate-100">

      {/* NAVBAR */}

      <div className="bg-slate-900 shadow-lg">

        <div className="max-w-7xl mx-auto px-8 py-5 flex justify-between items-center">

          <div>

            <h1 className="text-3xl font-bold text-white">
              Dashboard Mahasiswa
            </h1>

            <p className="text-slate-300 text-sm">
              React • Golang • PostgreSQL
            </p>

          </div>

          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-400 transition-all text-white px-5 py-2 rounded-xl"
          >
            Logout
          </button>

        </div>

      </div>

      {/* CONTENT */}

      <div className="max-w-7xl mx-auto p-8">

        {/* FORM */}

        <div className="bg-white rounded-2xl shadow-md p-8 mb-10">

          <h2 className="text-2xl font-bold mb-6">

            {
              editId
                ? 'Edit Mahasiswa'
                : 'Tambah Mahasiswa'
            }

          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            <input
              type="text"
              placeholder="Nama"
              className="border p-4 rounded-xl"
              value={form.nama}
              onChange={(e) =>
                setForm({
                  ...form,
                  nama: e.target.value
                })
              }
            />

            <input
              type="number"
              placeholder="Umur"
              className="border p-4 rounded-xl"
              value={form.umur}
              onChange={(e) =>
                setForm({
                  ...form,
                  umur: Number(e.target.value)
                })
              }
            />

            <input
              type="text"
              placeholder="NIM"
              className="border p-4 rounded-xl"
              value={form.nim}
              onChange={(e) =>
                setForm({
                  ...form,
                  nim: e.target.value
                })
              }
            />

            <input
              type="date"
              className="border p-4 rounded-xl"
              value={form.tgl_lahir}
              onChange={(e) =>
                setForm({
                  ...form,
                  tgl_lahir: e.target.value
                })
              }
            />

            <textarea
              placeholder="Alamat"
              className="border p-4 rounded-xl md:col-span-2"
              value={form.alamat}
              onChange={(e) =>
                setForm({
                  ...form,
                  alamat: e.target.value
                })
              }
            />

            <select
              className="border p-4 rounded-xl"
              value={form.jurusan_id}
              onChange={(e) =>
                setForm({
                  ...form,
                  jurusan_id: Number(e.target.value)
                })
              }
            >

              <option value="">
                Pilih Jurusan
              </option>

              {
                jurusan.map((item) => (
                  <option
                    key={item.id}
                    value={item.id}
                  >
                    {item.nama_jurusan}
                  </option>
                ))
              }

            </select>

          </div>

          <div className="flex gap-4 mt-8">

            <button
              onClick={resetForm}
              className="bg-gray-500 hover:bg-gray-400 transition-all text-white px-6 py-3 rounded-xl"
            >
              Reset
            </button>

            {
              editId ? (
                <button
                  onClick={updateMahasiswa}
                  className="bg-yellow-500 hover:bg-yellow-400 transition-all text-white px-6 py-3 rounded-xl"
                >
                  Update
                </button>
              ) : (
                <button
                  onClick={createMahasiswa}
                  className="bg-blue-600 hover:bg-blue-500 transition-all text-white px-6 py-3 rounded-xl"
                >
                  Save
                </button>
              )
            }

          </div>

        </div>

        {/* TABLE */}

        <div className="bg-white rounded-2xl shadow-md overflow-hidden">

          <div className="p-6 border-b">

            <h2 className="text-2xl font-bold">
              List Mahasiswa
            </h2>

          </div>

          {
            loading ? (

              <div className="p-10 text-center">
                Loading...
              </div>

            ) : (

              <div className="overflow-x-auto">

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

                      <th className="p-5 text-left">
                        Fakultas
                      </th>

                      <th className="p-5 text-left">
                        Action
                      </th>
                    </tr>

                  </thead>

                  <tbody>

                    {
                      mahasiswa.map((item) => (

                        <tr
                          key={item.id}
                          className="border-b hover:bg-slate-50"
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

                          <td className="p-5">
                            {item.jurusan?.fakultas}
                          </td>

                          <td className="p-5 flex gap-3">

                            <button
                              onClick={() => editMahasiswa(item)}
                              className="bg-yellow-500 hover:bg-yellow-400 transition-all text-white px-4 py-2 rounded-lg"
                            >
                              Edit
                            </button>

                            <button
                              onClick={() => deleteMahasiswa(item.id)}
                              className="bg-red-500 hover:bg-red-400 transition-all text-white px-4 py-2 rounded-lg"
                            >
                              Delete
                            </button>

                          </td>

                        </tr>
                      ))
                    }

                  </tbody>

                </table>

              </div>

            )
          }

        </div>

      </div>

    </div>
  )
}

export default Dashboard