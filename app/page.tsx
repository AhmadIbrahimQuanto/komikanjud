'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface Comic {
  id: number
  title: string
  volume: string
  creator: string
  photo: string
  createdAt: string
  updatedAt: string
}

export default function Home() {
  const [comics, setComics] = useState<Comic[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchComics()
  }, [])

  const fetchComics = async () => {
    try {
      const response = await fetch('/api/comics')
      const data = await response.json()
      setComics(data)
    } catch (error) {
      console.error('Failed to fetch comics:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this comic?')) return

    try {
      const response = await fetch(`/api/comics/${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        setComics(comics.filter(comic => comic.id !== id))
      }
    } catch (error) {
      console.error('Failed to delete comic:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted">Loading...</p>
      </div>
    )
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

      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="mb-8">
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-ink mb-2">
            Koleksi Komik
          </h1>
          <p className="text-sm sm:text-base text-muted mt-2">
            Kelola koleksi buku komik Anda dengan mudah
          </p>
        </div>

        {comics.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-6 sm:p-8 text-center">
            <p className="text-muted text-lg">Belum ada komik dalam koleksi</p>
            <Link
              href="/add"
              className="inline-block mt-4 px-6 sm:px-8 py-3 sm:py-4 rounded-lg border-none font-bold transition-all duration-300 ease-in-out cursor-pointer shadow-lg bg-coral text-white hover:-translate-y-1 hover:shadow-xl"
            >
              Tambah Komik Pertama
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="flex justify-between items-center px-4 sm:px-6 py-4 border-b border-line">
              <strong className="font-bold text-lg sm:text-xl text-teal">Daftar Komik</strong>
              <Link
                href="/add"
                className="px-6 sm:px-8 py-3 sm:py-4 rounded-lg border-none font-bold transition-all duration-300 ease-in-out cursor-pointer shadow-lg bg-coral text-white hover:-translate-y-1 hover:shadow-xl"
              >
                + Tambah
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="font-bold text-xs sm:text-sm uppercase tracking-wider px-4 sm:px-6 py-3 text-left text-muted border-b border-line">
                      Foto
                    </th>
                    <th className="font-bold text-xs sm:text-sm uppercase tracking-wider px-4 sm:px-6 py-3 text-left text-muted border-b border-line">
                      Judul
                    </th>
                    <th className="font-bold text-xs sm:text-sm uppercase tracking-wider px-4 sm:px-6 py-3 text-left text-muted border-b border-line">
                      Volume
                    </th>
                    <th className="font-bold text-xs sm:text-sm uppercase tracking-wider px-4 sm:px-6 py-3 text-left text-muted border-b border-line">
                      Pencipta
                    </th>
                    <th className="font-bold text-xs sm:text-sm uppercase tracking-wider px-4 sm:px-6 py-3 text-left text-muted border-b border-line">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comics.map((comic) => (
                    <tr key={comic.id} className="hover:bg-gray-50 transition-colors duration-200">
                      <td className="px-4 sm:px-6 py-4 text-sm sm:text-base border-b border-line">
                        <img
                          src={comic.photo}
                          alt={comic.title}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                      </td>
                      <td className="px-4 sm:px-6 py-4 text-sm sm:text-base border-b border-line font-bold text-coral">
                        {comic.title}
                      </td>
                      <td className="px-4 sm:px-6 py-4 text-sm sm:text-base border-b border-line">
                        {comic.volume}
                      </td>
                      <td className="px-4 sm:px-6 py-4 text-sm sm:text-base border-b border-line">
                        {comic.creator}
                      </td>
                      <td className="px-4 sm:px-6 py-4 text-sm sm:text-base border-b border-line">
                        <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center">
                          <Link
                            href={`/edit/${comic.id}`}
                            className="font-bold underline transition-colors duration-200 text-teal hover:text-coral hover:no-underline"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => handleDelete(comic.id)}
                            className="px-3 py-2 text-xs sm:text-sm bg-transparent border-2 text-coral border-coral hover:bg-coral hover:text-white transition-all duration-300"
                          >
                            Hapus
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
