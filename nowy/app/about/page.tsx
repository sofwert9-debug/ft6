'use client'

import { motion } from 'framer-motion'

export default function About() {
  return (
    <div className="min-h-screen bg-white py-16">
      <div className="max-w-4xl mx-auto px-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-serif font-bold mb-8"
        >
          О компании Foto60
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="prose prose-lg max-w-none"
        >
          <p className="text-xl text-gray-600 mb-8">
            Foto60 — это премиальный онлайн-магазин, посвящённый фотографии и искусству визуализации. Мы создаём плакаты для профессиональных фотографов и любителей, которые ценят качество и минималистичный дизайн.
          </p>

          <h2 className="text-3xl font-serif font-bold mt-12 mb-6">Наша миссия</h2>
          <p className="text-lg text-gray-700 mb-8">
            Помочь каждому фотографу найти идеальный плакат, который будет вдохновлять и мотивировать. Мы верим, что каждый кадр имеет право на своё место на стене профессионального фотографа.
          </p>

          <h2 className="text-3xl font-serif font-bold mt-12 mb-6">Преимущества Foto60</h2>
          <ul className="space-y-4 text-lg text-gray-700">
            <li>✓ Премиальное качество печати и материалов</li>
            <li>✓ Минималистичный, современный дизайн</li>
            <li>✓ Быстрая доставка по всей России</li>
            <li>✓ Гарантия качества на все товары</li>
            <li>✓ Поддержка профессиональных фотографов</li>
          </ul>

          <h2 className="text-3xl font-serif font-bold mt-12 mb-6">Свяжитесь с нами</h2>
          <p className="text-lg text-gray-700">
            📧 Email: hello@foto60.com<br />
            📞 Телефон: +7 (800) 555-35-35<br />
            📍 Москва, Россия
          </p>
        </motion.div>
      </div>
    </div>
  )
}