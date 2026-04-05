import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'

const Users = () => {
  const [users, setUsers] = useState([])
  const { token } = useAuth()

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/admin/users', {
          headers: { Authorization: `Bearer ${token}` }
        })
        setUsers(response.data)
      } catch(err) { console.log(err) }
    }
    fetchdata()
  }, [])

  const handleToggle = async (userId) => {
    try {
      const response = await axios.put(`http://localhost:8080/api/admin/deactivate/${userId}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      })
      if(response.status === 200) {
        setUsers(users.map(u => u._id === userId ? { ...u, isActive: !u.isActive } : u))
      }
    } catch(err) { console.log(err) }
  }

  return (
    <div className="flex min-h-screen" style={{ background: '#080d1a' }}>
      <Sidebar />
      <div className="flex-1 p-8">
        <h2 className="text-2xl font-bold text-white mb-1" style={{ fontFamily: 'Syne' }}>Users</h2>
        <p className="text-slate-500 text-sm mb-8">Manage user access and roles</p>

        <div className="rounded-xl border border-white/5 overflow-hidden" style={{ background: '#0d1425' }}>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5">
                <th className="px-6 py-3 text-left text-xs text-slate-500 font-medium uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs text-slate-500 font-medium uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs text-slate-500 font-medium uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs text-slate-500 font-medium uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs text-slate-500 font-medium uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u._id} className="border-b border-white/5 hover:bg-white/2 transition-colors">
                  <td className="px-6 py-4 text-white font-medium">{u.name}</td>
                  <td className="px-6 py-4 text-slate-400">{u.email}</td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-cyan-500/10 text-cyan-400 capitalize">
                      {u.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      u.isActive ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'
                    }`}>
                      {u.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button onClick={() => handleToggle(u._id)}
                      className={`text-xs px-3 py-1.5 rounded-lg border transition-all ${
                        u.isActive
                          ? 'text-red-400 border-red-500/20 hover:border-red-500/40'
                          : 'text-green-400 border-green-500/20 hover:border-green-500/40'
                      }`}>
                      {u.isActive ? 'Deactivate' : 'Activate'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Users