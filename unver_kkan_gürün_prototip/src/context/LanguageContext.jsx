import { createContext, useContext, useState } from 'react'

const LanguageContext = createContext()

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem('puriva_lang') || 'tr')

  const toggleLang = () => {
    const next = lang === 'tr' ? 'en' : 'tr'
    localStorage.setItem('puriva_lang', next)
    setLang(next)
  }

  const t = (obj) => {
    if (!obj) return ''
    if (typeof obj === 'string') return obj
    return obj[lang] || obj.tr || ''
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLang = () => useContext(LanguageContext)

export const UI = {
  nav: {
    home: { tr: 'Ana Sayfa', en: 'Home' },
    about: { tr: 'Hakkımızda', en: 'About Us' },
    products: { tr: 'Ürünler', en: 'Products' },
    services: { tr: 'Hizmetler', en: 'Services' },
    blog: { tr: 'Blog', en: 'Blog' },
    contact: { tr: 'İletişim', en: 'Contact' },
    cta: { tr: 'Bize Ulaşın', en: 'Contact Us' },
  },
  hero: {
    subtitle: { tr: "Kuzey Makedonya'dan Balkanlara", en: 'From North Macedonia to the Balkans' },
    title1: { tr: 'Endüstriyel', en: 'Industrial' },
    title2: { tr: 'Temizlikte', en: 'Cleaning' },
    title3: { tr: 'Güvenilir Güç', en: 'Reliable Power' },
    desc: { tr: "Oto bakım ve endüstriyel kimyasallarda yenilikçi formüllerle Balkanlar'ın güvenilir çözüm ortağıyız.", en: 'Your reliable partner in the Balkans with innovative formulas for auto care and industrial chemicals.' },
    ctaProducts: { tr: 'Ürünleri İncele', en: 'Explore Products' },
    ctaVideo: { tr: 'Tanıtım Filmi', en: 'Intro Video' },
  },
  about: {
    subtitle: { tr: 'Hikayemiz', en: 'Our Story' },
    title1: { tr: '15 Yıllık Deneyimle', en: 'With 15 Years of Experience' },
    title2: { tr: "Balkanlar'ın Güveni", en: 'Trusted in the Balkans' },
    desc: { tr: "2010 yılında Üsküp'te kurulan Puriva Chemicals, bugün 12 ülkede 500'den fazla profesyonel müşteriye hizmet vermektedir.", en: 'Founded in Skopje in 2010, Puriva Chemicals now serves over 500 professional clients in 12 countries.' },
    qualityTitle: { tr: 'Kalite ve Güven Taahhüdü', en: 'Quality and Trust Commitment' },
    qualityDesc: { tr: 'Tüm ürünlerimiz uluslararası kalite standartlarına uygun olarak üretilmekte, her aşamada titizlikle test edilmektedir.', en: 'All our products are manufactured in compliance with international quality standards and meticulously tested at every stage.' },
  },
  products: {
    subtitle: { tr: 'Ürün Portföyü', en: 'Product Portfolio' },
    title: { tr: 'Profesyonel Kimyasal Çözümler', en: 'Professional Chemical Solutions' },
    desc: { tr: 'Araç bakımından endüstriyel temizliğe, ihtiyacınıza özel formüle edilmiş yüksek performanslı ürünlerimizi keşfedin.', en: 'Discover our high-performance products specially formulated for your needs, from auto care to industrial cleaning.' },
    all: { tr: 'Tümü', en: 'All' },
    catalogCta: { tr: 'Tam Ürün Kataloğunu İste', en: 'Request Full Product Catalog' },
    detail: { tr: 'Detaylı Bilgi', en: 'Details' },
    techDoc: { tr: 'Teknik Doküman', en: 'Technical Document' },
    requestQuote: { tr: 'Teklif Al', en: 'Request Quote' },
    relatedProducts: { tr: 'İlgili Ürünler', en: 'Related Products' },
    volume: { tr: 'Hacim', en: 'Volume' },
    code: { tr: 'Ürün Kodu', en: 'Product Code' },
    category: { tr: 'Kategori', en: 'Category' },
    featured: { tr: 'Öne Çıkan', en: 'Featured' },
    bestSeller: { tr: 'Çok Satan', en: 'Best Seller' },
    new: { tr: 'Yeni', en: 'New' },
  },
  services: {
    subtitle: { tr: 'Hizmetlerimiz', en: 'Our Services' },
    title: { tr: 'Profesyonel Çözümler', en: 'Professional Solutions' },
    desc: { tr: 'Müşterilerimize sunduğumuz kapsamlı hizmetlerimiz.', en: 'Our comprehensive services for our customers.' },
  },
  blog: {
    subtitle: { tr: 'Blog & Haberler', en: 'Blog & News' },
    title: { tr: 'Sektörden Güncel Bilgiler', en: 'Industry Updates' },
    readMore: { tr: 'Devamını Oku', en: 'Read More' },
    readTime: { tr: 'dk okuma', en: 'min read' },
    relatedPosts: { tr: 'İlgili Yazılar', en: 'Related Posts' },
    allPosts: { tr: 'Tüm Yazılar', en: 'All Posts' },
  },
  contact: {
    subtitle: { tr: 'İletişim', en: 'Contact' },
    title: { tr: 'Bizimle İletişime Geçin', en: 'Get in Touch' },
    name: { tr: 'Ad Soyad', en: 'Full Name' },
    email: { tr: 'E-posta', en: 'Email' },
    phone: { tr: 'Telefon', en: 'Phone' },
    subject: { tr: 'Konu', en: 'Subject' },
    message: { tr: 'Mesajınız', en: 'Your Message' },
    send: { tr: 'Mesaj Gönder', en: 'Send Message' },
    success: { tr: 'Mesajınız başarıyla gönderildi. En kısa sürede dönüş yapacağız.', en: 'Your message has been sent successfully. We will get back to you soon.' },
    responseTime: { tr: 'Mesajınıza 24 saat içinde dönüş yapıyoruz', en: 'We respond to your message within 24 hours' },
    subjects: {
      select: { tr: 'Konu Seçiniz', en: 'Select Subject' },
      product: { tr: 'Ürün Bilgisi', en: 'Product Info' },
      quote: { tr: 'Teklif Talebi', en: 'Quote Request' },
      support: { tr: 'Teknik Destek', en: 'Technical Support' },
      other: { tr: 'Diğer', en: 'Other' },
    },
    address: { tr: 'Adres', en: 'Address' },
    hours: { tr: 'Çalışma Saatleri', en: 'Business Hours' },
  },
  cta: {
    title: { tr: 'Projenize Özel Çözüm mü Arıyorsunuz?', en: 'Looking for a Custom Solution?' },
    desc: { tr: 'Teknik ekibimiz ihtiyaçlarınızı analiz ederek size özel formülasyon ve fiyatlandırma sunmak için 24 saat içinde iletişime geçsin.', en: 'Our technical team will contact you within 24 hours to analyze your needs and offer custom formulation and pricing.' },
    quote: { tr: 'Teklif Al', en: 'Get a Quote' },
  },
  stats: {
    subtitle: { tr: 'Rakamlarla Puriva', en: 'Puriva in Numbers' },
    title: { tr: 'Güçlü Temeller, Kanıtlanmış Başarı', en: 'Strong Foundations, Proven Success' },
    products: { tr: 'Ürün Çeşidi', en: 'Products' },
    countries: { tr: 'Ülke', en: 'Countries' },
    clients: { tr: 'Aktif Müşteri', en: 'Active Clients' },
    experience: { tr: 'Yıl Tecrübe', en: 'Years Experience' },
  },
  testimonials: {
    subtitle: { tr: 'Müşteri Görüşleri', en: 'Testimonials' },
    title: { tr: 'Müşterilerimiz Ne Diyor?', en: 'What Our Clients Say' },
  },
  partners: {
    title: { tr: 'İş Ortaklarımız & Güvendikleri Markalar', en: 'Our Partners & Trusted Brands' },
  },
  footer: {
    tagline: { tr: "Endüstriyel temizlik ve oto bakım kimyasallarında Balkanlar'ın güvenilir çözüm ortağı.", en: "Reliable partner in the Balkans for industrial cleaning and auto care chemicals." },
    productsTitle: { tr: 'Ürünler', en: 'Products' },
    corporateTitle: { tr: 'Kurumsal', en: 'Corporate' },
    contactTitle: { tr: 'İletişim', en: 'Contact' },
    newsletter: { tr: 'Bülten', en: 'Newsletter' },
    allProducts: { tr: 'Tüm Ürünler', en: 'All Products' },
    aboutUs: { tr: 'Hakkımızda', en: 'About Us' },
    blogNews: { tr: 'Blog & Haberler', en: 'Blog & News' },
    qualityPolicy: { tr: 'Kalite Politikası', en: 'Quality Policy' },
    envPolicy: { tr: 'Çevre Politikası', en: 'Environmental Policy' },
    career: { tr: 'Kariyer', en: 'Career' },
    certTitle: { tr: 'Sertifikalar & Standartlar', en: 'Certificates & Standards' },
    privacy: { tr: 'Gizlilik Politikası', en: 'Privacy Policy' },
    cookie: { tr: 'Çerez Politikası', en: 'Cookie Policy' },
    rights: { tr: 'Tüm hakları saklıdır.', en: 'All rights reserved.' },
  },
  notFound: {
    title: { tr: 'Sayfa Bulunamadı', en: 'Page Not Found' },
    desc: { tr: 'Aradığınız sayfa mevcut değil veya taşınmış olabilir.', en: 'The page you are looking for does not exist or may have been moved.' },
    back: { tr: 'Ana Sayfaya Dön', en: 'Back to Home' },
  },
  discover: { tr: 'Keşfet', en: 'Discover' },
}
