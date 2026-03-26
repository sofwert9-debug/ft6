import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Product, CartItem } from './types'

interface Store {
  items: CartItem[]
  favorites: number[]
  
  addItem: (product: Product) => void
  removeItem: (id: number) => void
  updateQuantity: (id: number, quantity: number) => void
  clearCart: () => void
  
  toggleFavorite: (id: number) => void
  
  getTotal: () => number
}

export const useCartStore = create<Store>()(
  persist(
    (set, get) => ({
      items: [],
      favorites: [],

      addItem: (product: Product) => {
        const items = get().items
        const existingItem = items.find(item => item.id === product.id)

        if (existingItem) {
          set({
            items: items.map(item =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          })
        } else {
          set({
            items: [...items, { ...product, quantity: 1 }],
          })
        }
      },

      removeItem: (id: number) => {
        set({
          items: get().items.filter(item => item.id !== id),
        })
      },

      updateQuantity: (id: number, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(id)
          return
        }
        set({
          items: get().items.map(item =>
            item.id === id ? { ...item, quantity } : item
          ),
        })
      },

      clearCart: () => {
        set({ items: [] })
      },

      toggleFavorite: (id: number) => {
        const favorites = get().favorites
        if (favorites.includes(id)) {
          set({
            favorites: favorites.filter(fav => fav !== id),
          })
        } else {
          set({
            favorites: [...favorites, id],
          })
        }
      },

      getTotal: () => {
        return get().items.reduce((total, item) => total + item.price * item.quantity, 0)
      },
    }),
    {
      name: 'foto60-store',
    }
  )
)