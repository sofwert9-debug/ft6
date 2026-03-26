import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Foto60 - Современные плакаты и постеры для фотографов',
  description: 'Онлайн-магазин стильных плакатов для фотографов. Премиальный дизайн, быстрая доставка.',
  keywords: 'плакаты, постеры, фото, дизайн, интерьер',
  openGraph: {
    title: 'Foto60 - Поймай момент',
    description: 'Современные плакаты для профессионалов',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body className="bg-white text-black font-sans">
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}