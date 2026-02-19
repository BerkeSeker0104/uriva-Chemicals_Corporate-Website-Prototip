import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react'
import { useInView } from '../../hooks/useInView.js'
import { useLang, UI } from '../../context/LanguageContext.jsx'
import { db } from '../../admin/store/db.js'
import PageHero from '../../components/ui/PageHero.jsx'

export default function ContactPage() {
  const { t } = useLang()

  return (
    <>
      <PageHero
        title={t(UI.contact.title)}
        subtitle={t(UI.contact.subtitle)}
        breadcrumbs={[{ label: t(UI.nav.contact) }]}
      />
      <ContactSection t={t} />
      <MapSection />
    </>
  )
}

function ContactSection({ t }) {
  const [ref, inView] = useInView()
  const s = db.settings.get()
  const [searchParams] = useSearchParams()
  const prefilledProduct = searchParams.get('urun')

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: prefilledProduct ? t(UI.contact.subjects.quote) : '',
    message: prefilledProduct ? t({ tr: `"${prefilledProduct}" ürünü hakkında teklif almak istiyorum.`, en: `I would like to get a quote for "${prefilledProduct}".` }) : '',
  })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    db.leads.create({
      ...form,
      status: 'unread',
    })
    setSent(true)
    setForm({ name: '', email: '', phone: '', subject: '', message: '' })
  }

  const contactInfo = [
    { Icon: MapPin, label: t(UI.contact.address), value: s.address },
    { Icon: Phone, label: t(UI.contact.phone), value: s.phone, href: `tel:${s.phone}` },
    { Icon: Mail, label: t(UI.contact.email), value: s.email, href: `mailto:${s.email}` },
    { Icon: Clock, label: t(UI.contact.hours), value: s.businessHours },
  ]

  return (
    <section ref={ref} className="py-20 px-6 bg-white">
      <div className={`max-w-6xl mx-auto transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">{t(UI.contact.title)}</h2>
            {contactInfo.map(info => (
              <div key={info.label} className="flex items-start gap-4">
                <div className="w-11 h-11 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
                  <info.Icon className="text-blue-600" size={20} />
                </div>
                <div>
                  <p className="text-slate-800 font-semibold text-sm">{info.label}</p>
                  {info.href ? (
                    <a href={info.href} className="text-slate-500 text-sm hover:text-blue-600 transition-colors">{info.value}</a>
                  ) : (
                    <p className="text-slate-500 text-sm">{info.value}</p>
                  )}
                </div>
              </div>
            ))}
            <div className="bg-blue-50 rounded-xl p-5 mt-8">
              <p className="text-blue-800 text-sm font-medium">{t(UI.contact.responseTime)}</p>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            {sent ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center">
                <CheckCircle size={48} className="text-emerald-500 mx-auto mb-4" />
                <p className="text-emerald-700 font-semibold text-lg">{t(UI.contact.success)}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-slate-50 rounded-2xl p-8 border border-slate-100">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">{t(UI.contact.name)} *</label>
                    <input type="text" required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">{t(UI.contact.email)} *</label>
                    <input type="email" required value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white" />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">{t(UI.contact.phone)}</label>
                    <input type="tel" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">{t(UI.contact.subject)} *</label>
                    <select required value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))} className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                      <option value="">{t(UI.contact.subjects.select)}</option>
                      <option value={t(UI.contact.subjects.product)}>{t(UI.contact.subjects.product)}</option>
                      <option value={t(UI.contact.subjects.quote)}>{t(UI.contact.subjects.quote)}</option>
                      <option value={t(UI.contact.subjects.support)}>{t(UI.contact.subjects.support)}</option>
                      <option value={t(UI.contact.subjects.other)}>{t(UI.contact.subjects.other)}</option>
                    </select>
                  </div>
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-slate-700 mb-1">{t(UI.contact.message)} *</label>
                  <textarea required value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} rows={5} className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white resize-none" />
                </div>
                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-xl transition-all duration-200 hover:shadow-xl flex items-center justify-center gap-2">
                  <Send size={18} /> {t(UI.contact.send)}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

function MapSection() {
  return (
    <section className="h-80 bg-slate-100">
      <iframe
        title="Puriva Location"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d47650.01!2d21.42!3d41.99!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1354143ee6c13a85%3A0x202e3a7ae5cd4a76!2sSkopje%2C%20North%20Macedonia!5e0!3m2!1sen!2s!4v1700000000000"
        className="w-full h-full border-0"
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </section>
  )
}
