'use client'

import { products } from '@/data/products'
import { useCartStore } from '@/lib/store'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Reviews from '@/components/Reviews'

export default function Product({ params }: { params: { id: string } }) {
  const product = products.find(p => p.id === parseInt(params.id))
  const addToCart = useCartStore((state) => state.addItem)
  const toggleFavorite = useCartStore((state) => state.toggleFavorite)
  const favorites = useCartStore((state) => state.favorites)

  if (!product) {
    return <div className="text-center py-20">Товар не найден</div>
  }

  const isFavorite = favorites.includes(product.id)

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative aspect-square rounded-lg overflow-hidden bg-gray-100"
          >
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-cover"
              priority
            />
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col justify-between"
          >
            <div>
              <h1 className="text-4xl font-serif font-bold mb-4">{product.title}</h1>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${i < product.rating ? 'fill-yellow-400' : 'fill-gray-300'}`}
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
                <span className="text-gray-600">({product.reviews} отзывов)</span>
              </div>

              <p className="text-xl text-gray-700 mb-8">{product.description}</p>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between">
                  <span className="text-gray-600">Категория:</span>
                  <span className="font-semibold">{product.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Статус:</span>
                  <span className={product.inStock ? 'text-green-600 font-semibold' : 'text-red-600'}>
                    {product.inStock ? 'В наличии' : 'Нет в наличии'}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center mb-6">
                <span className="text-3xl font-bold">{product.price} ₽</span>
                <button
                  onClick={() => toggleFavorite(product.id)}
                  className={`p-3 rounded-lg transition ${
                    isFavorite
                      ? 'bg-red-100 text-red-600'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <svg
                    className="w-6 h-6 fill-current"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                </button>
              </div>

              <button
                onClick={() => addToCart(product)}
                className="w-full bg-accent text-white py-4 rounded-lg font-semibold text-lg hover:bg-blue-600 transition"
              >
                Добавить в корзину
              </button>

              <button className="w-full border-2 border-gray-300 py-4 rounded-lg font-semibold hover:bg-gray-50 transition">
                Купить сейчас
              </button>
            </div>
          </motion.div>
        </div>

        {/* Reviews */}
        <Reviews />
      </div>
    </div>
  )
}