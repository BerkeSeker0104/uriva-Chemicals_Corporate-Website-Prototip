import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { useLang, UI } from '../../context/LanguageContext.jsx'

export default function PageHero({ title, subtitle, breadcrumbs = [] }) {
  const { t } = useLang()

  return (
    <section className="relative pt-32 pb-16 px-6 overflow-hidden" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0f172a 100%)' }}>
      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(59,130,246,0.5) 0%, transparent 60%)' }} />
      <div className="max-w-6xl mx-auto relative z-10">
        {breadcrumbs.length > 0 && (
          <nav className="flex items-center gap-2 text-sm text-slate-400 mb-4">
            <Link to="/" className="hover:text-white transition-colors">{t(UI.nav.home)}</Link>
            {breadcrumbs.map((crumb, i) => (
              <span key={i} className="flex items-center gap-2">
                <ChevronRight size={14} />
                {crumb.to ? (
                  <Link to={crumb.to} className="hover:text-white transition-colors">{crumb.label}</Link>
                ) : (
                  <span className="text-white">{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}
        {subtitle && <p className="text-blue-400 text-sm font-semibold tracking-widest uppercase mb-3">{subtitle}</p>}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">{title}</h1>
      </div>
    </section>
  )
}
