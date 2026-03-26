import Hero from '@/components/Hero'
import Categories from '@/components/Categories'
import Products from '@/components/Products'
import Promotions from '@/components/Promotions'

export default function Home() {
  return (
    <>
      <Hero />
      <Promotions />
      <Categories />
      <Products />
    </>
  )
}