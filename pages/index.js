import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('')
  const router = useRouter()

  const handleSearch = (e) => {
    e.preventDefault()
    router.push(`/search?query=${encodeURIComponent(searchTerm)}`)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <nav className="absolute top-0 left-0 right-0 p-4 flex justify-end space-x-4">
        <Link href="https://girmantech.com" className="text-blue-600 hover:text-blue-800">
          Website
        </Link>
        <Link href="https://www.linkedin.com/company/girman-technologies" className="text-blue-600 hover:text-blue-800">
          LinkedIn
        </Link>
        <a href="mailto:contact@girmantech.com" className="text-blue-600 hover:text-blue-800">Contact</a>
      </nav>
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-8">Girman Technologies</h1>
        <form onSubmit={handleSearch} className="flex items-center">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search..."
            className="px-4 py-2 w-64 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
            Search
          </button>
        </form>
      </div>
    </div>
  )
}