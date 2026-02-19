import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Beaker, Truck, FlaskConical, Headphones, Settings, Shield, MessageSquare } from 'lucide-react'
import { useInView } from '../../hooks/useInView.js'
import { useLang, UI } from '../../context/LanguageContext.jsx'
import { db } from '../../admin/store/db.js'
import PageHero from '../../components/ui/PageHero.jsx'
import CtaBanner from '../../components/ui/CtaBanner.jsx'

const serviceIcons = [Beaker, Truck, FlaskConical, Headphones, Settings, Shield]

export default function ServicesPage() {
  const { t } = useLang()
  const [services, setServices] = useState([])

  useEffect(() => {
    setServices(db.services.getAll().filter(s => s.active))
  }, [])

  return (
    <>
      <PageHero
        title={t(UI.services.title)}
        subtitle={t(UI.services.subtitle)}
        breadcrumbs={[{ label: t(UI.nav.services) }]}
      />
      <ServiceGrid services={services} t={t} />
      <WhyUs t={t} />
      <CtaBanner />
    </>
  )
}

function ServiceGrid({ services, t }) {
  const [ref, inView] = useInView()

  return (
    <section ref={ref} className="py-24 px-6 bg-white">
      <div className={`max-w-6xl mx-auto transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="text-center mb-16">
          <p className="text-blue-600 text-sm font-semibold tracking-widest uppercase mb-3">{t(UI.services.subtitle)}</p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800">{t(UI.services.title)}</h2>
          <div className="w-16 h-1 bg-blue-600 mx-auto mt-5 rounded-full" />
          <p className="text-slate-500 text-sm max-w-xl mx-auto mt-4">{t(UI.services.desc)}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((s, i) => {
            const Icon = serviceIcons[i % serviceIcons.length]
            return (
              <div key={s.id} className="bg-slate-50 rounded-2xl p-8 border border-slate-100 hover:shadow-lg hover:border-blue-100 transition-all duration-300 group">
                <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center group-hover:bg-blue-100 transition-colors mb-5">
                  <Icon className="text-blue-600" size={24} />
                </div>
                <h3 className="text-slate-800 font-bold text-xl mb-3">{t(s.name)}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{t(s.description)}</p>
              </div>
            )
          })}
        </div>
        <div className="text-center mt-14">
          <Link to="/iletisim" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-200 hover:shadow-xl">
            <MessageSquare size={18} /> {t(UI.cta.quote)}
          </Link>
        </div>
      </div>
    </section>
  )
}

function WhyUs({ t }) {
  const [ref, inView] = useInView()
  const reasons = [
    { title: { tr: 'Uzman Ekip', en: 'Expert Team' }, body: { tr: 'Kimya mühendisleri ve saha uzmanlarından oluşan deneyimli ekibimiz her zaman yanınızda.', en: 'Our experienced team of chemical engineers and field experts is always by your side.' } },
    { title: { tr: 'Hızlı Teslimat', en: 'Fast Delivery' }, body: { tr: 'Balkanlar genelinde kurulu lojistik ağımız sayesinde siparişleriniz hızla ulaşır.', en: 'Thanks to our logistics network across the Balkans, your orders arrive quickly.' } },
    { title: { tr: 'Özel Formülasyon', en: 'Custom Formulation' }, body: { tr: 'İhtiyaçlarınıza özel formül geliştirme hizmeti ile tam size uygun çözümler.', en: 'Solutions tailored to you with our custom formulation development service.' } },
    { title: { tr: '7/24 Destek', en: '24/7 Support' }, body: { tr: 'Teknik destek hattımız haftanın 7 günü, günün 24 saati hizmetinizde.', en: 'Our technical support line is at your service 24 hours a day, 7 days a week.' } },
  ]

  return (
    <section ref={ref} className="py-24 px-6" style={{ backgroundColor: '#f8fafc' }}>
      <div className={`max-w-6xl mx-auto transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800">{t({ tr: 'Neden Puriva?', en: 'Why Puriva?' })}</h2>
          <div className="w-16 h-1 bg-blue-600 mx-auto mt-5 rounded-full" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map(r => (
            <div key={r.title.tr} className="text-center">
              <h3 className="text-slate-800 font-semibold text-lg mb-2">{t(r.title)}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{t(r.body)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
