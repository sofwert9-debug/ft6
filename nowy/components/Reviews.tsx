'use client'

import { motion } from 'framer-motion'

const reviews = [
  {
    id: 1,
    author: 'Александр М.',
    rating: 5,
    text: 'Отличный магазин! Быстрая доставка и высочайшее качество плакатов.',
  },
  {
    id: 2,
    author: 'Елена П.',
    rating: 5,
    text: 'Премиальный дизайн и качество бумаги просто восхитительны!',
  },
  {
    id: 3,
    author: 'Игорь К.',
    rating: 4,
    text: 'Хороший выбор плакатов. Рекомендую для оформления студии.',
  },
]

export default function Reviews() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-4xl font-serif font-bold mb-12 text-center"
        >
          Отзывы покупателей
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-6 rounded-lg shadow-sm"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${i < review.rating ? 'fill-yellow-400' : 'fill-gray-300'}`}
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 mb-4">{review.text}</p>
              <p className="font-semibold text-gray-900">{review.author}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}