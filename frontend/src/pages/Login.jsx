import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [error, setError] = useState('')

  const submitHandler = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await login(email, pass)
      navigate('/dashboard')
    } catch(err) {
      setError('Invalid credentials')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ background: '#080d1a' }}>

      {/* Background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-10"
        style={{ background: 'radial-gradient(circle, #22d3ee, transparent)' }} />

      <div className="relative z-10 w-full max-w-sm px-4">
        {/* Logo */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-white" style={{ fontFamily: 'Syne' }}>
            Finance<span className="text-cyan-400">Hub</span>
          </h1>
          <p className="text-slate-500 text-sm mt-2">Sign in to your dashboard</p>
        </div>

        {/* Card */}
        <div className="rounded-2xl p-8 border border-white/8"
          style={{ background: '#0d1425' }}>

          <form onSubmit={submitHandler} className="flex flex-col gap-5">
            <div>
              <label className="text-xs text-slate-400 font-medium block mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@company.com"
                required
                className="w-full px-4 py-3 rounded-lg text-sm text-white placeholder-slate-600 outline-none border border-white/8 focus:border-cyan-500/50 transition-colors"
                style={{ background: '#080d1a' }}
              />
            </div>

            <div>
              <label className="text-xs text-slate-400 font-medium block mb-2">Password</label>
              <input
                type="password"
                value={pass}
                onChange={e => setPass(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full px-4 py-3 rounded-lg text-sm text-white placeholder-slate-600 outline-none border border-white/8 focus:border-cyan-500/50 transition-colors"
                style={{ background: '#080d1a' }}
              />
            </div>

            {error && <p className="text-red-400 text-xs">{error}</p>}

            <button type="submit"
              className="w-full py-3 rounded-lg text-sm font-semibold text-white transition-all hover:opacity-90 mt-2"
              style={{ background: 'linear-gradient(135deg, #06b6d4, #0891b2)' }}>
              Sign In
            </button>

            <p className="text-center text-xs text-slate-500 mt-4">No account?{' '}
                <span onClick={() => navigate('/register')} className="text-cyan-400 cursor-pointer hover:underline">
                    Register
                </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login