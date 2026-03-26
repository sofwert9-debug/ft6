'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import ProductCard from './ProductCard'
import { products } from '@/data/products'

export default function Products() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const filtered = selectedCategory === 'all'
    ? products
    : products.filter(p => p.category === selectedCategory)

  const categories = ['all', ...new Set(products.map(p => p.category))]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl font-serif font-bold mb-8 text-center"
        >
          Популярные плакаты
        </motion.h2>

        {/* Category Filter */}
        <div className="flex gap-4 mb-12 justify-center flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-2 rounded-full transition ${
                selectedCategory === cat
                  ? 'bg-accent text-white'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              {cat === 'all' ? 'Все' : cat}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}