import { Link } from 'react-router-dom'
import { ChevronRight, FileText, Package, Droplets, Sparkles, Beaker, FlaskConical, Gauge } from 'lucide-react'
import { useLang, UI } from '../../context/LanguageContext.jsx'

const tagIcons = { Droplets, Sparkles, Beaker, FlaskConical, Gauge }

export default function ProductCard({ product }) {
  const { t } = useLang()
  const badgeLabel = product.badge === 'Çok Satan' ? t(UI.products.bestSeller) : product.badge === 'Yeni' ? t(UI.products.new) : product.badge

  return (
    <div className="product-card bg-white rounded-2xl overflow-hidden border border-slate-100 flex flex-col">
      <div className="relative overflow-hidden h-52 group">
        <img src={product.mainImage || product.img} alt={t(product.name)} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
        <div className="absolute top-4 left-4">
          <span className="inline-flex items-center gap-1.5 bg-white/95 backdrop-blur-sm text-blue-600 text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm">
            {product.tag}
          </span>
        </div>
        {badgeLabel && (
          <div className="absolute top-4 right-4">
            <span className={`text-white text-xs font-bold px-3 py-1 rounded-full ${product.badge === 'Yeni' ? 'bg-emerald-500' : 'bg-blue-600'}`}>
              {badgeLabel}
            </span>
          </div>
        )}
      </div>
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-slate-800 font-bold text-lg">{t(product.name)}</h3>
          <span className="text-slate-400 text-xs font-mono">{product.code}</span>
        </div>
        <p className="text-slate-500 text-sm leading-relaxed flex-1">{t(product.shortDesc || product.desc)}</p>
        <div className="flex items-center gap-2 mt-3 text-xs text-slate-400">
          <Package size={12} />
          <span>{product.volume}</span>
        </div>
        <div className="flex gap-2 mt-5">
          <Link to={`/urunler/${product.slug}`} className="flex-1 inline-flex items-center justify-center gap-2 border-2 border-blue-600 text-blue-600 font-semibold py-2.5 rounded-xl hover:bg-blue-600 hover:text-white transition-all duration-200 text-sm group/btn">
            {t(UI.products.detail)}
            <ChevronRight size={14} className="group-hover/btn:translate-x-0.5 transition-transform" />
          </Link>
          <button className="px-3 py-2.5 border-2 border-slate-200 rounded-xl text-slate-400 hover:border-blue-300 hover:text-blue-600 transition-all" title={t(UI.products.techDoc)}>
            <FileText size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}
