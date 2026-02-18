import { useState, useEffect, useRef } from 'react'
import {
  Menu,
  X,
  MapPin,
  Phone,
  Mail,
  Globe,
  Shield,
  Zap,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Beaker,
  Droplets,
  Sparkles,
  ArrowRight,
  Star,
  Award,
  Users,
  Clock,
  Package,
  CheckCircle,
  FlaskConical,
  Gauge,
  Calendar,
  BadgeCheck,
  Quote,
  Instagram,
  Linkedin,
  Facebook,
  Youtube,
  Send,
  Factory,
  Play,
  FileText,
  Headphones,
  MessageSquare,
} from 'lucide-react'

/* ══════════════════════════════════════════════════════════
   DATA
   ══════════════════════════════════════════════════════════ */

const navLinks = [
  { label: 'Ana Sayfa', href: '#ana-sayfa' },
  { label: 'Kurumsal', href: '#kurumsal' },
  { label: 'Ürünler', href: '#urunler' },
  { label: 'Blog', href: '#blog' },
  { label: 'İletişim', href: '#iletisim' },
]

const partners = [
  'BalkanChem', 'AutoWash Pro', 'CleanTech MK', 'EuroChem Balkan',
  'ProDetailing', 'IndustriClean', 'AquaPure Systems', 'NovaChem',
]

const aboutChecks = [
  'ISO 9001:2015 Sertifikalı Üretim',
  'REACH Uyumlu Formüller',
  'Balkanlar Geneli Lojistik Ağı',
  '7/24 Teknik Destek',
]

const aboutPoints = [
  {
    Icon: MapPin,
    title: 'Kuzey Makedonya Merkez',
    body: 'Üsküp, Centar Belediyesi\'nde kurulu tesislerimizle bölgenin güvenilir kimyasal tedarikçisiyiz.',
  },
  {
    Icon: Globe,
    title: 'Balkan Pazarına Odak',
    body: 'Balkan ülkelerinin ihtiyaçlarına özel formüle edilmiş, yerel dinamiklere uygun çözümler sunuyoruz.',
  },
  {
    Icon: Zap,
    title: 'İnovatif Kimya',
    body: 'Ar-Ge odaklı yaklaşımımızla sektörün ihtiyaçlarına yönelik yüksek performanslı ürünler geliştiriyoruz.',
  },
]

const stats = [
  { value: 150, suffix: '+', label: 'Ürün Çeşidi', Icon: Package },
  { value: 12, suffix: '', label: 'Ülke', Icon: Globe },
  { value: 500, suffix: '+', label: 'Aktif Müşteri', Icon: Users },
  { value: 15, suffix: '', label: 'Yıl Tecrübe', Icon: Award },
]

const categories = ['Tümü', 'Oto Bakım', 'Endüstriyel']

const products = [
  {
    id: 1,
    category: 'Oto Bakım',
    title: 'Active Foam Pro',
    desc: 'Yüksek köpüklü, hızlı etkili profesyonel araç yıkama formülü. Kirleri anında çözer, boyayı korur.',
    img: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80',
    tag: 'Temizlik',
    TagIcon: Droplets,
    badge: 'Çok Satan',
    volume: '5L / 20L',
    code: 'PUR-AF-001',
  },
  {
    id: 2,
    category: 'Oto Bakım',
    title: 'Lastik Parlatıcı Jel',
    desc: 'Uzun süreli parlaklık ve UV koruması sağlayan silikon bazlı profesyonel lastik bakım ürünü.',
    img: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&q=80',
    tag: 'Bakım',
    TagIcon: Sparkles,
    badge: null,
    volume: '1L / 5L',
    code: 'PUR-LP-002',
  },
  {
    id: 3,
    category: 'Oto Bakım',
    title: 'Cam Temizleyici Pro',
    desc: 'Cam yüzeylerinde leke ve yağ bırakmayan, kristal berraklığında görüş sağlayan formül.',
    img: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80',
    tag: 'Temizlik',
    TagIcon: Droplets,
    badge: null,
    volume: '500ml / 5L',
    code: 'PUR-CT-003',
  },
  {
    id: 4,
    category: 'Oto Bakım',
    title: 'İç Mekan Temizleyici',
    desc: 'Koltuk, torpido ve plastik yüzeyleri için hassas, koku bırakmayan güvenli formül.',
    img: 'https://images.unsplash.com/photo-1507136566006-cfc505b114fc?w=800&q=80',
    tag: 'İç Mekan',
    TagIcon: Sparkles,
    badge: null,
    volume: '750ml / 5L',
    code: 'PUR-IM-004',
  },
  {
    id: 5,
    category: 'Endüstriyel',
    title: 'Motor Temizleyici',
    desc: 'Motor ve motor bölgesi için güvenli, çevre dostu güçlü dekontaminasyon solüsyonu.',
    img: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&q=80',
    tag: 'Endüstriyel',
    TagIcon: Beaker,
    badge: null,
    volume: '1L / 5L',
    code: 'PUR-MT-005',
  },
  {
    id: 6,
    category: 'Endüstriyel',
    title: 'Yağ Sökücü Konsantre',
    desc: 'Endüstriyel yüzeylerdeki ağır yağ ve gres birikintilerini hızla çözen güçlü konsantrat.',
    img: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=80',
    tag: 'Endüstriyel',
    TagIcon: FlaskConical,
    badge: 'Yeni',
    volume: '5L / 20L',
    code: 'PUR-YS-006',
  },
  {
    id: 7,
    category: 'Endüstriyel',
    title: 'Genel Amaçlı Dekontaminant',
    desc: 'Fabrika zeminleri, ekipmanlar ve tüm sert yüzeyler için pH dengeli çok amaçlı temizleyici.',
    img: 'https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=800&q=80',
    tag: 'Çok Amaçlı',
    TagIcon: Gauge,
    badge: null,
    volume: '5L / 25L',
    code: 'PUR-GD-007',
  },
]

