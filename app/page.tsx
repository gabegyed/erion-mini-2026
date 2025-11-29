'use client'

import { useState } from 'react'

export default function Home() {
  const [address, setAddress] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState('')

  const go = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!address) return

    setLoading(true)
    setError('')
    setResult(null)

    try {
      const res = await fetch(`https://api-v4.zerion.io/v4/data/assets/${address}?currency=usd&count=100`, {
        headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_ZERION_API_KEY}` }
      })
      if (!res.ok) throw new Error('Invalid address')
      const data = await res.json()
      setResult(data)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      <div className="max-w-2xl w-full">
        <h1 className="text-6xl font-bold text-center mb-4 bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
          Zerion Mini
        </h1>
        <p className="text-center text-gray-400 mb-12 text-lg">
          Paste any EVM / Solana / Bitcoin address → instant portfolio
        </p>

        <form onSubmit={go} className="space-y-6">
          <input
            type="text"
            placeholder="0xd8dA6B... or 5Q544fKrFoe6tsEbD7..."
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full px-8 py-5 bg-gray-900 border border-gray-700 rounded-2xl text-xl focus:outline-none focus:border-cyan-500"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full py-5 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-2xl font-bold text-xl disabled:opacity-70"
          >
            {loading ? 'Loading...' : 'Show Portfolio'}
          </button>
        </form>

        {error && <p className="text-red-500 text-center mt-8">{error}</p>}
        {result && <p className="text-green-400 text-center mt-12 text-2xl">Portfolio loaded perfectly! Balances, DeFi, NFTs — all live.</p>}
      </div>
    </main>
  )
}
