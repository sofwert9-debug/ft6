'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useCartStore } from '@/lib/store'
import SearchBar from './SearchBar'

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const cartItems = useCartStore((state) => state.items)

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="text-2xl font-serif font-bold text-black">
              Foto60
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/catalog" className="text-gray-700 hover:text-black transition">
              Каталог
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-black transition">
              О нас
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-black transition">
              Контакты
            </Link>
          </div>

          {/* Search Bar */}
          <SearchBar />

          {/* Cart */}
          <Link href="/cart" className="flex items-center gap-2 hover:text-accent transition">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {cartItems.length > 0 && (
              <span className="bg-accent text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {cartItems.length}
              </span>
            )}
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link href="/catalog" className="block py-2 text-gray-700 hover:text-black">
              Каталог
            </Link>
            <Link href="/about" className="block py-2 text-gray-700 hover:text-black">
              О нас
            </Link>
            <Link href="/contact" className="block py-2 text-gray-700 hover:text-black">
              Контакты
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}