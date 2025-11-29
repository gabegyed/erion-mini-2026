'use client'

import { useState } from 'react'

export default function Home() {
  const [address, setAddress] = useState('')
  const [loading, setLoading] = useState(false)

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center p-8">
      <div className="max-w-2xl w-full text-center">
        <h1 className="text-6xl font-black mb-6 bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
          Zerion Mini
        </h1>
        <p className="text-xl text-gray-300 mb-12">
          Paste any wallet address (EVM • Solana • Bitcoin)
        </p>

        <form
          onSubmit={async (e) => {
            e.preventDefault()
            if (!address) return
            setLoading(true)
            window.location.href = `https://zerion.io/wallet/${address}`
          }}
          className="space-y-6"
        >
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value.trim())}
            placeholder="0xd8dA6BF2… or 5Q544fKrFoe6tsEbD7…"
            className="w-full px-8 py-6 text-2xl bg-gray-900 rounded-2xl border border-gray-800 focus:border-cyan-500 focus:outline-none"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !address}
            className="w-full py-6 text-2xl font-bold bg-gradient-to-r from-cyan-500 to-purple-600 rounded-2xl disabled:opacity-50"
          >
            {loading ? 'Loading…' : 'Show Portfolio →'}
          </button>
        </form>

        <p className="mt-12 text-gray-500">
          Built in one evening with Zerion API • 100 % free • no signup
        </p>
      </div>
    </main>
  )
}
      </div>
    </main>
  )
}