const blogPosts = [
  {
    id: 1,
    title: 'Araç Yıkamada Doğru Köpük Seçimi',
    excerpt:
      'Aktif köpük sistemlerinde pH dengesi, boya güvenliği ve durulama kolaylığı nasıl değerlendirilir? Profesyoneller için kapsamlı rehber.',
    img: 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=800&q=80',
    date: '12 Ocak 2025',
    category: 'Oto Bakım',
    CategoryIcon: Droplets,
    readTime: '5 dk okuma',
  },
  {
    id: 2,
    title: 'Endüstriyel Temizlikte 2025 Trendleri',
    excerpt:
      'Biyobozunur formüller, konsantre kullanım ve çevre odaklı sertifikasyon süreçleri endüstrinin gündeminde.',
    img: 'https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?w=800&q=80',
    date: '28 Kasım 2024',
    category: 'Endüstriyel',
    CategoryIcon: Factory,
    readTime: '7 dk okuma',
  },
  {
    id: 3,
    title: 'Motor Bakımında Dikkat Edilmesi Gerekenler',
    excerpt:
      'Motor temizleyici seçiminde kimyasal uyumluluk, plastik ve lastik bileşenlerini koruma kriterleri nelerdir?',
    img: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&q=80',
    date: '5 Ekim 2024',
    category: 'Teknik',
    CategoryIcon: Beaker,
    readTime: '6 dk okuma',
  },
]

const testimonials = [
  {
    id: 1,
    name: 'Aleksandar Nikolov',
    role: 'Oto Yıkama Zinciri Sahibi, Üsküp',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
    rating: 5,
    text: 'Active Foam Pro ile yıkama sürelerini %30 kısalttık. Köpük kalitesi ve durulama kolaylığı rakipsiz.',
  },
  {
    id: 2,
    name: 'Stefan Popović',
    role: 'Fabrika Tesis Müdürü, Belgrad',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80',
    rating: 5,
    text: 'Endüstriyel temizleyiciler için yaptığımız tüm karşılaştırmalarda Puriva ürünleri üstün çıktı.',
  },
  {
    id: 3,
    name: 'Maria Georgieva',
    role: 'Satın Alma Direktörü, Sofya',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80',
    rating: 5,
    text: 'Lojistik süreci mükemmel, ürünler zamanında ve güvenli paketleme ile geliyor. En güvenilir tedarikçi.',
  },
]

const certifications = [
  { label: 'ISO 9001:2015', sublabel: 'Kalite Yönetimi' },
  { label: 'REACH', sublabel: 'AB Kimyasal Uyumu' },
  { label: 'GHS / SDS', sublabel: 'Güvenlik Standartları' },
  { label: 'Eco Label', sublabel: 'Çevre Dostu Formül' },
]

/* ══════════════════════════════════════════════════════════
   HOOKS
   ══════════════════════════════════════════════════════════ */

function useInView(threshold = 0.15) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setInView(true); observer.disconnect() }
      },
      { threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])
  return [ref, inView]
}

function useCountUp(target, inView, duration = 2000) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!inView) return
    let start = 0
    const increment = target / (duration / 16)
    const timer = setInterval(() => {
      start += increment
      if (start >= target) { setCount(target); clearInterval(timer) }
      else setCount(Math.floor(start))
    }, 16)
    return () => clearInterval(timer)
  }, [inView, target, duration])
  return count
}

/* ══════════════════════════════════════════════════════════
   TOPBAR
   ══════════════════════════════════════════════════════════ */

function TopBar() {
  return (
    <div className="hidden lg:block bg-slate-900 text-slate-300 text-xs py-2.5 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-1.5">
            <MapPin size={12} className="text-blue-400" />
            Centar Belediyesi, Üsküp, Kuzey Makedonya
          </span>
          <span className="flex items-center gap-1.5">
            <Clock size={12} className="text-blue-400" />
            Pzt&ndash;Cum: 08:00&ndash;17:00
          </span>
        </div>
        <div className="flex items-center gap-6">
          <a href="tel:+38923XXXXXX" className="flex items-center gap-1.5 hover:text-white transition-colors">
            <Phone size={12} className="text-blue-400" /> +389 2X XXX XXXX
          </a>
          <a href="mailto:info@purivacem.com" className="flex items-center gap-1.5 hover:text-white transition-colors">
            <Mail size={12} className="text-blue-400" /> info@purivacem.com
          </a>
        </div>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════
   HEADER
   ══════════════════════════════════════════════════════════ */

function Header({ isScrolled, menuOpen, setMenuOpen, activeSection }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className={`overflow-hidden transition-all duration-300 ${isScrolled ? 'max-h-0' : 'max-h-12'}`}>
        <TopBar />
      </div>
      <div className={`transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg py-3' : 'bg-slate-900/60 backdrop-blur-sm py-4'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <a href="#ana-sayfa" className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300 ${isScrolled ? 'bg-blue-600' : 'bg-blue-500/20 border border-blue-400/30'}`}>
              <FlaskConical size={18} className={isScrolled ? 'text-white' : 'text-blue-300'} />
            </div>
            <div className="flex flex-col leading-none">
              <span className={`text-xl font-black tracking-widest transition-colors duration-300 ${isScrolled ? 'text-blue-600' : 'text-white'}`}>PURIVA</span>
              <span className={`text-[9px] font-medium tracking-[0.35em] uppercase transition-colors duration-300 ${isScrolled ? 'text-slate-400' : 'text-slate-300'}`}>Chemicals</span>
            </div>
          </a>
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const sectionId = link.href.replace('#', '')
              const isActive = activeSection === sectionId
              return (
                <a key={link.href} href={link.href}
                  className={`relative text-sm font-medium px-4 py-2 rounded-lg transition-all duration-200 ${
                    isActive
                      ? isScrolled ? 'text-blue-600 bg-blue-50' : 'text-white bg-white/10'
                      : isScrolled ? 'text-slate-600 hover:text-blue-600 hover:bg-slate-50' : 'text-slate-200 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {link.label}
                  {isActive && <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-blue-500" />}
                </a>
              )
            })}
            <a href="#iletisim" className="ml-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-all duration-200 hover:shadow-lg">
              Bize Ulaşın
            </a>
          </nav>
          <button onClick={() => setMenuOpen(!menuOpen)} className={`md:hidden p-2 rounded-lg transition-colors ${isScrolled ? 'text-slate-700 hover:bg-slate-100' : 'text-white hover:bg-white/10'}`} aria-label="Menü">
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <nav className="bg-white/95 backdrop-blur-md border-t border-slate-100 px-6 py-4 flex flex-col gap-1 shadow-xl">
          {navLinks.map((link) => {
            const sectionId = link.href.replace('#', '')
            const isActive = activeSection === sectionId
            return (
              <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)}
                className={`text-sm font-medium py-2.5 px-3 rounded-lg transition-colors ${isActive ? 'text-blue-600 bg-blue-50' : 'text-slate-700 hover:text-blue-600 hover:bg-slate-50'}`}>
                {link.label}
              </a>
            )
          })}
          <a href="#iletisim" onClick={() => setMenuOpen(false)} className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-lg text-center transition-all mt-2">
            Bize Ulaşın
          </a>
        </nav>
      </div>
    </header>
  )
}

/* ══════════════════════════════════════════════════════════
   HERO (Sol hizalı, sağda floating kartlar)
   ══════════════════════════════════════════════════════════ */

function Hero() {
  return (
    <section
      id="ana-sayfa"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 35%, #1a2744 65%, #0f172a 100%)' }}
    >
      {/* Arka plan fotoğrafı */}
      <img
        src="https://images.unsplash.com/photo-1611117775350-ac3950990985?w=1920&q=80"
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        loading="eager"
      />
      {/* Koyu gradient overlay – fotoğrafı okunabilir yapar */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a]/90 via-[#0f172a]/75 to-[#0f172a]/50" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-[#0f172a]/30" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-32">
        {/* Sol: İçerik */}
        <div>
          <p className="text-blue-400 text-xs md:text-sm font-semibold tracking-[0.25em] uppercase mb-6">
            Kuzey Makedonya&apos;dan Balkanlara
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight">
            Endüstriyel
            <br />
            Temizlikte
            <br />
            <span className="text-blue-400">Güvenilir Güç</span>
          </h1>
          <p className="text-slate-300 text-base md:text-lg max-w-lg mt-6 leading-relaxed">
            Oto bakım ve endüstriyel kimyasallarda yenilikçi formüllerle
            Balkanlar&apos;ın güvenilir çözüm ortağıyız.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-start gap-4">
            <a href="#urunler" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5 inline-flex items-center gap-2">
              Ürünleri İncele <ChevronRight size={18} />
            </a>
            <button className="inline-flex items-center gap-3 text-white/80 hover:text-white font-medium px-4 py-4 transition-colors group cursor-default">
              <span className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center group-hover:bg-white/20 transition-all">
                <Play size={18} className="text-white ml-0.5" />
              </span>
              Tanıtım Filmi
            </button>
          </div>
        </div>

        {/* Sağ: Floating kartlar */}
        <div className="hidden lg:flex flex-col items-end gap-4">
          {/* İstatistik kartı */}
          <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-6 w-72">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Package size={20} className="text-white" />
              </div>
              <div>
                <p className="text-white font-bold text-lg">150+ Ürün</p>
                <p className="text-blue-200 text-xs">Profesyonel Kimyasal Çözüm</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
                { n: '12', l: 'Ülke' },
                { n: '500+', l: 'Müşteri' },
                { n: '15', l: 'Yıl' },
              ].map((s) => (
                <div key={s.l} className="bg-white/5 rounded-lg p-2 text-center">
                  <p className="text-white font-bold text-sm">{s.n}</p>
                  <p className="text-blue-200 text-[10px]">{s.l}</p>
                </div>
              ))}
            </div>
          </div>
          {/* Sertifika kartı */}
          <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-5 w-64">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center">
                <BadgeCheck size={20} className="text-white" />
              </div>
              <div>
                <p className="text-white font-semibold text-sm">ISO 9001:2015</p>
                <p className="text-emerald-300 text-xs">Kalite Onaylı</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-slate-400 text-xs tracking-widest uppercase">Keşfet</span>
        <ChevronDown size={20} className="text-slate-400" />
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
    </section>
  )
}

/* ══════════════════════════════════════════════════════════
   PARTNER ŞERİDİ (Marquee)
   ══════════════════════════════════════════════════════════ */

function Partners() {
  return (
    <section className="bg-white py-10 border-b border-slate-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-6">
        <p className="text-slate-400 text-xs font-semibold tracking-widest uppercase text-center">
          İş Ortaklarımız &amp; Güvendikleri Markalar
        </p>
      </div>
      <div className="relative">
        <div className="marquee-track flex items-center gap-16 whitespace-nowrap">
          {[...partners, ...partners].map((name, i) => (
            <span key={i} className="text-slate-300 font-bold text-xl tracking-wide select-none flex-shrink-0 px-4">
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════════════
   KURUMSAL
   ══════════════════════════════════════════════════════════ */

function Kurumsal() {
  const [ref, inView] = useInView()
  return (
    <section id="kurumsal" className="bg-white py-28 px-6" ref={ref}>
      <div className={`max-w-6xl mx-auto transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <p className="text-blue-600 text-sm font-semibold tracking-widest uppercase mb-3">Hikayemiz</p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 leading-tight">
              15 Yıllık Deneyimle<br />
              <span className="text-blue-600">Balkanlar&apos;ın Güveni</span>
            </h2>
            <p className="text-slate-500 leading-relaxed mt-4 mb-8">
              2010 yılında Üsküp&apos;te kurulan Puriva Chemicals, bugün 12
              ülkede 500&apos;den fazla profesyonel müşteriye hizmet
              vermektedir. Ar-Ge odaklı yaklaşımımız ve uluslararası kalite
              standartlarına uygun üretimimizle sektörde fark yaratmaya devam ediyoruz.
            </p>
            {aboutChecks.map((item) => (
              <div key={item} className="flex items-center gap-3 mb-3">
                <CheckCircle size={18} className="text-blue-600 shrink-0" />
                <span className="text-slate-600 text-sm">{item}</span>
              </div>
            ))}
          </div>
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&q=80"
                alt="Puriva Chemicals laboratuvar"
                className="w-full h-80 lg:h-96 object-cover"
                loading="lazy"
              />
              <div className="absolute bottom-6 left-6 bg-white rounded-xl px-5 py-4 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                    <Award size={20} className="text-white" />
                  </div>
                  <div>
                    <p className="text-slate-800 font-bold text-sm">ISO 9001:2015</p>
                    <p className="text-slate-500 text-xs">Kalite Sertifikalı</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -top-4 -right-4 w-full h-full bg-blue-50 rounded-2xl -z-10" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {aboutPoints.map((point) => (
            <div key={point.title} className="text-center md:text-left group">
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto md:mx-0 group-hover:bg-blue-100 transition-colors duration-200">
                <point.Icon className="text-blue-600" size={24} />
              </div>
              <h3 className="text-slate-800 font-semibold text-lg mt-5">{point.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed mt-2">{point.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-20 bg-slate-50 rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-center gap-6 md:gap-10">
          <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center shrink-0">
            <Shield className="text-white" size={24} />
          </div>
          <div>
            <h3 className="text-slate-800 font-bold text-lg">Kalite ve Güven Taahhüdü</h3>
            <p className="text-slate-500 text-sm leading-relaxed mt-1">
              Tüm ürünlerimiz uluslararası kalite standartlarına uygun olarak üretilmekte, her aşamada titizlikle test edilmektedir.
              Müşteri memnuniyeti ve çevre duyarlılığı, üretim felsefemizin temelini oluşturur.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════════════
   STATS
   ══════════════════════════════════════════════════════════ */

function StatCard({ stat, inView }) {
  const count = useCountUp(stat.value, inView)
  return (
    <div className="text-center group">
      <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-500 transition-all duration-300">
        <stat.Icon size={28} className="text-blue-300 group-hover:text-white transition-colors duration-300" />
      </div>
      <div className="text-4xl md:text-5xl font-black text-white">{count}{stat.suffix}</div>
      <p className="text-blue-200 font-medium mt-2 text-sm">{stat.label}</p>
    </div>
  )
}

function Stats() {
  const [ref, inView] = useInView(0.3)
  return (
    <section ref={ref} className="relative py-24 px-6 overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0f172a 100%)' }}>
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(59,130,246,0.5) 0%, transparent 60%)',
      }} />
      <div className={`max-w-6xl mx-auto relative z-10 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="text-center mb-16">
          <p className="text-blue-400 text-sm font-semibold tracking-widest uppercase mb-3">Rakamlarla Puriva</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white">Güçlü Temeller, Kanıtlanmış Başarı</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat) => (
            <StatCard key={stat.label} stat={stat} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════════════
   PRODUCT CARD (Geliştirilmiş: hacim, kod, teknik doküman)
   ══════════════════════════════════════════════════════════ */

function ProductCard({ product }) {
  return (
    <div className="product-card bg-white rounded-2xl overflow-hidden border border-slate-100 flex flex-col">
      <div className="relative overflow-hidden h-52 group">
        <img src={product.img} alt={product.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
        <div className="absolute top-4 left-4">
          <span className="inline-flex items-center gap-1.5 bg-white/95 backdrop-blur-sm text-blue-600 text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm">
            <product.TagIcon size={11} />{product.tag}
          </span>
        </div>
        {product.badge && (
          <div className="absolute top-4 right-4">
            <span className={`text-white text-xs font-bold px-3 py-1 rounded-full ${product.badge === 'Yeni' ? 'bg-emerald-500' : 'bg-blue-600'}`}>
              {product.badge}
            </span>
          </div>
        )}
      </div>
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-slate-800 font-bold text-lg">{product.title}</h3>
          <span className="text-slate-400 text-xs font-mono">{product.code}</span>
        </div>
        <p className="text-slate-500 text-sm leading-relaxed flex-1">{product.desc}</p>
        <div className="flex items-center gap-2 mt-3 text-xs text-slate-400">
          <Package size={12} />
          <span>{product.volume}</span>
        </div>
        <div className="flex gap-2 mt-5">
          <a href="#iletisim" className="flex-1 inline-flex items-center justify-center gap-2 border-2 border-blue-600 text-blue-600 font-semibold py-2.5 rounded-xl hover:bg-blue-600 hover:text-white transition-all duration-200 text-sm group/btn">
            Detaylı Bilgi
            <ChevronRight size={14} className="group-hover/btn:translate-x-0.5 transition-transform" />
          </a>
          <button className="px-3 py-2.5 border-2 border-slate-200 rounded-xl text-slate-400 hover:border-blue-300 hover:text-blue-600 transition-all" title="Teknik Doküman">
            <FileText size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════
   PRODUCTS SECTION
   ══════════════════════════════════════════════════════════ */

function Products() {
  const [activeCategory, setActiveCategory] = useState('Tümü')
  const [ref, inView] = useInView()
  const filtered = activeCategory === 'Tümü' ? products : products.filter((p) => p.category === activeCategory)

  return (
    <section id="urunler" ref={ref} className="py-28 px-6" style={{
      background: 'linear-gradient(180deg, #f8fafc 0%, #ffffff 50%, #f8fafc 100%)',
    }}>
      <div className={`max-w-6xl mx-auto transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="text-center mb-12">
          <p className="text-blue-600 text-sm font-semibold tracking-widest uppercase mb-3">Ürün Portföyü</p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800">Profesyonel Kimyasal Çözümler</h2>
          <div className="w-16 h-1 bg-blue-600 mx-auto mt-5 rounded-full" />
          <p className="text-slate-500 text-sm max-w-xl mx-auto mt-4">
            Araç bakımından endüstriyel temizliğe, ihtiyacınıza özel formüle edilmiş yüksek performanslı ürünlerimizi keşfedin.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold border-2 transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-600/20'
                  : 'bg-white border-slate-200 text-slate-600 hover:border-blue-300 hover:text-blue-600'
              }`}>
              {cat}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="text-center mt-14">
          <a href="#iletisim" className="inline-flex items-center gap-2 bg-slate-800 hover:bg-blue-600 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 hover:shadow-xl">
            <Package size={18} /> Tam Ürün Kataloğunu İste
          </a>
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════════════
   CTA BANNER
   ══════════════════════════════════════════════════════════ */

function CtaBanner() {
  const [ref, inView] = useInView()
  return (
    <section ref={ref} className="relative py-20 px-6 overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #2563eb 0%, #1e40af 50%, #1e3a8a 100%)' }}>
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1449130320316-6ee5ffdb7f21?w=1920&q=40)',
        backgroundSize: 'cover', backgroundPosition: 'center',
      }} />
      <div className="absolute inset-0 opacity-[0.05]" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
      }} />
      <div className={`max-w-4xl mx-auto text-center relative z-10 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Projenize Özel Çözüm mü Arıyorsunuz?
        </h2>
        <p className="text-blue-100 text-base md:text-lg max-w-2xl mx-auto mb-8">
          Teknik ekibimiz ihtiyaçlarınızı analiz ederek size özel formülasyon ve fiyatlandırma sunmak için 24 saat içinde iletişime geçsin.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="#iletisim" className="bg-white text-blue-700 font-bold px-8 py-4 rounded-lg hover:bg-blue-50 transition-all duration-200 hover:shadow-xl inline-flex items-center gap-2">
            <MessageSquare size={18} /> Teklif Al
          </a>
          <a href="tel:+38923XXXXXX" className="border-2 border-white/30 hover:border-white/60 text-white font-medium px-8 py-4 rounded-lg transition-all inline-flex items-center gap-2">
            <Headphones size={18} /> +389 2X XXX XXXX
          </a>
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════════════
   TESTIMONIALS
   ══════════════════════════════════════════════════════════ */

function Testimonials() {
  const [ref, inView] = useInView()
  return (
    <section ref={ref} className="bg-white py-28 px-6">
      <div className={`max-w-6xl mx-auto transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="text-center mb-16">
          <p className="text-blue-600 text-sm font-semibold tracking-widest uppercase mb-3">Müşteri Görüşleri</p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800">Müşterilerimiz Ne Diyor?</h2>
          <div className="w-16 h-1 bg-blue-600 mx-auto mt-5 rounded-full" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div key={t.id} className="bg-slate-50 rounded-2xl p-8 border border-slate-100 relative hover:shadow-lg transition-shadow duration-300">
              <Quote size={40} className="text-blue-100 absolute top-6 right-6" />
              <div className="flex gap-1 mb-4">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} size={16} className="text-amber-400 fill-amber-400" />
                ))}
              </div>
              <p className="text-slate-600 text-sm leading-relaxed italic mb-6">&ldquo;{t.text}&rdquo;</p>
              <div className="flex items-center gap-3 pt-4 border-t border-slate-200">
                <img src={t.avatar} alt={t.name} className="w-11 h-11 rounded-full object-cover" loading="lazy" />
                <div>
                  <p className="text-slate-800 font-semibold text-sm">{t.name}</p>
                  <p className="text-slate-400 text-xs">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════════════
   BLOG
   ══════════════════════════════════════════════════════════ */

function BlogCard({ post }) {
  return (
    <article className="blog-card bg-white rounded-2xl overflow-hidden border border-slate-100 flex flex-col group">
      <div className="relative overflow-hidden h-48">
        <img src={post.img} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
        <div className="absolute top-4 left-4">
          <span className="inline-flex items-center gap-1.5 bg-blue-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full">
            <post.CategoryIcon size={11} />{post.category}
          </span>
        </div>
      </div>
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-4 text-xs text-slate-400 mb-3">
          <span className="flex items-center gap-1.5"><Calendar size={12} /> {post.date}</span>
          <span className="flex items-center gap-1.5"><Clock size={12} /> {post.readTime}</span>
        </div>
        <h3 className="text-slate-800 font-bold text-base leading-snug">{post.title}</h3>
        <p className="text-slate-500 text-sm leading-relaxed mt-2 flex-1">{post.excerpt}</p>
        <div className="mt-5">
          <span className="inline-flex items-center gap-1.5 text-blue-600 font-semibold text-sm cursor-pointer hover:gap-3 transition-all duration-200">
            Devamını Oku <ArrowRight size={15} />
          </span>
        </div>
      </div>
    </article>
  )
}

function Blog() {
  const [ref, inView] = useInView()
  return (
    <section id="blog" ref={ref} className="py-28 px-6" style={{ backgroundColor: '#f0f7ff' }}>
      <div className={`max-w-6xl mx-auto transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="text-center mb-16">
          <p className="text-blue-600 text-sm font-semibold tracking-widest uppercase mb-3">Blog &amp; Haberler</p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800">Sektörden Güncel Bilgiler</h2>
          <div className="w-16 h-1 bg-blue-600 mx-auto mt-5 rounded-full" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════════════
   İLETİŞİM FORMU
   ══════════════════════════════════════════════════════════ */

function ContactForm() {
  const [ref, inView] = useInView()
  return (
    <section ref={ref} className="bg-white py-28 px-6">
      <div className={`max-w-6xl mx-auto transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="text-center mb-16">
          <p className="text-blue-600 text-sm font-semibold tracking-widest uppercase mb-3">İletişim</p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800">Bizimle İletişime Geçin</h2>
          <div className="w-16 h-1 bg-blue-600 mx-auto mt-5 rounded-full" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Sol: İletişim bilgileri + harita */}
          <div className="lg:col-span-2">
            <div className="space-y-6 mb-8">
              {[
                { Icon: MapPin, label: 'Adres', value: 'Centar Belediyesi, Üsküp\nKuzey Makedonya' },
                { Icon: Phone, label: 'Telefon', value: '+389 2X XXX XXXX' },
                { Icon: Mail, label: 'E-posta', value: 'info@purivacem.com' },
                { Icon: Clock, label: 'Çalışma Saatleri', value: 'Pzt–Cum: 08:00–17:00' },
              ].map(({ Icon, label, value }) => (
                <div key={label} className="flex items-start gap-4">
                  <div className="w-11 h-11 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
                    <Icon size={18} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="text-slate-800 font-semibold text-sm">{label}</p>
                    <p className="text-slate-500 text-sm whitespace-pre-line">{value}</p>
                  </div>
                </div>
              ))}
            </div>
            {/* Harita placeholder */}
            <div className="rounded-2xl overflow-hidden border border-slate-200 h-48 bg-slate-100 flex items-center justify-center">
              <div className="text-center">
                <MapPin size={32} className="text-slate-300 mx-auto mb-2" />
                <p className="text-slate-400 text-sm font-medium">Üsküp, Kuzey Makedonya</p>
                <p className="text-slate-300 text-xs">Centar Belediyesi</p>
              </div>
            </div>
          </div>

          {/* Sağ: Form */}
          <div className="lg:col-span-3">
            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="text-slate-700 text-sm font-medium mb-1.5 block">Ad Soyad</label>
                  <input type="text" readOnly placeholder="Adınız Soyadınız" className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-blue-400 transition-colors cursor-default" />
                </div>
                <div>
                  <label className="text-slate-700 text-sm font-medium mb-1.5 block">E-posta</label>
                  <input type="email" readOnly placeholder="ornek@email.com" className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-blue-400 transition-colors cursor-default" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="text-slate-700 text-sm font-medium mb-1.5 block">Telefon</label>
                  <input type="tel" readOnly placeholder="+389 XX XXX XXXX" className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-blue-400 transition-colors cursor-default" />
                </div>
                <div>
                  <label className="text-slate-700 text-sm font-medium mb-1.5 block">Konu</label>
                  <select disabled className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-400 outline-none cursor-default appearance-none">
                    <option>Konu Seçiniz</option>
                    <option>Ürün Bilgisi</option>
                    <option>Teklif Talebi</option>
                    <option>Teknik Destek</option>
                    <option>Diğer</option>
                  </select>
                </div>
              </div>
              <div className="mb-4">
                <label className="text-slate-700 text-sm font-medium mb-1.5 block">Mesajınız</label>
                <textarea readOnly rows={4} placeholder="Mesajınızı buraya yazınız..." className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-blue-400 transition-colors cursor-default resize-none" />
              </div>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 rounded-xl transition-all duration-200 inline-flex items-center justify-center gap-2 cursor-default">
                <Send size={16} /> Mesaj Gönder
              </button>
              <p className="text-slate-400 text-xs text-center mt-4 flex items-center justify-center gap-1.5">
                <Clock size={12} /> Mesajınıza 24 saat içinde dönüş yapıyoruz
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════════════
   WHATSAPP BUTTON
   ══════════════════════════════════════════════════════════ */

function WhatsAppButton() {
  const [showTooltip, setShowTooltip] = useState(false)
  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      <div className={`bg-slate-900 text-white text-sm px-4 py-2 rounded-xl shadow-lg transition-all duration-200 whitespace-nowrap ${showTooltip ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2 pointer-events-none'}`}>
        WhatsApp ile yazın
      </div>
      <button onMouseEnter={() => setShowTooltip(true)} onMouseLeave={() => setShowTooltip(false)}
        className="relative w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center shadow-xl transition-all duration-200 hover:scale-110 cursor-pointer"
        aria-label="WhatsApp ile yazın">
        <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-25" />
        <svg viewBox="0 0 24 24" fill="white" className="w-7 h-7 relative z-10">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </button>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════
   SCROLL TO TOP
   ══════════════════════════════════════════════════════════ */

function ScrollToTop({ visible }) {
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={`fixed bottom-24 right-6 z-40 w-11 h-11 bg-slate-800 hover:bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
      aria-label="Yukarı çık"
    >
      <ChevronUp size={20} />
    </button>
  )
}

/* ══════════════════════════════════════════════════════════
   FOOTER (Wave divider + harita placeholder)
   ══════════════════════════════════════════════════════════ */

function Footer() {
  return (
    <footer id="iletisim" className="bg-slate-900 text-white wave-divider" style={{ marginTop: '60px' }}>
      <div className="max-w-6xl mx-auto px-6 pt-20 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <FlaskConical size={20} className="text-white" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-xl font-black tracking-widest text-blue-400">PURIVA</span>
                <span className="text-[9px] tracking-[0.35em] uppercase text-slate-500">Chemicals</span>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-xs">
              Endüstriyel temizlik ve oto bakım kimyasallarında Balkanlar&apos;ın güvenilir çözüm ortağı. 15 yıllık deneyim, 12 ülke.
            </p>
            <div className="flex gap-3">
              {[
                { Icon: Instagram, label: 'Instagram' },
                { Icon: Facebook, label: 'Facebook' },
                { Icon: Linkedin, label: 'LinkedIn' },
                { Icon: Youtube, label: 'YouTube' },
              ].map(({ Icon, label }) => (
                <button key={label} aria-label={label} className="w-9 h-9 bg-slate-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-all duration-200 text-slate-400 hover:text-white">
                  <Icon size={16} />
                </button>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">Ürünler</h4>
            <ul className="space-y-2.5">
              {['Active Foam Pro', 'Lastik Parlatıcı Jel', 'Cam Temizleyici Pro', 'Motor Temizleyici', 'Yağ Sökücü Konsantre'].map((item) => (
                <li key={item}><a href="#urunler" className="text-slate-400 hover:text-blue-400 text-sm transition-colors duration-200">{item}</a></li>
              ))}
              <li>
                <a href="#urunler" className="text-blue-400 hover:text-blue-300 text-sm font-semibold transition-colors duration-200 inline-flex items-center gap-1">
                  Tüm Ürünler <ArrowRight size={13} />
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">Kurumsal</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Hakkımızda', href: '#kurumsal' },
                { label: 'Blog & Haberler', href: '#blog' },
                { label: 'Kalite Politikası', href: '#kurumsal' },
                { label: 'Çevre Politikası', href: '#kurumsal' },
                { label: 'Kariyer', href: '#iletisim' },
              ].map((link) => (
                <li key={link.label}><a href={link.href} className="text-slate-400 hover:text-blue-400 text-sm transition-colors duration-200">{link.label}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">İletişim</h4>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-3 text-slate-400 text-sm">
                <MapPin size={15} className="text-blue-400 mt-0.5 shrink-0" />
                <span>Centar Belediyesi, Üsküp<br />Kuzey Makedonya</span>
              </li>
              <li className="flex items-center gap-3 text-slate-400 text-sm">
                <Phone size={15} className="text-blue-400 shrink-0" /> +389 2X XXX XXXX
              </li>
              <li className="flex items-center gap-3 text-slate-400 text-sm">
                <Mail size={15} className="text-blue-400 shrink-0" /> info@purivacem.com
              </li>
              <li className="flex items-center gap-3 text-slate-400 text-sm">
                <Clock size={15} className="text-blue-400 shrink-0" /> Pzt&ndash;Cum: 08:00&ndash;17:00
              </li>
            </ul>
            <p className="text-slate-500 text-xs uppercase tracking-wider mb-3 font-medium">Bülten</p>
            <div className="flex">
              <input type="email" placeholder="E-posta adresiniz" readOnly className="bg-slate-800 border border-slate-700 text-slate-300 text-sm px-4 py-2.5 rounded-l-lg flex-1 outline-none placeholder:text-slate-600 cursor-default min-w-0" />
              <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2.5 rounded-r-lg transition-colors shrink-0">
                <Send size={15} className="text-white" />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-14 border-t border-slate-800 pt-10">
          <p className="text-slate-500 text-xs uppercase tracking-wider mb-5 text-center font-medium">Sertifikalar &amp; Standartlar</p>
          <div className="flex flex-wrap justify-center gap-3">
            {certifications.map((cert) => (
              <div key={cert.label} className="bg-slate-800 border border-slate-700 rounded-xl px-5 py-3 flex items-center gap-2.5 hover:border-blue-500/30 transition-colors">
                <BadgeCheck size={16} className="text-blue-400 shrink-0" />
                <div>
                  <p className="text-white font-bold text-xs">{cert.label}</p>
                  <p className="text-slate-500 text-[10px]">{cert.sublabel}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-slate-800 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-xs">&copy; {new Date().getFullYear()} Puriva Chemicals. Tüm hakları saklıdır.</p>
          <div className="flex items-center gap-6">
            {['Gizlilik Politikası', 'KVKK', 'Çerez Politikası'].map((link) => (
              <span key={link} className="text-slate-600 hover:text-slate-400 text-xs transition-colors cursor-pointer">{link}</span>
            ))}
          </div>
          <p className="text-slate-600 text-xs">purivacem.com</p>
        </div>
      </div>
    </footer>
  )
}

/* ══════════════════════════════════════════════════════════
   APP
   ══════════════════════════════════════════════════════════ */

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('ana-sayfa')
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 60)
      setShowScrollTop(window.scrollY > 600)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sectionIds = ['ana-sayfa', 'kurumsal', 'urunler', 'blog', 'iletisim']
    const observers = sectionIds.map((id) => {
      const el = document.getElementById(id)
      if (!el) return null
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id) },
        { threshold: 0.3, rootMargin: '-80px 0px 0px 0px' }
      )
      obs.observe(el)
      return obs
    }).filter(Boolean)
    return () => observers.forEach((obs) => obs.disconnect())
  }, [])

  return (
    <>
      <Header isScrolled={isScrolled} menuOpen={menuOpen} setMenuOpen={setMenuOpen} activeSection={activeSection} />
      <main>
        <Hero />
        <Partners />
        <Kurumsal />
        <Stats />
        <Products />
        <CtaBanner />
        <Testimonials />
        <Blog />
        <ContactForm />
      </main>
      <Footer />
      <WhatsAppButton />
      <ScrollToTop visible={showScrollTop} />
    </>
  )
}
