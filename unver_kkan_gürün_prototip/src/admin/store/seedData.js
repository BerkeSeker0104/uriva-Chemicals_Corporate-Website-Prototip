const uid = () => crypto.randomUUID()

export const seedSettings = {
  phone: '+389 2X XXX XXXX',
  email: 'info@purivacem.com',
  address: 'Centar Belediyesi, Üsküp, Kuzey Makedonya',
  whatsapp: '+389XXXXXXXXX',
  businessHours: 'Pzt–Cum: 08:00 – 18:00',
  social: {
    instagram: '',
    facebook: '',
    linkedin: '',
    youtube: '',
  },
  logoUrl: '',
  faviconUrl: '',
}

export const seedLanguages = {
  tr: { active: true, label: 'Türkçe' },
  en: { active: false, label: 'English' },
}

const catOtoBakimId = uid()
const catEndustriyelId = uid()

export const seedCategories = [
  { id: catOtoBakimId, name: { tr: 'Oto Bakım', en: 'Auto Care' }, sortOrder: 0, active: true },
  { id: catEndustriyelId, name: { tr: 'Endüstriyel', en: 'Industrial' }, sortOrder: 1, active: true },
]

export const seedProducts = [
  {
    id: uid(), slug: 'active-foam-pro', category: catOtoBakimId,
    name: { tr: 'Active Foam Pro', en: 'Active Foam Pro' },
    shortDesc: { tr: 'Yüksek köpüklü, hızlı etkili profesyonel araç yıkama formülü.', en: 'High foam, fast action professional car wash formula.' },
    detailDesc: { tr: 'Kirleri anında çözer, boyayı korur. Profesyonel oto yıkamacılar için tasarlandı.', en: 'Instantly dissolves dirt and protects paint. Designed for professional car washes.' },
    mainImage: 'https://images.unsplash.com/photo-1761312834150-4beefff097a7?w=800&q=80',
    gallery: [], pdfs: { tds: '', msds: '' }, brandId: '',
    volume: '5L / 20L', code: 'PUR-AF-001', tag: 'Temizlik',
    badge: 'Çok Satan', sortOrder: 0, featured: true, active: true,
    createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
  },
  {
    id: uid(), slug: 'lastik-parlatici-jel', category: catOtoBakimId,
    name: { tr: 'Lastik Parlatıcı Jel', en: 'Tire Shine Gel' },
    shortDesc: { tr: 'Uzun süreli parlaklık ve UV koruması sağlayan silikon bazlı ürün.', en: 'Silicon-based product providing long-lasting shine and UV protection.' },
    detailDesc: { tr: 'Profesyonel lastik bakım ürünü. Uzun süreli parlaklık ve UV koruması sağlar.', en: 'Professional tire care product. Provides long-lasting shine and UV protection.' },
    mainImage: 'https://images.unsplash.com/photo-1594500067632-ae9e9ef82ec5?w=800&q=80',
    gallery: [], pdfs: { tds: '', msds: '' }, brandId: '',
    volume: '1L / 5L', code: 'PUR-LP-002', tag: 'Bakım',
    badge: null, sortOrder: 1, featured: false, active: true,
    createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
  },
  {
    id: uid(), slug: 'cam-temizleyici-pro', category: catOtoBakimId,
    name: { tr: 'Cam Temizleyici Pro', en: 'Glass Cleaner Pro' },
    shortDesc: { tr: 'Leke ve yağ bırakmayan, kristal berraklığında görüş sağlayan formül.', en: 'Crystal clear formula that leaves no stains or grease.' },
    detailDesc: { tr: 'Cam yüzeylerinde leke ve yağ bırakmadan kristal berraklığında görüş sağlar.', en: 'Provides crystal clear visibility on glass surfaces without leaving stains or grease.' },
    mainImage: 'https://images.unsplash.com/photo-1550572017-4b7a301b9d81?w=800&q=80',
    gallery: [], pdfs: { tds: '', msds: '' }, brandId: '',
    volume: '500ml / 5L', code: 'PUR-CT-003', tag: 'Temizlik',
    badge: null, sortOrder: 2, featured: false, active: true,
    createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
  },
  {
    id: uid(), slug: 'ic-mekan-temizleyici', category: catOtoBakimId,
    name: { tr: 'İç Mekan Temizleyici', en: 'Interior Cleaner' },
    shortDesc: { tr: 'Koltuk, torpido ve plastik yüzeyler için hassas formül.', en: 'Gentle formula for seats, dashboard and plastic surfaces.' },
    detailDesc: { tr: 'Koltuk, torpido ve plastik yüzeyleri için hassas, koku bırakmayan güvenli formül.', en: 'Safe, odorless formula for seats, dashboard and plastic surfaces.' },
    mainImage: 'https://images.unsplash.com/photo-1605437241278-c1806d14a4d9?w=800&q=80',
    gallery: [], pdfs: { tds: '', msds: '' }, brandId: '',
    volume: '750ml / 5L', code: 'PUR-IM-004', tag: 'İç Mekan',
    badge: null, sortOrder: 3, featured: false, active: true,
    createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
  },
  {
    id: uid(), slug: 'motor-temizleyici', category: catEndustriyelId,
    name: { tr: 'Motor Temizleyici', en: 'Engine Cleaner' },
    shortDesc: { tr: 'Motor bölgesi için güvenli dekontaminasyon solüsyonu.', en: 'Safe decontamination solution for engine area.' },
    detailDesc: { tr: 'Motor ve motor bölgesi için güvenli, çevre dostu güçlü dekontaminasyon solüsyonu.', en: 'Safe, eco-friendly powerful decontamination solution for engines.' },
    mainImage: 'https://images.unsplash.com/photo-1624744542497-27dfabc202b4?w=800&q=80',
    gallery: [], pdfs: { tds: '', msds: '' }, brandId: '',
    volume: '1L / 5L', code: 'PUR-MT-005', tag: 'Endüstriyel',
    badge: null, sortOrder: 4, featured: false, active: true,
    createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
  },
  {
    id: uid(), slug: 'yag-sokucu-konsantre', category: catEndustriyelId,
    name: { tr: 'Yağ Sökücü Konsantre', en: 'Degreaser Concentrate' },
    shortDesc: { tr: 'Ağır yağ ve gres birikintilerini hızla çözen güçlü konsantrat.', en: 'Powerful concentrate that quickly dissolves heavy grease buildup.' },
    detailDesc: { tr: 'Endüstriyel yüzeylerdeki ağır yağ ve gres birikintilerini hızla çözen güçlü konsantrat.', en: 'Powerful concentrate that quickly dissolves heavy oil and grease buildup on industrial surfaces.' },
    mainImage: 'https://images.unsplash.com/photo-1581093588401-fbb62a02f120?w=800&q=80',
    gallery: [], pdfs: { tds: '', msds: '' }, brandId: '',
    volume: '5L / 20L', code: 'PUR-YS-006', tag: 'Endüstriyel',
    badge: 'Yeni', sortOrder: 5, featured: false, active: true,
    createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
  },
  {
    id: uid(), slug: 'genel-amacli-dekontaminant', category: catEndustriyelId,
    name: { tr: 'Genel Amaçlı Dekontaminant', en: 'General Purpose Decontaminant' },
    shortDesc: { tr: 'Tüm sert yüzeyler için pH dengeli çok amaçlı temizleyici.', en: 'pH balanced multi-purpose cleaner for all hard surfaces.' },
    detailDesc: { tr: 'Fabrika zeminleri, ekipmanlar ve tüm sert yüzeyler için pH dengeli çok amaçlı temizleyici.', en: 'pH balanced multi-purpose cleaner for factory floors, equipment and all hard surfaces.' },
    mainImage: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=800&q=80',
    gallery: [], pdfs: { tds: '', msds: '' }, brandId: '',
    volume: '5L / 25L', code: 'PUR-GD-007', tag: 'Çok Amaçlı',
    badge: null, sortOrder: 6, featured: false, active: true,
    createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
  },
]

