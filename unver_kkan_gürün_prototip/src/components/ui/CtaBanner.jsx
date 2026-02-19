import { Link } from 'react-router-dom'
import { MessageSquare, Headphones } from 'lucide-react'
import { useInView } from '../../hooks/useInView.js'
import { useLang, UI } from '../../context/LanguageContext.jsx'
import { db } from '../../admin/store/db.js'

export default function CtaBanner() {
  const [ref, inView] = useInView()
  const { t } = useLang()
  const s = db.settings.get()

  return (
    <section ref={ref} className="relative py-20 px-6 overflow-hidden" style={{ background: 'linear-gradient(135deg, #2563eb 0%, #1e40af 50%, #1e3a8a 100%)' }}>
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1761312834150-4beefff097a7?w=1920&q=40)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
      <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      <div className={`max-w-4xl mx-auto text-center relative z-10 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t(UI.cta.title)}</h2>
        <p className="text-blue-100 text-base md:text-lg max-w-2xl mx-auto mb-8">{t(UI.cta.desc)}</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/iletisim" className="bg-white text-blue-700 font-bold px-8 py-4 rounded-lg hover:bg-blue-50 transition-all duration-200 hover:shadow-xl inline-flex items-center gap-2">
            <MessageSquare size={18} /> {t(UI.cta.quote)}
          </Link>
          <a href={`tel:${s.phone}`} className="border-2 border-white/30 hover:border-white/60 text-white font-medium px-8 py-4 rounded-lg transition-all inline-flex items-center gap-2">
            <Headphones size={18} /> {s.phone}
          </a>
        </div>
      </div>
    </section>
  )
}
