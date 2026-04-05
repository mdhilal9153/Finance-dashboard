import React, { useState } from 'react'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const AddRecord = () => {
  const { token } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ amount: '', type: 'income', category: '', date: '', notes: '' })

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('http://localhost:8080/api/records/create', form, {
        headers: { Authorization: `Bearer ${token}` }
      })
      navigate('/records')
    } catch(err) { console.log(err) }
  }

  const inputClass = "w-full px-4 py-3 rounded-lg text-sm text-white placeholder-slate-600 outline-none border border-white/8 focus:border-cyan-500/50 transition-colors"
  const labelClass = "text-xs text-slate-400 font-medium block mb-2"

  return (
    <div className="flex min-h-screen" style={{ background: '#080d1a' }}>
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-bold text-white mb-1" style={{ fontFamily: 'Syne' }}>Add Record</h2>
          <p className="text-slate-500 text-sm mb-8">Create a new financial entry</p>

          <div className="rounded-xl border border-white/5 p-8" style={{ background: '#0d1425' }}>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">

              <div>
                <label className={labelClass}>Amount</label>
                <input name="amount" type="number" value={form.amount} onChange={handleChange}
                  placeholder="0.00" required className={inputClass} style={{ background: '#080d1a' }} />
              </div>

              <div>
                <label className={labelClass}>Type</label>
                <select name="type" value={form.type} onChange={handleChange}
                  className={inputClass} style={{ background: '#080d1a' }}>
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
                </select>
              </div>

              <div>
                <label className={labelClass}>Category</label>
                <input name="category" type="text" value={form.category} onChange={handleChange}
                  placeholder="e.g. Salary, Rent" required className={inputClass} style={{ background: '#080d1a' }} />
              </div>

              <div>
                <label className={labelClass}>Date</label>
                <input name="date" type="date" value={form.date} onChange={handleChange}
                  required className={inputClass} style={{ background: '#080d1a' }} />
              </div>

              <div>
                <label className={labelClass}>Notes</label>
                <textarea name="notes" value={form.notes} onChange={handleChange}
                  placeholder="Optional note..." rows={3}
                  className={inputClass} style={{ background: '#080d1a' }} />
              </div>

              <div className="flex gap-3 mt-2">
                <button type="submit"
                  className="flex-1 py-3 rounded-lg text-sm font-semibold text-white transition-all hover:opacity-90"
                  style={{ background: 'linear-gradient(135deg, #06b6d4, #0891b2)' }}>
                  Add Record
                </button>
                <button type="button" onClick={() => navigate('/records')}
                  className="flex-1 py-3 rounded-lg text-sm font-medium text-slate-400 border border-white/8 hover:bg-white/5 transition-all">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddRecord