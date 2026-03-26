'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useCartStore } from '@/lib/store'
import { motion } from 'framer-motion'

export default function Cart() {
  const items = useCartStore((state) => state.items)
  const removeItem = useCartStore((state) => state.removeItem)
  const updateQuantity = useCartStore((state) => state.updateQuantity)
  const total = useCartStore((state) => state.getTotal())

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-serif font-bold mb-4">Корзина пуста</h1>
          <p className="text-gray-600 mb-8">Добавьте плакаты, чтобы начать покупки</p>
          <Link
            href="/catalog"
            className="inline-block bg-accent text-white px-8 py-3 rounded-lg hover:bg-blue-600 transition"
          >
            Перейти в каталог
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-serif font-bold mb-8">Корзина покупок</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg flex gap-6"
              >
                <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                  <p className="text-gray-600 mb-4">{item.price} ₽ за шт.</p>
                  
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      −
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="text-right">
                  <p className="font-bold text-lg mb-4">{item.price * item.quantity} ₽</p>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-600 hover:text-red-800 transition"
                  >
                    Удалить
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white p-8 rounded-lg h-fit sticky top-20"
          >
            <h2 className="text-xl font-semibold mb-6">Итого</h2>
            
            <div className="space-y-4 mb-6 pb-6 border-b border-gray-200">
              <div className="flex justify-between text-gray-600">
                <span>Товаров ({items.length})</span>
                <span>{total} ₽</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Доставка</span>
                <span className="text-green-600">Бесплатно</span>
              </div>
            </div>

            <div className="flex justify-between font-bold text-lg mb-8">
              <span>К оплате:</span>
              <span>{total} ₽</span>
            </div>

            <Link
              href="/checkout"
              className="block w-full bg-accent text-white text-center py-3 rounded-lg font-semibold hover:bg-blue-600 transition mb-3"
            >
              Оформить заказ
            </Link>

            <Link
              href="/catalog"
              className="block w-full border-2 border-gray-300 text-center py-3 rounded-lg font-semibold hover:bg-gray-50 transition"
            >
              Продолжить покупки
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  )
}