export const seedServices = [
  { id: uid(), name: { tr: 'Endüstriyel Temizlik Çözümleri', en: 'Industrial Cleaning Solutions' }, description: { tr: 'Fabrika ve üretim tesisleri için profesyonel temizlik kimyasalları.', en: 'Professional cleaning chemicals for factories and production facilities.' }, sortOrder: 0, active: true },
  { id: uid(), name: { tr: 'Oto Bakım Ürünleri', en: 'Auto Care Products' }, description: { tr: 'Profesyonel araç yıkama ve bakım ürünleri.', en: 'Professional car wash and care products.' }, sortOrder: 1, active: true },
  { id: uid(), name: { tr: 'Özel Formülasyon', en: 'Custom Formulation' }, description: { tr: 'Müşteri ihtiyaçlarına özel kimyasal formülasyon geliştirme.', en: 'Custom chemical formulation development for client needs.' }, sortOrder: 2, active: true },
  { id: uid(), name: { tr: 'Teknik Danışmanlık', en: 'Technical Consulting' }, description: { tr: 'Kimyasal kullanım ve uygulama konusunda uzman danışmanlık.', en: 'Expert consulting on chemical usage and application.' }, sortOrder: 3, active: true },
]

export const seedBrands = [
  { id: uid(), name: 'BalkanChem', logoUrl: '', link: '', sortOrder: 0, active: true },
  { id: uid(), name: 'AutoWash Pro', logoUrl: '', link: '', sortOrder: 1, active: true },
  { id: uid(), name: 'CleanTech MK', logoUrl: '', link: '', sortOrder: 2, active: true },
  { id: uid(), name: 'EuroChem Balkan', logoUrl: '', link: '', sortOrder: 3, active: true },
  { id: uid(), name: 'ProDetailing', logoUrl: '', link: '', sortOrder: 4, active: true },
  { id: uid(), name: 'IndustriClean', logoUrl: '', link: '', sortOrder: 5, active: true },
  { id: uid(), name: 'AquaPure Systems', logoUrl: '', link: '', sortOrder: 6, active: true },
  { id: uid(), name: 'NovaChem', logoUrl: '', link: '', sortOrder: 7, active: true },
]

