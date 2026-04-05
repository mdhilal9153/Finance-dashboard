import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Sidebar from '../components/Sidebar'
import { useAuth } from '../context/AuthContext'

const Card = ({ label, value, color }) => (
  <div className="rounded-xl p-6 border border-white/5" style={{ background: '#0d1425' }}>
    <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-3">{label}</p>
    <p className={`text-3xl font-bold ${color}`} style={{ fontFamily: 'Syne' }}>₹{value.toLocaleString()}</p>
  </div>
)

const Dashboard = () => {
  const { token } = useAuth()
  const [summaryData, setSummaryData] = useState({ totalIncome: 0, totalExpenses: 0, netBalance: 0 })
  const [recentTransactions, setRecentTransactions] = useState([])
  const [categories, setCategories] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const summaryRes = await axios.get(`${import.meta.env.VITE_API_URL}/api/dashboard/summary`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        setSummaryData(summaryRes.data)

        const recentRes = await axios.get(`${import.meta.env.VITE_API_URL}/api/dashboard/recent`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        setRecentTransactions(recentRes.data)

        const categoriesRes = await axios.get(`${import.meta.env.VITE_API_URL}/api/dashboard/categories`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        setCategories(categoriesRes.data)

      } catch(err) {
        console.log(err)
      }
    }
    fetchData()
  }, [])

  return (
    <div className="flex min-h-screen" style={{ background: '#080d1a' }}>
      <Sidebar />
      <div className="flex-1 p-8">
        <h2 className="text-2xl font-bold text-white mb-1" style={{ fontFamily: 'Syne' }}>Overview</h2>
        <p className="text-slate-500 text-sm mb-8">Your financial summary</p>

        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <Card label="Total Income" value={summaryData.totalIncome} color="text-cyan-400" />
          <Card label="Total Expenses" value={summaryData.totalExpenses} color="text-red-400" />
          <Card label="Net Balance" value={summaryData.netBalance} color="text-white" />
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Recent Transactions - takes 2 cols */}
          <div className="col-span-2 rounded-xl border border-white/5 overflow-hidden" style={{ background: '#0d1425' }}>
            <div className="px-6 py-4 border-b border-white/5">
              <h3 className="text-sm font-semibold text-white" style={{ fontFamily: 'Syne' }}>Recent Transactions</h3>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="px-6 py-3 text-left text-xs text-slate-500 font-medium uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs text-slate-500 font-medium uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs text-slate-500 font-medium uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs text-slate-500 font-medium uppercase tracking-wider">Amount</th>
                </tr>
              </thead>
              <tbody>
                {recentTransactions.map(t => (
                  <tr key={t._id} className="border-b border-white/5 hover:bg-white/2 transition-colors">
                    <td className="px-6 py-4 text-slate-400">{new Date(t.date).toLocaleDateString()}</td>
                    <td className="px-6 py-4 text-white">{t.category}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        t.type === 'income' ? 'bg-cyan-500/10 text-cyan-400' : 'bg-red-500/10 text-red-400'
                      }`}>{t.type}</span>
                    </td>
                    <td className={`px-6 py-4 font-semibold ${t.type === 'income' ? 'text-cyan-400' : 'text-red-400'}`}>
                      ₹{t.amount.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Category Breakdown - takes 1 col */}
          <div className="rounded-xl border border-white/5 overflow-hidden" style={{ background: '#0d1425' }}>
            <div className="px-6 py-4 border-b border-white/5">
              <h3 className="text-sm font-semibold text-white" style={{ fontFamily: 'Syne' }}>By Category</h3>
            </div>
            <div className="p-4 flex flex-col gap-2">
              {categories.map(c => (
                <div key={c._id} className="flex items-center justify-between px-4 py-3 rounded-lg border border-white/5 hover:border-cyan-500/20 transition-all"
                  style={{ background: '#080d1a' }}>
                  <span className="text-xs text-slate-300">{c._id}</span>
                  <span className="text-xs font-semibold text-cyan-400">₹{c.total.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard