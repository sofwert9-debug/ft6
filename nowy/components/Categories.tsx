'use client'

import { motion } from 'framer-motion'

const categories = [
  { id: 1, name: 'Портреты', icon: '👤', color: 'bg-blue-50' },
  { id: 2, name: 'Пейзажи', icon: '🏔️', color: 'bg-green-50' },
  { id: 3, name: 'Архитектура', icon: '🏢', color: 'bg-gray-50' },
  { id: 4, name: 'Макро', icon: '🔬', color: 'bg-purple-50' },
  { id: 5, name: 'Уличная фото', icon: '🚶', color: 'bg-yellow-50' },
  { id: 6, name: 'Натюрморт', icon: '🎨', color: 'bg-red-50' },
]

export default function Categories() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-serif font-bold mb-12 text-center"
        >
          Категории плакатов
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className={`${category.color} p-6 rounded-lg cursor-pointer transition text-center`}
            >
              <div className="text-4xl mb-3">{category.icon}</div>
              <p className="font-semibold text-gray-800">{category.name}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}