export const seedBlogPosts = [
  {
    id: uid(),
    title: { tr: 'Araç Yıkamada Doğru Köpük Seçimi', en: 'Choosing the Right Foam for Car Washing' },
    content: { tr: 'Aktif köpük sistemlerinde pH dengesi, boya güvenliği ve durulama kolaylığı nasıl değerlendirilir? Profesyoneller için kapsamlı rehber.', en: 'How to evaluate pH balance, paint safety and rinsing ease in active foam systems? A comprehensive guide for professionals.' },
    excerpt: { tr: 'Aktif köpük sistemlerinde pH dengesi, boya güvenliği ve durulama kolaylığı...', en: 'pH balance, paint safety and rinsing ease in active foam systems...' },
    coverImage: 'https://images.unsplash.com/photo-1697252312641-561fba5494c8?w=800&q=80',
    category: 'Oto Bakım', tags: ['köpük', 'yıkama'],
    publishDate: '2025-01-12', status: 'published', readTime: '5 dk okuma',
    seo: { metaTitle: { tr: '', en: '' }, metaDescription: { tr: '', en: '' } },
    createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
  },
  {
    id: uid(),
    title: { tr: 'Endüstriyel Temizlikte 2025 Trendleri', en: 'Industrial Cleaning Trends in 2025' },
    content: { tr: 'Biyobozunur formüller, konsantre kullanım ve çevre odaklı sertifikasyon süreçleri endüstrinin gündeminde.', en: 'Biodegradable formulas, concentrate usage and eco-focused certification processes are on the industry agenda.' },
    excerpt: { tr: 'Biyobozunur formüller, konsantre kullanım ve çevre odaklı sertifikasyon...', en: 'Biodegradable formulas, concentrate usage and eco-focused certification...' },
    coverImage: 'https://images.unsplash.com/photo-1581093588401-fbb62a02f120?w=800&q=80',
    category: 'Endüstriyel', tags: ['trend', 'endüstriyel'],
    publishDate: '2024-11-28', status: 'published', readTime: '7 dk okuma',
    seo: { metaTitle: { tr: '', en: '' }, metaDescription: { tr: '', en: '' } },
    createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
  },
  {
    id: uid(),
    title: { tr: 'Doğru Dekontaminasyon Süreci', en: 'The Right Decontamination Process' },
    content: { tr: 'Araç yüzeyinde kalan demir tozu, katran ve böcek kalıntılarını güvenle temizleme rehberi.', en: 'A guide to safely cleaning iron dust, tar and insect residues from vehicle surfaces.' },
    excerpt: { tr: 'Araç yüzeyinde kalan demir tozu, katran ve böcek kalıntılarını güvenle temizleme...', en: 'Safely cleaning iron dust, tar and insect residues from vehicle surfaces...' },
    coverImage: 'https://images.unsplash.com/photo-1608037222022-62649819f8aa?w=800&q=80',
    category: 'Teknik', tags: ['dekontaminasyon', 'bakım'],
    publishDate: '2024-10-15', status: 'published', readTime: '6 dk okuma',
    seo: { metaTitle: { tr: '', en: '' }, metaDescription: { tr: '', en: '' } },
    createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
  },
]

export const seedLeads = [
  { id: uid(), name: 'Ahmet Yılmaz', email: 'ahmet@example.com', phone: '+389 70 123 456', subject: 'Teklif Talebi', message: 'Active Foam Pro ürününüz için 20L ambalajda toptan fiyat teklifi almak istiyorum. Aylık 50 adet civarında kullanım öngörüyoruz.', status: 'unread', createdAt: '2025-02-15T10:30:00Z' },
  { id: uid(), name: 'Mehmet Demir', email: 'mehmet@example.com', phone: '+389 71 234 567', subject: 'Teknik Destek', message: 'Yağ Sökücü Konsantre ürününün seyreltme oranları hakkında bilgi almak istiyorum. Endüstriyel zemin temizliği için kullanacağız.', status: 'unread', createdAt: '2025-02-14T14:15:00Z' },
  { id: uid(), name: 'Elena Petrovska', email: 'elena@example.com', phone: '+389 72 345 678', subject: 'Ürün Bilgisi', message: 'Cam Temizleyici Pro ürününüzün MSDS belgesine ihtiyacım var. Ayrıca farklı ambalaj seçenekleri var mı?', status: 'read', createdAt: '2025-02-10T09:00:00Z' },
  { id: uid(), name: 'İsmail Karadağ', email: 'ismail@example.com', phone: '+389 70 456 789', subject: 'Teklif Talebi', message: 'Oto yıkama tesisimiz için komple ürün seti teklifi almak istiyoruz. 3 şubemiz var ve toplu sipariş düşünüyoruz.', status: 'read', createdAt: '2025-02-08T16:45:00Z' },
  { id: uid(), name: 'Marija Stojanovic', email: 'marija@example.com', phone: '+389 71 567 890', subject: 'Diğer', message: 'Distribütörlük başvurusu yapmak istiyorum. Sırbistan bölgesi için yetkili bayi olmak istiyoruz.', status: 'unread', createdAt: '2025-02-18T11:20:00Z' },
]
