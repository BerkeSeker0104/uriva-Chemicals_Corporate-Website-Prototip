import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { FileText, MessageSquare, ChevronRight, Package } from 'lucide-react'
import { useLang, UI } from '../../context/LanguageContext.jsx'
import { db } from '../../admin/store/db.js'
import PageHero from '../../components/ui/PageHero.jsx'
import ProductCard from '../../components/ui/ProductCard.jsx'

export default function ProductDetailPage() {
  const { slug } = useParams()
  const { t } = useLang()
  const [product, setProduct] = useState(null)
  const [category, setCategory] = useState(null)
  const [related, setRelated] = useState([])
  const [activeImage, setActiveImage] = useState('')

  useEffect(() => {
    const all = db.products.getAll()
    const found = all.find(p => p.slug === slug)
    if (found) {
      setProduct(found)
      setActiveImage(found.mainImage)
      const cat = db.categories.getById(found.category)
      setCategory(cat)
      setRelated(all.filter(p => p.id !== found.id && p.category === found.category && p.active).slice(0, 3))
    }
  }, [slug])

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-slate-400">{t({ tr: 'Ürün bulunamadı.', en: 'Product not found.' })}</p>
      </div>
    )
  }

  const gallery = [product.mainImage, ...(product.gallery || [])].filter(Boolean)

  return (
    <>
      <PageHero
        title={t(product.name)}
        subtitle={category ? t(category.name) : ''}
        breadcrumbs={[
          { label: t(UI.nav.products), to: '/urunler' },
          { label: t(product.name) },
        ]}
      />

      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Images */}
            <div>
              <div className="rounded-2xl overflow-hidden bg-slate-50 border border-slate-200 mb-4">
                <img src={activeImage} alt={t(product.name)} className="w-full h-80 lg:h-96 object-cover" />
              </div>
              {gallery.length > 1 && (
                <div className="flex gap-3">
                  {gallery.map((img, i) => (
                    <button key={i} onClick={() => setActiveImage(img)} className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${activeImage === img ? 'border-blue-600' : 'border-slate-200 hover:border-slate-300'}`}>
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Info */}
            <div>
              {product.badge && (
                <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full mb-4 ${product.badge === 'Çok Satan' ? 'bg-amber-50 text-amber-700 border border-amber-200' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'}`}>
                  {product.badge === 'Çok Satan' ? t(UI.products.bestSeller) : t(UI.products.new)}
                </span>
              )}
              <h1 className="text-3xl font-bold text-slate-800 mb-4">{t(product.name)}</h1>
              <p className="text-slate-500 leading-relaxed mb-8">{t(product.detailDesc || product.shortDesc)}</p>

              <div className="bg-slate-50 rounded-xl p-6 mb-8">
                <h3 className="text-slate-800 font-semibold mb-4">{t({ tr: 'Ürün Bilgileri', en: 'Product Info' })}</h3>
                <div className="space-y-3">
                  {product.code && (
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">{t(UI.products.code)}</span>
                      <span className="text-slate-800 font-mono font-medium">{product.code}</span>
                    </div>
                  )}
                  {category && (
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">{t(UI.products.category)}</span>
                      <span className="text-slate-800">{t(category.name)}</span>
                    </div>
                  )}
                  {product.volume && (
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">{t(UI.products.volume)}</span>
                      <span className="text-slate-800">{product.volume}</span>
                    </div>
                  )}
                  {product.tag && (
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">{t({ tr: 'Etiket', en: 'Tag' })}</span>
                      <span className="text-slate-800">{product.tag}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* PDF Downloads */}
              {(product.pdfs?.tds || product.pdfs?.msds) && (
                <div className="mb-8">
                  <h3 className="text-slate-800 font-semibold mb-3">{t(UI.products.techDoc)}</h3>
                  <div className="flex flex-wrap gap-3">
                    {product.pdfs.tds && (
                      <a href={product.pdfs.tds} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium rounded-lg transition-colors">
                        <FileText size={16} /> TDS
                      </a>
                    )}
                    {product.pdfs.msds && (
                      <a href={product.pdfs.msds} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium rounded-lg transition-colors">
                        <FileText size={16} /> MSDS
                      </a>
                    )}
                  </div>
                </div>
              )}

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to={`/iletisim?urun=${encodeURIComponent(t(product.name))}`} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-200 hover:shadow-xl inline-flex items-center justify-center gap-2">
                  <MessageSquare size={18} /> {t(UI.products.requestQuote)}
                </Link>
                <Link to="/urunler" className="border border-slate-200 hover:border-slate-300 text-slate-700 font-medium px-8 py-4 rounded-lg transition-all inline-flex items-center justify-center gap-2">
                  <Package size={18} /> {t(UI.products.catalogCta)}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {related.length > 0 && (
        <section className="py-20 px-6" style={{ backgroundColor: '#f8fafc' }}>
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-800 mb-8">{t(UI.products.relatedProducts)}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {related.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
