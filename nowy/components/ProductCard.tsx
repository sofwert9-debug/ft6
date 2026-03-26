'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useCartStore } from '@/lib/store'
import { Product } from '@/lib/types'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const addToCart = useCartStore((state) => state.addItem)
  const favorites = useCartStore((state) => state.favorites)
  const toggleFavorite = useCartStore((state) => state.toggleFavorite)

  const isFavorite = favorites.includes(product.id)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
      className="group"
    >
      <Link href={`/product/${product.id}`}>
        <div className="relative overflow-hidden rounded-lg bg-gray-100 aspect-square mb-4 cursor-pointer">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-cover group-hover:scale-110 transition duration-300"
          />
          <button
            onClick={(e) => {
              e.preventDefault()
              toggleFavorite(product.id)
            }}
            className="absolute top-4 right-4 bg-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition"
          >
            <svg
              className={`w-6 h-6 ${isFavorite ? 'fill-accent text-accent' : 'text-gray-400'}`}
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>
        </div>
      </Link>

      <h3 className="font-semibold text-lg mb-2 line-clamp-2">{product.title}</h3>
      
      <div className="flex items-center gap-2 mb-4">
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className={`w-4 h-4 ${i < product.rating ? 'fill-yellow-400' : 'fill-gray-300'}`}
              viewBox="0 0 24 24"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          ))}
        </div>
        <span className="text-sm text-gray-600">({product.reviews} отзывов)</span>
      </div>

      <div className="flex justify-between items-center">
        <span className="text-2xl font-bold">{product.price} ₽</span>
        <button
          onClick={() => addToCart(product)}
          className="bg-accent text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          В корзину
        </button>
      </div>
    </motion.div>
  )
}