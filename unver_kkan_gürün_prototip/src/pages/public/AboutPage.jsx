import { CheckCircle, MapPin, Globe, Zap, Shield, Award, Users, Target, Lightbulb } from 'lucide-react'
import { useInView } from '../../hooks/useInView.js'
import { useLang, UI } from '../../context/LanguageContext.jsx'
import PageHero from '../../components/ui/PageHero.jsx'
import Stats from '../../components/ui/Stats.jsx'
import Testimonials from '../../components/ui/Testimonials.jsx'
import CtaBanner from '../../components/ui/CtaBanner.jsx'

export default function AboutPage() {
  const { t } = useLang()

  return (
    <>
      <PageHero
        title={t(UI.about.title1) + ' ' + t(UI.about.title2)}
        subtitle={t(UI.about.subtitle)}
        breadcrumbs={[{ label: t(UI.nav.about) }]}
      />
      <Story t={t} />
      <Values t={t} />
      <Stats />
      <Quality t={t} />
      <Testimonials />
      <CtaBanner />
    </>
  )
}

function Story({ t }) {
  const [ref, inView] = useInView()
  const checks = [
    { tr: 'ISO 9001:2015 Sertifikalı Üretim', en: 'ISO 9001:2015 Certified Production' },
    { tr: 'REACH Uyumlu Formüller', en: 'REACH Compliant Formulas' },
    { tr: 'Balkanlar Geneli Lojistik Ağı', en: 'Pan-Balkan Logistics Network' },
    { tr: '7/24 Teknik Destek', en: '24/7 Technical Support' },
    { tr: '12 Ülkede Aktif Dağıtım', en: 'Active Distribution in 12 Countries' },
    { tr: 'Çevre Dostu Üretim Süreçleri', en: 'Eco-Friendly Production Processes' },
  ]

  return (
    <section ref={ref} className="bg-white py-24 px-6">
      <div className={`max-w-6xl mx-auto transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-blue-600 text-sm font-semibold tracking-widest uppercase mb-3">{t(UI.about.subtitle)}</p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 leading-tight mb-6">
              {t(UI.about.title1)}<br /><span className="text-blue-600">{t(UI.about.title2)}</span>
            </h2>
            <p className="text-slate-500 leading-relaxed mb-8">{t(UI.about.desc)}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {checks.map(item => (
                <div key={item.tr} className="flex items-center gap-3">
                  <CheckCircle size={18} className="text-blue-600 shrink-0" />
                  <span className="text-slate-600 text-sm">{t(item)}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img src="https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&q=80" alt="Puriva lab" className="w-full h-80 lg:h-[420px] object-cover" loading="lazy" />
              <div className="absolute bottom-6 left-6 bg-white rounded-xl px-5 py-4 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center"><Award size={20} className="text-white" /></div>
                  <div><p className="text-slate-800 font-bold text-sm">ISO 9001:2015</p><p className="text-slate-500 text-xs">{t({ tr: 'Kalite Sertifikalı', en: 'Quality Certified' })}</p></div>
                </div>
              </div>
            </div>
            <div className="absolute -top-4 -right-4 w-full h-full bg-blue-50 rounded-2xl -z-10" />
          </div>
        </div>
      </div>
    </section>
  )
}

function Values({ t }) {
  const [ref, inView] = useInView()
  const values = [
    { Icon: MapPin, title: { tr: 'Kuzey Makedonya Merkez', en: 'North Macedonia HQ' }, body: { tr: "Üsküp, Centar Belediyesi'nde kurulu tesislerimizle bölgenin güvenilir kimyasal tedarikçisiyiz.", en: 'With our facilities in Centar Municipality, Skopje, we are the reliable chemical supplier of the region.' } },
    { Icon: Globe, title: { tr: 'Balkan Pazarına Odak', en: 'Balkan Market Focus' }, body: { tr: 'Balkan ülkelerinin ihtiyaçlarına özel formüle edilmiş, yerel dinamiklere uygun çözümler sunuyoruz.', en: 'We offer solutions specially formulated for the needs of Balkan countries.' } },
    { Icon: Zap, title: { tr: 'İnovatif Kimya', en: 'Innovative Chemistry' }, body: { tr: 'Ar-Ge odaklı yaklaşımımızla sektörün ihtiyaçlarına yönelik yüksek performanslı ürünler geliştiriyoruz.', en: 'With our R&D-focused approach, we develop high-performance products for industry needs.' } },
    { Icon: Users, title: { tr: 'Müşteri Odaklılık', en: 'Customer Focus' }, body: { tr: 'Her müşterimizin ihtiyaçlarını anlıyor, kişiye özel çözümler ve 7/24 teknik destek sunuyoruz.', en: 'We understand each customer\'s needs and provide personalized solutions with 24/7 technical support.' } },
    { Icon: Target, title: { tr: 'Sürdürülebilirlik', en: 'Sustainability' }, body: { tr: 'Çevre dostu formülasyonlar ve sürdürülebilir üretim süreçleriyle geleceğe yatırım yapıyoruz.', en: 'We invest in the future with eco-friendly formulations and sustainable production processes.' } },
    { Icon: Lightbulb, title: { tr: 'Ar-Ge Yatırımı', en: 'R&D Investment' }, body: { tr: 'Modern laboratuvarımızda sürekli yeni formüller geliştirerek sektörün önünde kalıyoruz.', en: 'We stay ahead of the industry by constantly developing new formulas in our modern laboratory.' } },
  ]

  return (
    <section ref={ref} className="py-24 px-6" style={{ backgroundColor: '#f8fafc' }}>
      <div className={`max-w-6xl mx-auto transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="text-center mb-16">
          <p className="text-blue-600 text-sm font-semibold tracking-widest uppercase mb-3">{t({ tr: 'Değerlerimiz', en: 'Our Values' })}</p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800">{t({ tr: 'Bizi Farklı Kılan Ne?', en: 'What Sets Us Apart?' })}</h2>
          <div className="w-16 h-1 bg-blue-600 mx-auto mt-5 rounded-full" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {values.map(v => (
            <div key={v.title.tr} className="text-center md:text-left group">
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto md:mx-0 group-hover:bg-blue-100 transition-colors duration-200">
                <v.Icon className="text-blue-600" size={24} />
              </div>
              <h3 className="text-slate-800 font-semibold text-lg mt-5">{t(v.title)}</h3>
              <p className="text-slate-500 text-sm leading-relaxed mt-2">{t(v.body)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Quality({ t }) {
  const [ref, inView] = useInView()
  const certs = [
    { title: 'ISO 9001:2015', desc: { tr: 'Kalite Yönetim Sistemi', en: 'Quality Management System' } },
    { title: 'ISO 14001:2015', desc: { tr: 'Çevre Yönetim Sistemi', en: 'Environmental Management System' } },
    { title: 'REACH', desc: { tr: 'AB Kimyasal Güvenlik Uyumu', en: 'EU Chemical Safety Compliance' } },
    { title: 'GMP', desc: { tr: 'İyi Üretim Uygulamaları', en: 'Good Manufacturing Practices' } },
  ]

  return (
    <section ref={ref} className="bg-white py-24 px-6">
      <div className={`max-w-6xl mx-auto transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="bg-slate-50 rounded-2xl p-8 md:p-12">
          <div className="flex flex-col md:flex-row items-start gap-6 md:gap-10 mb-10">
            <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center shrink-0"><Shield className="text-white" size={24} /></div>
            <div>
              <h3 className="text-slate-800 font-bold text-2xl">{t(UI.about.qualityTitle)}</h3>
              <p className="text-slate-500 leading-relaxed mt-2">{t(UI.about.qualityDesc)}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {certs.map(c => (
              <div key={c.title} className="bg-white rounded-xl p-5 border border-slate-200 text-center hover:shadow-md transition-shadow">
                <p className="text-blue-600 font-bold text-lg">{c.title}</p>
                <p className="text-slate-500 text-xs mt-1">{t(c.desc)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
