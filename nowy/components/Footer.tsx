import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-serif font-bold mb-4">Foto60</h3>
            <p className="text-gray-400">Премиальные плакаты для фотографов</p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Навигация</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/catalog" className="hover:text-white transition">Каталог</Link></li>
              <li><Link href="/about" className="hover:text-white transition">О компании</Link></li>
              <li><Link href="/contact" className="hover:text-white transition">Контакты</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Информация</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="#" className="hover:text-white transition">Условия доставки</Link></li>
              <li><Link href="#" className="hover:text-white transition">Политика конфиденциальности</Link></li>
              <li><Link href="#" className="hover:text-white transition">Возвраты</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Контакты</h4>
            <p className="text-gray-400 mb-2">📧 hello@foto60.com</p>
            <p className="text-gray-400 mb-2">📞 +7 (800) 555-35-35</p>
            <p className="text-gray-400">Москва, Россия</p>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 mt-8 flex justify-between items-center text-gray-400">
          <p>&copy; 2026 Foto60. Все права защищены.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition">Twitter</a>
            <a href="#" className="hover:text-white transition">Instagram</a>
            <a href="#" className="hover:text-white transition">Facebook</a>
          </div>
        </div>
      </div>
    </footer>
  )
}