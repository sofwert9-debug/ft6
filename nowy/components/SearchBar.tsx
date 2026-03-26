'use client'

import { useState } from 'react'
import { products } from '@/data/products'

export default function SearchBar() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<typeof products>([])
  const [isOpen, setIsOpen] = useState(false)

  const handleSearch = (value: string) => {
    setQuery(value)
    if (value.length > 0) {
      const filtered = products.filter(p =>
        p.title.toLowerCase().includes(value.toLowerCase())
      )
      setResults(filtered)
      setIsOpen(true)
    } else {
      setIsOpen(false)
    }
  }

  return (
    <div className="hidden md:block relative w-64">
      <input
        type="text"
        placeholder="Поиск плакатов..."
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
      />
      
      {isOpen && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-lg mt-2 shadow-lg max-h-64 overflow-y-auto z-50">
          {results.map((product) => (
            <div
              key={product.id}
              onClick={() => {
                setQuery('')
                setIsOpen(false)
              }}
              className="px-4 py-2 hover:bg-gray-50 cursor-pointer"
            >
              {product.title}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}