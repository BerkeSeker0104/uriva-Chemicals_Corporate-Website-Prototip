import { useState, useEffect } from 'react'
import { useLang, UI } from '../../context/LanguageContext.jsx'
import { db } from '../../admin/store/db.js'
import PageHero from '../../components/ui/PageHero.jsx'
import ProductCard from '../../components/ui/ProductCard.jsx'
import CtaBanner from '../../components/ui/CtaBanner.jsx'

export default function ProductsPage() {
  const { t } = useLang()
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [activeCategory, setActiveCategory] = useState('all')

  useEffect(() => {
    setProducts(db.products.getAll().filter(p => p.active))
    setCategories(db.categories.getAll().filter(c => c.active))
  }, [])

  const filtered = activeCategory === 'all'
    ? products
    : products.filter(p => p.category === activeCategory)

  return (
    <>
      <PageHero
        title={t(UI.products.title)}
        subtitle={t(UI.products.subtitle)}
        breadcrumbs={[{ label: t(UI.nav.products) }]}
      />
      <section className="py-20 px-6" style={{ backgroundColor: '#f8fafc' }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${activeCategory === 'all' ? 'bg-blue-600 text-white shadow-lg' : 'bg-white text-slate-600 border border-slate-200 hover:border-blue-300'}`}
            >
              {t(UI.products.all)}
            </button>
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${activeCategory === cat.id ? 'bg-blue-600 text-white shadow-lg' : 'bg-white text-slate-600 border border-slate-200 hover:border-blue-300'}`}
              >
                {t(cat.name)}
              </button>
            ))}
          </div>
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          ) : (
            <p className="text-center text-slate-400 py-12">{t({ tr: 'Bu kategoride ürün bulunamadı.', en: 'No products found in this category.' })}</p>
          )}
        </div>
      </section>
      <CtaBanner />
    </>
  )
}
