import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight, ChevronDown, Play, Package, BadgeCheck, CheckCircle, MapPin, Globe, Zap, Shield, Award } from 'lucide-react'
import { useInView } from '../../hooks/useInView.js'
import { useLang, UI } from '../../context/LanguageContext.jsx'
import { db } from '../../admin/store/db.js'
import Partners from '../../components/ui/Partners.jsx'
import Stats from '../../components/ui/Stats.jsx'
import ProductCard from '../../components/ui/ProductCard.jsx'
import CtaBanner from '../../components/ui/CtaBanner.jsx'
import Testimonials from '../../components/ui/Testimonials.jsx'
import BlogCard from '../../components/ui/BlogCard.jsx'

export default function HomePage() {
  const { t } = useLang()

  return (
    <>
      <Hero t={t} />
      <Partners />
      <Kurumsal t={t} />
      <Stats />
      <ProductsPreview t={t} />
      <CtaBanner />
      <Testimonials />
      <BlogPreview t={t} />
    </>
  )
}

function Hero({ t }) {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 35%, #1a2744 65%, #0f172a 100%)' }}>
      <img src="https://images.unsplash.com/photo-1594611372970-4e9201566205?w=1920&q=80" alt="" className="absolute inset-0 w-full h-full object-cover" loading="eager" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a]/90 via-[#0f172a]/75 to-[#0f172a]/50" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-[#0f172a]/30" />
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-32">
        <div>
          <p className="text-blue-400 text-xs md:text-sm font-semibold tracking-[0.25em] uppercase mb-6">{t(UI.hero.subtitle)}</p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight">
            {t(UI.hero.title1)}<br />{t(UI.hero.title2)}<br /><span className="text-blue-400">{t(UI.hero.title3)}</span>
          </h1>
          <p className="text-slate-300 text-base md:text-lg max-w-lg mt-6 leading-relaxed">{t(UI.hero.desc)}</p>
          <div className="mt-10 flex flex-col sm:flex-row items-start gap-4">
            <Link to="/urunler" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5 inline-flex items-center gap-2">
              {t(UI.hero.ctaProducts)} <ChevronRight size={18} />
            </Link>
            <button className="inline-flex items-center gap-3 text-white/80 hover:text-white font-medium px-4 py-4 transition-colors group cursor-default">
              <span className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center group-hover:bg-white/20 transition-all">
                <Play size={18} className="text-white ml-0.5" />
              </span>
              {t(UI.hero.ctaVideo)}
            </button>
          </div>
        </div>
        <div className="hidden lg:flex flex-col items-end gap-4">
          <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-6 w-72">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center"><Package size={20} className="text-white" /></div>
              <div><p className="text-white font-bold text-lg">150+ {t(UI.stats.products)}</p><p className="text-blue-200 text-xs">{t({ tr: 'Profesyonel Kimyasal Çözüm', en: 'Professional Chemical Solutions' })}</p></div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[{ n: '12', l: t(UI.stats.countries) }, { n: '500+', l: t(UI.stats.clients) }, { n: '15', l: t({ tr: 'Yıl', en: 'Years' }) }].map(s => (
                <div key={s.l} className="bg-white/5 rounded-lg p-2 text-center"><p className="text-white font-bold text-sm">{s.n}</p><p className="text-blue-200 text-[10px]">{s.l}</p></div>
              ))}
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-5 w-64">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center"><BadgeCheck size={20} className="text-white" /></div>
              <div><p className="text-white font-semibold text-sm">ISO 9001:2015</p><p className="text-emerald-300 text-xs">{t({ tr: 'Kalite Onaylı', en: 'Quality Certified' })}</p></div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-slate-400 text-xs tracking-widest uppercase">{t(UI.discover)}</span>
        <ChevronDown size={20} className="text-slate-400" />
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
    </section>
  )
}

