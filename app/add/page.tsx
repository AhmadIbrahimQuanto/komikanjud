'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function AddComic() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: '',
    volume: '',
    creator: '',
    photo: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target
    if (name === 'photo' && files && files[0]) {
      const file = files[0]
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData({
          ...formData,
          [name]: reader.result as string
        })
      }
      reader.readAsDataURL(file)
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/comics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        router.push('/')
      } else {
        const data = await response.json()
        setError(data.error || 'Failed to create comic')
      }
    } catch (error) {
      setError('Failed to create comic')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen">
      <nav className="w-full py-6 px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4 sticky top-0 z-50 backdrop-blur-sm bg-paper border-b-2 border-ink">
        <Link href="/" className="font-serif text-2xl sm:text-3xl font-bold px-4 sm:px-6 py-2 sm:py-3 rounded-lg tracking-wider cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 bg-coral text-white">
          Komikanjud
        </Link>
        <div className="flex flex-wrap justify-center sm:justify-end gap-2 w-full sm:w-auto">
          <Link href="/" className="px-4 py-2 text-sm sm:text-base font-bold rounded-lg transition-all duration-300 border-b-4 border-transparent hover:shadow-md hover:-translate-y-0.5 text-ink hover:bg-coral hover:text-white hover:border-teal">
            Home
          </Link>
          <Link href="/add" className="px-4 py-2 text-sm sm:text-base font-bold rounded-lg transition-all duration-300 border-b-4 border-transparent hover:shadow-md hover:-translate-y-0.5 text-ink hover:bg-coral hover:text-white hover:border-teal">
            Tambah Komik
          </Link>
        </div>
      </nav>

      <main className="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="bg-white rounded-xl shadow-md p-6 sm:p-8 border-l-4 border-teal">
          <h2 className="font-serif text-2xl sm:text-3xl font-light mb-6 text-ink">
            Tambah Komik Baru
          </h2>

          {error && (
            <div className="text-red-600 text-sm sm:text-base mt-3 font-semibold mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:gap-6">
            <div>
              <label className="font-bold text-sm sm:text-base uppercase tracking-wide mt-2 text-muted block mb-2">
                Foto Komik
              </label>
              <input
                type="file"
                name="photo"
                onChange={handleChange}
                required
                accept="image/*"
                className="w-full px-4 py-3 rounded-t-lg text-sm sm:text-base transition-all duration-200 focus:outline-none focus:shadow-md border-2 border-ink border-b-2 border-ink bg-[#f7f3eb] text-ink focus:bg-white focus:border-teal"
              />
            </div>

            <div>
              <label className="font-bold text-sm sm:text-base uppercase tracking-wide mt-2 text-muted block mb-2">
                Judul Komik
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-t-lg text-sm sm:text-base transition-all duration-200 focus:outline-none focus:shadow-md border-2 border-ink border-b-2 border-ink bg-[#f7f3eb] text-ink focus:bg-white focus:border-teal"
                placeholder="Masukkan judul komik"
              />
            </div>

            <div>
              <label className="font-bold text-sm sm:text-base uppercase tracking-wide mt-2 text-muted block mb-2">
                Volume
              </label>
              <input
                type="text"
                name="volume"
                value={formData.volume}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-t-lg text-sm sm:text-base transition-all duration-200 focus:outline-none focus:shadow-md border-2 border-ink border-b-2 border-ink bg-[#f7f3eb] text-ink focus:bg-white focus:border-teal"
                placeholder="Contoh: Vol. 1, Chapter 1"
              />
            </div>

            <div>
              <label className="font-bold text-sm sm:text-base uppercase tracking-wide mt-2 text-muted block mb-2">
                Pencipta
              </label>
              <input
                type="text"
                name="creator"
                value={formData.creator}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-t-lg text-sm sm:text-base transition-all duration-200 focus:outline-none focus:shadow-md border-2 border-ink border-b-2 border-ink bg-[#f7f3eb] text-ink focus:bg-white focus:border-teal"
                placeholder="Nama penulis atau ilustrator"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <button
                type="submit"
                disabled={loading}
                className="px-6 sm:px-8 py-3 sm:py-4 rounded-lg border-none font-bold transition-all duration-300 ease-in-out cursor-pointer shadow-lg bg-coral text-white hover:-translate-y-1 hover:shadow-xl disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? 'Menyimpan...' : 'Simpan Komik'}
              </button>
              <Link
                href="/"
                className="px-6 sm:px-8 py-3 sm:py-4 rounded-lg border-none font-bold transition-all duration-300 ease-in-out cursor-pointer shadow-lg bg-transparent border-2 text-ink border-ink hover:bg-ink hover:text-white text-center"
              >
                Batal
              </Link>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}
