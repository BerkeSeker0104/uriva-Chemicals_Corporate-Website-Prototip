import { useLang, UI } from '../../context/LanguageContext.jsx'
import { db } from '../../admin/store/db.js'

export default function Partners() {
  const { t } = useLang()
  const brands = db.brands.getAll().filter(b => b.active).map(b => b.name)

  return (
    <section className="bg-white py-10 border-b border-slate-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-6">
        <p className="text-slate-400 text-xs font-semibold tracking-widest uppercase text-center">
          {t(UI.partners.title)}
        </p>
      </div>
      <div className="relative">
        <div className="marquee-track flex items-center gap-16 whitespace-nowrap">
          {[...brands, ...brands].map((name, i) => (
            <span key={i} className="text-slate-300 font-bold text-xl tracking-wide select-none flex-shrink-0 px-4">
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