function Kurumsal({ t }) {
  const [ref, inView] = useInView()
  const aboutChecks = [
    { tr: 'ISO 9001:2015 Sertifikalı Üretim', en: 'ISO 9001:2015 Certified Production' },
    { tr: 'REACH Uyumlu Formüller', en: 'REACH Compliant Formulas' },
    { tr: 'Balkanlar Geneli Lojistik Ağı', en: 'Pan-Balkan Logistics Network' },
    { tr: '7/24 Teknik Destek', en: '24/7 Technical Support' },
  ]
  const aboutPoints = [
    { Icon: MapPin, title: { tr: 'Kuzey Makedonya Merkez', en: 'North Macedonia HQ' }, body: { tr: "Üsküp, Centar Belediyesi'nde kurulu tesislerimizle bölgenin güvenilir kimyasal tedarikçisiyiz.", en: 'With our facilities in Centar Municipality, Skopje, we are the reliable chemical supplier of the region.' } },
    { Icon: Globe, title: { tr: 'Balkan Pazarına Odak', en: 'Balkan Market Focus' }, body: { tr: 'Balkan ülkelerinin ihtiyaçlarına özel formüle edilmiş, yerel dinamiklere uygun çözümler sunuyoruz.', en: 'We offer solutions specially formulated for the needs of Balkan countries.' } },
    { Icon: Zap, title: { tr: 'İnovatif Kimya', en: 'Innovative Chemistry' }, body: { tr: 'Ar-Ge odaklı yaklaşımımızla sektörün ihtiyaçlarına yönelik yüksek performanslı ürünler geliştiriyoruz.', en: 'With our R&D-focused approach, we develop high-performance products for industry needs.' } },
  ]

  return (
    <section id="kurumsal" className="bg-white py-28 px-6" ref={ref}>
      <div className={`max-w-6xl mx-auto transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <p className="text-blue-600 text-sm font-semibold tracking-widest uppercase mb-3">{t(UI.about.subtitle)}</p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 leading-tight">{t(UI.about.title1)}<br /><span className="text-blue-600">{t(UI.about.title2)}</span></h2>
            <p className="text-slate-500 leading-relaxed mt-4 mb-8">{t(UI.about.desc)}</p>
            {aboutChecks.map(item => (
              <div key={item.tr} className="flex items-center gap-3 mb-3">
                <CheckCircle size={18} className="text-blue-600 shrink-0" />
                <span className="text-slate-600 text-sm">{t(item)}</span>
              </div>
            ))}
            <Link to="/hakkimizda" className="inline-flex items-center gap-2 mt-6 text-blue-600 font-semibold text-sm hover:gap-3 transition-all">
              {t({ tr: 'Daha Fazla Bilgi', en: 'Learn More' })} <ChevronRight size={15} />
            </Link>
          </div>
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img src="https://images.unsplash.com/photo-1608037222022-62649819f8aa?w=800&q=80" alt="Puriva lab" className="w-full h-80 lg:h-96 object-cover" loading="lazy" />
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {aboutPoints.map(point => (
            <div key={point.title.tr} className="text-center md:text-left group">
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto md:mx-0 group-hover:bg-blue-100 transition-colors duration-200"><point.Icon className="text-blue-600" size={24} /></div>
              <h3 className="text-slate-800 font-semibold text-lg mt-5">{t(point.title)}</h3>
              <p className="text-slate-500 text-sm leading-relaxed mt-2">{t(point.body)}</p>
            </div>
          ))}
        </div>
        <div className="mt-20 bg-slate-50 rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-center gap-6 md:gap-10">
          <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center shrink-0"><Shield className="text-white" size={24} /></div>
          <div>
            <h3 className="text-slate-800 font-bold text-lg">{t(UI.about.qualityTitle)}</h3>
            <p className="text-slate-500 text-sm leading-relaxed mt-1">{t(UI.about.qualityDesc)}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

function ProductsPreview({ t }) {
  const [ref, inView] = useInView()
  const [products, setProducts] = useState([])
  useEffect(() => {
    const all = db.products.getAll().filter(p => p.active)
    const featured = all.filter(p => p.featured)
    setProducts(featured.length > 0 ? featured.slice(0, 6) : all.slice(0, 6))
  }, [])

  return (
    <section ref={ref} className="py-28 px-6" style={{ background: 'linear-gradient(180deg, #f8fafc 0%, #ffffff 50%, #f8fafc 100%)' }}>
      <div className={`max-w-6xl mx-auto transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="text-center mb-12">
          <p className="text-blue-600 text-sm font-semibold tracking-widest uppercase mb-3">{t(UI.products.subtitle)}</p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800">{t(UI.products.title)}</h2>
          <div className="w-16 h-1 bg-blue-600 mx-auto mt-5 rounded-full" />
          <p className="text-slate-500 text-sm max-w-xl mx-auto mt-4">{t(UI.products.desc)}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
        <div className="text-center mt-14">
          <Link to="/urunler" className="inline-flex items-center gap-2 bg-slate-800 hover:bg-blue-600 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 hover:shadow-xl">
            <Package size={18} /> {t(UI.products.catalogCta)}
          </Link>
        </div>
      </div>
    </section>
  )
}

function BlogPreview({ t }) {
  const [ref, inView] = useInView()
  const [posts, setPosts] = useState([])
  useEffect(() => {
    setPosts(db.blogPosts.getAll().filter(p => p.status === 'published').slice(0, 3))
  }, [])

  return (
    <section ref={ref} className="py-28 px-6" style={{ backgroundColor: '#f0f7ff' }}>
      <div className={`max-w-6xl mx-auto transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="text-center mb-16">
          <p className="text-blue-600 text-sm font-semibold tracking-widest uppercase mb-3">{t(UI.blog.subtitle)}</p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800">{t(UI.blog.title)}</h2>
          <div className="w-16 h-1 bg-blue-600 mx-auto mt-5 rounded-full" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map(post => <BlogCard key={post.id} post={post} />)}
        </div>
      </div>
    </section>
  )
}
