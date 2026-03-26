'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the data to your backend
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ name: '', email: '', subject: '', message: '' })
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-2xl mx-auto px-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-serif font-bold mb-4 text-center"
        >
          Свяжитесь с нами
        </motion.h1>

        <p className="text-center text-gray-600 mb-12">
          У вас есть вопросы? Мы всегда готовы помочь!
        </p>

        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-lg shadow-sm space-y-6"
        >
          <div>
            <label className="block text-sm font-semibold mb-2">Ваше имя</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Тема</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Сообщение</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={6}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-accent text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition"
          >
            Отправить сообщение
          </button>

          {submitted && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-800 text-center"
            >
              ✓ Спасибо! Ваше сообщение отправлено. Мы свяжемся с вами вскоре.
            </motion.div>
          )}
        </motion.form>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-3xl mb-2">📧</div>
            <p className="font-semibold">Email</p>
            <p className="text-gray-600">hello@foto60.com</p>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-2">📞</div>
            <p className="font-semibold">Телефон</p>
            <p className="text-gray-600">+7 (800) 555-35-35</p>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-2">📍</div>
            <p className="font-semibold">Адрес</p>
            <p className="text-gray-600">Москва, Россия</p>
          </div>
        </div>
      </div>
    </div>
  )
}