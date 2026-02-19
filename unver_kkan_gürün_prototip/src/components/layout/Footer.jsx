import { Link } from 'react-router-dom'
import { MapPin, Phone, Mail, Clock, ArrowRight, Send, Instagram, Facebook, Linkedin, Youtube, FlaskConical, BadgeCheck } from 'lucide-react'
import { useLang, UI } from '../../context/LanguageContext.jsx'
import { db } from '../../admin/store/db.js'

const certifications = [
  { label: 'ISO 9001:2015', sublabel: { tr: 'Kalite Yönetimi', en: 'Quality Management' } },
  { label: 'REACH', sublabel: { tr: 'AB Kimyasal Uyumu', en: 'EU Chemical Compliance' } },
  { label: 'GHS / SDS', sublabel: { tr: 'Güvenlik Standartları', en: 'Safety Standards' } },
  { label: 'Eco Label', sublabel: { tr: 'Çevre Dostu Formül', en: 'Eco-Friendly Formula' } },
]

export default function Footer() {
  const { t } = useLang()
  const s = db.settings.get()
  const products = db.products.getAll().filter(p => p.active).slice(0, 5)

  return (
    <footer className="bg-slate-900 text-white wave-divider" style={{ marginTop: '60px' }}>
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
            <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-xs">{t(UI.footer.tagline)}</p>
            <div className="flex gap-3">
              {[
                { Icon: Instagram, label: 'Instagram', url: s.social?.instagram },
                { Icon: Facebook, label: 'Facebook', url: s.social?.facebook },
                { Icon: Linkedin, label: 'LinkedIn', url: s.social?.linkedin },
                { Icon: Youtube, label: 'YouTube', url: s.social?.youtube },
              ].map(({ Icon, label, url }) => (
                <a key={label} href={url || '#'} target={url ? '_blank' : undefined} rel="noopener noreferrer" aria-label={label} className="w-9 h-9 bg-slate-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-all duration-200 text-slate-400 hover:text-white">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">{t(UI.footer.productsTitle)}</h4>
            <ul className="space-y-2.5">
              {products.map(p => (
                <li key={p.id}><Link to={`/urunler/${p.slug}`} className="text-slate-400 hover:text-blue-400 text-sm transition-colors duration-200">{t(p.name)}</Link></li>
              ))}
              <li>
                <Link to="/urunler" className="text-blue-400 hover:text-blue-300 text-sm font-semibold transition-colors duration-200 inline-flex items-center gap-1">
                  {t(UI.footer.allProducts)} <ArrowRight size={13} />
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">{t(UI.footer.corporateTitle)}</h4>
            <ul className="space-y-2.5">
              {[
                { label: t(UI.footer.aboutUs), to: '/hakkimizda' },
                { label: t(UI.footer.blogNews), to: '/blog' },
                { label: t(UI.nav.services), to: '/hizmetler' },
                { label: t(UI.footer.qualityPolicy), to: '/hakkimizda' },
                { label: t(UI.footer.career), to: '/iletisim' },
              ].map(link => (
                <li key={link.label}><Link to={link.to} className="text-slate-400 hover:text-blue-400 text-sm transition-colors duration-200">{link.label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">{t(UI.footer.contactTitle)}</h4>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-3 text-slate-400 text-sm">
                <MapPin size={15} className="text-blue-400 mt-0.5 shrink-0" />
                <span>{s.address}</span>
              </li>
              <li className="flex items-center gap-3 text-slate-400 text-sm">
                <Phone size={15} className="text-blue-400 shrink-0" /> {s.phone}
              </li>
              <li className="flex items-center gap-3 text-slate-400 text-sm">
                <Mail size={15} className="text-blue-400 shrink-0" /> {s.email}
              </li>
              <li className="flex items-center gap-3 text-slate-400 text-sm">
                <Clock size={15} className="text-blue-400 shrink-0" /> {s.businessHours}
              </li>
            </ul>
            <p className="text-slate-500 text-xs uppercase tracking-wider mb-3 font-medium">{t(UI.footer.newsletter)}</p>
            <div className="flex">
              <input type="email" placeholder={t(UI.contact.email)} className="bg-slate-800 border border-slate-700 text-slate-300 text-sm px-4 py-2.5 rounded-l-lg flex-1 outline-none placeholder:text-slate-600 min-w-0" />
              <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2.5 rounded-r-lg transition-colors shrink-0">
                <Send size={15} className="text-white" />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-14 border-t border-slate-800 pt-10">
          <p className="text-slate-500 text-xs uppercase tracking-wider mb-5 text-center font-medium">{t(UI.footer.certTitle)}</p>
          <div className="flex flex-wrap justify-center gap-3">
            {certifications.map(cert => (
              <div key={cert.label} className="bg-slate-800 border border-slate-700 rounded-xl px-5 py-3 flex items-center gap-2.5 hover:border-blue-500/30 transition-colors">
                <BadgeCheck size={16} className="text-blue-400 shrink-0" />
                <div>
                  <p className="text-white font-bold text-xs">{cert.label}</p>
                  <p className="text-slate-500 text-[10px]">{t(cert.sublabel)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-slate-800 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-xs">&copy; {new Date().getFullYear()} Puriva Chemicals. {t(UI.footer.rights)}</p>
          <div className="flex items-center gap-6">
            {[t(UI.footer.privacy), 'KVKK', t(UI.footer.cookie)].map(link => (
              <span key={link} className="text-slate-600 hover:text-slate-400 text-xs transition-colors cursor-pointer">{link}</span>
            ))}
          </div>
          <p className="text-slate-600 text-xs">purivacem.com</p>
        </div>
      </div>
    </footer>
  )
}
