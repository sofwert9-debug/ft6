'use client'

import { useState } from 'react'
import Products from '@/components/Products'
import FilterBar from '@/components/FilterBar'

export default function Catalog() {
  const [filters, setFilters] = useState({ minPrice: 0, maxPrice: 5000 })

  return (
    <div className="min-h-screen bg-white pt-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-serif font-bold mb-8">Каталог плакатов</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <FilterBar
              onPriceChange={(min, max) => setFilters({ minPrice: min, maxPrice: max })}
            />
          </div>
          <div className="lg:col-span-3">
            <Products />
          </div>
        </div>
      </div>
    </div>
  )
}