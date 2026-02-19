import { Star, Quote } from 'lucide-react'
import { useInView } from '../../hooks/useInView.js'
import { useLang, UI } from '../../context/LanguageContext.jsx'

const testimonials = [
  {
    id: 1, name: 'Aleksandar Nikolov',
    role: { tr: 'Oto Yıkama Zinciri Sahibi, Üsküp', en: 'Car Wash Chain Owner, Skopje' },
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
    rating: 5,
    text: { tr: 'Active Foam Pro ile yıkama sürelerini %30 kısalttık. Köpük kalitesi ve durulama kolaylığı rakipsiz.', en: 'We reduced wash times by 30% with Active Foam Pro. Foam quality and rinsing ease are unmatched.' },
  },
  {
    id: 2, name: 'Stefan Popović',
    role: { tr: 'Fabrika Tesis Müdürü, Belgrad', en: 'Factory Manager, Belgrade' },
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80',
    rating: 5,
    text: { tr: 'Endüstriyel temizleyiciler için yaptığımız tüm karşılaştırmalarda Puriva ürünleri üstün çıktı.', en: 'Puriva products outperformed in all our industrial cleaner comparisons.' },
  },
  {
    id: 3, name: 'Maria Georgieva',
    role: { tr: 'Satın Alma Direktörü, Sofya', en: 'Procurement Director, Sofia' },
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80',
    rating: 5,
    text: { tr: 'Lojistik süreci mükemmel, ürünler zamanında ve güvenli paketleme ile geliyor. En güvenilir tedarikçi.', en: 'Logistics is excellent, products arrive on time with secure packaging. The most reliable supplier.' },
  },
]

export default function Testimonials() {
  const [ref, inView] = useInView()
  const { t } = useLang()

  return (
    <section ref={ref} className="bg-white py-28 px-6">
      <div className={`max-w-6xl mx-auto transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="text-center mb-16">
          <p className="text-blue-600 text-sm font-semibold tracking-widest uppercase mb-3">{t(UI.testimonials.subtitle)}</p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800">{t(UI.testimonials.title)}</h2>
          <div className="w-16 h-1 bg-blue-600 mx-auto mt-5 rounded-full" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map(tm => (
            <div key={tm.id} className="bg-slate-50 rounded-2xl p-8 border border-slate-100 relative hover:shadow-lg transition-shadow duration-300">
              <Quote size={40} className="text-blue-100 absolute top-6 right-6" />
              <div className="flex gap-1 mb-4">
                {[...Array(tm.rating)].map((_, i) => (
                  <Star key={i} size={16} className="text-amber-400 fill-amber-400" />
                ))}
              </div>
              <p className="text-slate-600 text-sm leading-relaxed italic mb-6">&ldquo;{t(tm.text)}&rdquo;</p>
              <div className="flex items-center gap-3 pt-4 border-t border-slate-200">
                <img src={tm.avatar} alt={tm.name} className="w-11 h-11 rounded-full object-cover" loading="lazy" />
                <div>
                  <p className="text-slate-800 font-semibold text-sm">{tm.name}</p>
                  <p className="text-slate-400 text-xs">{t(tm.role)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
