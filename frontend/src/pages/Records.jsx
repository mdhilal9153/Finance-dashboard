import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const Records = () => {
  const [records, setRecords] = useState([])
  const { user,token } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const allrecords = await axios.get('http://localhost:8080/api/records/allrecords', {
          headers: { Authorization: `Bearer ${token}` }
        })
        setRecords(allrecords.data)
      } catch(err) { console.log(err) }
    }
    fetchdata()
  }, [])

  const deleteHandler = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8080/api/records/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      if(response.status === 200) {
        setRecords(records.filter(e => e._id !== id))
      }
    } catch(err) { console.log(err) }
  }

  return (
    <div className="flex min-h-screen" style={{ background: '#080d1a' }}>
      <Sidebar />
      <div className="flex-1 p-8">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white mb-1" style={{ fontFamily: 'Syne' }}>Records</h2>
            <p className="text-slate-500 text-sm">All financial entries</p>
          </div>
          {user?.role === 'admin' && (<button onClick={() => navigate('/create')}
          className="px-4 py-2.5 rounded-lg text-sm font-semibold text-white transition-all hover:opacity-90"
          style={{ background: 'linear-gradient(135deg, #06b6d4, #0891b2)' }}>+ Add Record
          </button>
)}
        </div>

        <div className="rounded-xl border border-white/5 overflow-hidden" style={{ background: '#0d1425' }}>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5">
                <th className="px-6 py-3 text-left text-xs text-slate-500 font-medium uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs text-slate-500 font-medium uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs text-slate-500 font-medium uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs text-slate-500 font-medium uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs text-slate-500 font-medium uppercase tracking-wider">Notes</th>
                <th className="px-6 py-3 text-left text-xs text-slate-500 font-medium uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {records.map(r => (
                <tr key={r._id} className="border-b border-white/5 hover:bg-white/2 transition-colors">
                  <td className="px-6 py-4 text-slate-400">{new Date(r.date).toLocaleDateString()}</td>
                  <td className="px-6 py-4 text-white">{r.category}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      r.type === 'income' ? 'bg-cyan-500/10 text-cyan-400' : 'bg-red-500/10 text-red-400'
                    }`}>{r.type}</span>
                  </td>
                  <td className={`px-6 py-4 font-semibold ${r.type === 'income' ? 'text-cyan-400' : 'text-red-400'}`}>
                    ₹{r.amount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-slate-500">{r.notes}</td>
                  <td className="px-6 py-4">
                    <button onClick={() => deleteHandler(r._id)}
                      className="text-xs text-red-400 hover:text-red-300 border border-red-500/20 hover:border-red-500/40 px-3 py-1.5 rounded-lg transition-all">
                      Delete
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

export default Records