'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useCartStore } from '@/lib/store'

export default function Checkout() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipcode: '',
  })

  const items = useCartStore((state) => state.items)
  const total = useCartStore((state) => state.getTotal())
  const clearCart = useCartStore((state) => state.clearCart)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (step === 1) {
      setStep(2)
    } else if (step === 2) {
      setStep(3)
      clearCart()
    }
  }

  if (step === 3) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <div className="mb-6">
            <svg className="w-20 h-20 mx-auto text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-4xl font-serif font-bold mb-4">Заказ принят!</h1>
          <p className="text-gray-600 mb-8">
            Спасибо за покупку! Вы получите письмо с подробностями доставки.
          </p>
          <Link
            href="/"
            className="inline-block bg-accent text-white px-8 py-3 rounded-lg hover:bg-blue-600 transition"
          >
            Вернуться на главную
          </Link>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        {/* Steps */}
        <div className="flex justify-between mb-12">
          {[1, 2].map((s) => (
            <div key={s} className={`flex-1 text-center pb-4 border-b-2 ${
              s === step ? 'border-accent text-accent font-bold' : 'border-gray-200 text-gray-600'
            }`}>
              Шаг {s}: {s === 1 ? 'Доставка' : 'Оплата'}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2 bg-white p-8 rounded-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
              {step === 1 && (
                <>
                  <h2 className="text-2xl font-serif font-bold mb-6">Адрес доставки</h2>
                  
                  <input
                    type="text"
                    name="name"
                    placeholder="Полное имя"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                  />

                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                  />

                  <input
                    type="tel"
                    name="phone"
                    placeholder="Телефон"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                  />

                  <input
                    type="text"
                    name="address"
                    placeholder="Адрес"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="city"
                      placeholder="Город"
                      value={formData.city}
                      onChange={handleChange}
                      required
                      className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                    <input
                      type="text"
                      name="zipcode"
                      placeholder="Почтовый индекс"
                      value={formData.zipcode}
                      onChange={handleChange}
                      required
                      className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                  </div>
                </>
              )}

              {step === 2 && (
                <>
                  <h2 className="text-2xl font-serif font-bold mb-6">Способ оплаты</h2>
                  
                  <label className="flex items-center p-4 border-2 border-accent rounded-lg cursor-pointer">
                    <input type="radio" name="payment" defaultChecked className="mr-4" />
                    <div>
                      <p className="font-semibold">Карта</p>
                      <p className="text-sm text-gray-600">Visa, Mastercard</p>
                    </div>
                  </label>

                  <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-gray-300">
                    <input type="radio" name="payment" className="mr-4" />
                    <div>
                      <p className="font-semibold">Банковский перевод</p>
                      <p className="text-sm text-gray-600">Переводом на счёт</p>
                    </div>
                  </label>
                </>
              )}

              <button
                type="submit"
                className="w-full bg-accent text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition"
              >
                {step === 1 ? 'Далее' : 'Подтвердить заказ'}
              </button>
            </form>
          </div>

          {/* Summary */}
          <div className="bg-white p-8 rounded-lg h-fit">
            <h3 className="text-lg font-semibold mb-6">Итоговая сумма</h3>
            
            <div className="space-y-4 mb-6 pb-6 border-b border-gray-200">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-gray-600">{item.title} x{item.quantity}</span>
                  <span className="font-semibold">{item.price * item.quantity} ₽</span>
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-gray-600">
                <span>Доставка</span>
                <span>Бесплатно</span>
              </div>
              <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-200">
                <span>Всего:</span>
                <span className="text-accent">{total} ₽</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}