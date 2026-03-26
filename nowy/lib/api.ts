import axios from 'axios'
import { Product, Order } from './types'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api'

export const api = axios.create({
  baseURL: API_BASE,
})

// Products
export const getProducts = async (): Promise<Product[]> => {
  const { data } = await api.get('/products')
  return data
}

export const getProduct = async (id: number): Promise<Product> => {
  const { data } = await api.get(`/products/${id}`)
  return data
}

// Orders
export const createOrder = async (items: any[], total: number): Promise<Order> => {
  const { data } = await api.post('/orders', { items, total })
  return data
}

export const getOrder = async (id: string): Promise<Order> => {
  const { data } = await api.get(`/orders/${id}`)
  return data
}

// Contact
export const sendContactMessage = async (message: {
  name: string
  email: string
  subject: string
  text: string
}): Promise<{ success: boolean }> => {
  const { data } = await api.post('/contact', message)
  return data
}