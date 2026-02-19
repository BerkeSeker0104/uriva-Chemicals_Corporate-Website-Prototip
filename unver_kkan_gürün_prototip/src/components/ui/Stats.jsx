import { Package, Globe, Users, Award } from 'lucide-react'
import { useInView } from '../../hooks/useInView.js'
import { useCountUp } from '../../hooks/useCountUp.js'
import { useLang, UI } from '../../context/LanguageContext.jsx'

const statsData = [
  { value: 150, suffix: '+', labelKey: 'products', Icon: Package },
  { value: 12, suffix: '', labelKey: 'countries', Icon: Globe },
  { value: 500, suffix: '+', labelKey: 'clients', Icon: Users },
  { value: 15, suffix: '', labelKey: 'experience', Icon: Award },
]

function StatCard({ stat, inView, label }) {
  const count = useCountUp(stat.value, inView)
  return (
    <div className="text-center group">
      <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-500 transition-all duration-300">
        <stat.Icon size={28} className="text-blue-300 group-hover:text-white transition-colors duration-300" />
      </div>
      <div className="text-4xl md:text-5xl font-black text-white">{count}{stat.suffix}</div>
      <p className="text-blue-200 font-medium mt-2 text-sm">{label}</p>
    </div>
  )
}

export default function Stats() {
  const [ref, inView] = useInView(0.3)
  const { t } = useLang()

  return (
    <section ref={ref} className="relative py-24 px-6 overflow-hidden" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0f172a 100%)' }}>
      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(59,130,246,0.5) 0%, transparent 60%)' }} />
      <div className={`max-w-6xl mx-auto relative z-10 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="text-center mb-16">
          <p className="text-blue-400 text-sm font-semibold tracking-widest uppercase mb-3">{t(UI.stats.subtitle)}</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white">{t(UI.stats.title)}</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {statsData.map(stat => (
            <StatCard key={stat.labelKey} stat={stat} inView={inView} label={t(UI.stats[stat.labelKey])} />
          ))}
        </div>
      </div>
    </section>
  )
}
