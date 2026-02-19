import { Link } from 'react-router-dom'
import { Home } from 'lucide-react'
import { useLang, UI } from '../../context/LanguageContext.jsx'

export default function NotFoundPage() {
  const { t } = useLang()

  return (
    <section className="min-h-screen flex items-center justify-center px-6" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0f172a 100%)' }}>
      <div className="text-center">
        <p className="text-8xl md:text-9xl font-black text-blue-500/20 select-none">404</p>
        <h1 className="text-3xl md:text-4xl font-bold text-white -mt-6 mb-4">{t(UI.notFound.title)}</h1>
        <p className="text-slate-400 max-w-md mx-auto mb-8">{t(UI.notFound.desc)}</p>
        <Link to="/" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-200 hover:shadow-xl">
          <Home size={18} /> {t(UI.notFound.back)}
        </Link>
      </div>
    </section>
  )
}
