'use client'

import { motion } from 'framer-motion'

const promotions = [
  {
    id: 1,
    title: 'Скидка -30%',
    description: 'На все плакаты премиум категории',
    code: 'PREMIUM30',
  },
  {
    id: 2,
    title: 'Бесплатная доставка',
    description: 'При заказе от 3000 рублей',
    code: 'FREE3000',
  },
  {
    id: 3,
    title: 'Комбо набор',
    description: 'Купи 3 плаката - получи 4-й в подарок',
    code: 'COMBO4',
  },
]

export default function Promotions() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {promotions.map((promo, index) => (
            <motion.div
              key={promo.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gradient-to-br from-accent to-blue-600 text-white p-8 rounded-lg cursor-pointer hover:shadow-xl transition"
            >
              <h3 className="text-2xl font-bold mb-2">{promo.title}</h3>
              <p className="text-blue-100 mb-4">{promo.description}</p>
              <p className="text-sm font-mono bg-white bg-opacity-20 inline-block px-3 py-1 rounded">
                Код: {promo.code}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}