'use client'

import { useState } from 'react'

interface FilterBarProps {
  onPriceChange?: (min: number, max: number) => void
  onCategoryChange?: (category: string) => void
}

export default function FilterBar({ onPriceChange, onCategoryChange }: FilterBarProps) {
  const [priceRange, setPriceRange] = useState([500, 5000])

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <h3 className="text-lg font-semibold mb-6">Фильтры</h3>

      {/* Price Range */}
      <div className="mb-8">
        <label className="block text-sm font-medium mb-4">Цена</label>
        <div className="space-y-4">
          <input
            type="range"
            min={500}
            max={5000}
            value={priceRange[0]}
            onChange={(e) => {
              const newRange = [parseInt(e.target.value), priceRange[1]]
              setPriceRange(newRange)
              onPriceChange?.(newRange[0], newRange[1])
            }}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-gray-600">
            <span>{priceRange[0]} ₽</span>
            <span>{priceRange[1]} ₽</span>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="mb-8">
        <label className="block text-sm font-medium mb-4">Категория</label>
        <div className="space-y-2">
          {['Портреты', 'Пейзажи', 'Архитектура', 'Макро'].map((cat) => (
            <label key={cat} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                onChange={() => onCategoryChange?.(cat)}
                className="w-4 h-4 border border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700">{cat}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  )
}