import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'viewer' })
  const [error, setError] = useState('')

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('http://localhost:8080/api/auth/register', form)
      navigate('/login')
    } catch(err) {
      setError('Registration failed')
    }
  }

  const inputClass = "w-full px-4 py-3 rounded-lg text-sm text-white placeholder-slate-600 outline-none border border-white/8 focus:border-cyan-500/50 transition-colors"
  const labelClass = "text-xs text-slate-400 font-medium block mb-2"

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ background: '#080d1a' }}>

      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-10"
        style={{ background: 'radial-gradient(circle, #22d3ee, transparent)' }} />

      <div className="relative z-10 w-full max-w-sm px-4">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-white" style={{ fontFamily: 'Syne' }}>
            Finance<span className="text-cyan-400">Hub</span>
          </h1>
          <p className="text-slate-500 text-sm mt-2">Create a new account</p>
        </div>

        <div className="rounded-2xl p-8 border border-white/8" style={{ background: '#0d1425' }}>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">

            <div>
              <label className={labelClass}>Name</label>
              <input name="name" type="text" value={form.name} onChange={handleChange}
                placeholder="Your name" required className={inputClass} style={{ background: '#080d1a' }} />
            </div>

            <div>
              <label className={labelClass}>Email</label>
              <input name="email" type="email" value={form.email} onChange={handleChange}
                placeholder="you@company.com" required className={inputClass} style={{ background: '#080d1a' }} />
            </div>

            <div>
              <label className={labelClass}>Password</label>
              <input name="password" type="password" value={form.password} onChange={handleChange}
                placeholder="••••••••" required className={inputClass} style={{ background: '#080d1a' }} />
            </div>

            <div>
              <label className={labelClass}>Role</label>
              <select name="role" value={form.role} onChange={handleChange}
                className={inputClass} style={{ background: '#080d1a' }}>
                <option value="viewer">Viewer</option>
                <option value="analyst">Analyst</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            {error && <p className="text-red-400 text-xs">{error}</p>}

            <button type="submit"
              className="w-full py-3 rounded-lg text-sm font-semibold text-white transition-all hover:opacity-90 mt-2"
              style={{ background: 'linear-gradient(135deg, #06b6d4, #0891b2)' }}>
              Register
            </button>

            <p className="text-center text-xs text-slate-500">
              Already have an account?{' '}
              <span onClick={() => navigate('/login')} className="text-cyan-400 cursor-pointer hover:underline">
                Sign in
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register