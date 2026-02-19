import { useState, useEffect } from 'react'
import { Save, CheckCircle } from 'lucide-react'
import { db } from '../store/db.js'
import ImageUpload from '../components/ImageUpload.jsx'

export default function GeneralSettings() {
  const [form, setForm] = useState(db.settings.get())
  const [saved, setSaved] = useState(false)

  const update = (key, value) => setForm(prev => ({ ...prev, [key]: value }))
  const updateSocial = (key, value) => setForm(prev => ({ ...prev, social: { ...prev.social, [key]: value } }))

  const handleSave = () => {
    db.settings.set(form)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Genel Ayarlar</h1>
        <button onClick={handleSave} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-medium hover:bg-blue-700">
          {saved ? <CheckCircle className="w-4 h-4" /> : <Save className="w-4 h-4" />}
          {saved ? 'Kaydedildi' : 'Kaydet'}
        </button>
      </div>

      <div className="space-y-6">
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="font-semibold text-slate-800 mb-4">İletişim Bilgileri</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Telefon" value={form.phone} onChange={v => update('phone', v)} />
            <Field label="E-posta" value={form.email} onChange={v => update('email', v)} />
            <Field label="Adres" value={form.address} onChange={v => update('address', v)} className="md:col-span-2" />
            <Field label="WhatsApp Numarası" value={form.whatsapp} onChange={v => update('whatsapp', v)} />
            <Field label="Çalışma Saatleri" value={form.businessHours} onChange={v => update('businessHours', v)} />
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="font-semibold text-slate-800 mb-4">Sosyal Medya</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Instagram" value={form.social.instagram} onChange={v => updateSocial('instagram', v)} placeholder="https://instagram.com/..." />
            <Field label="Facebook" value={form.social.facebook} onChange={v => updateSocial('facebook', v)} placeholder="https://facebook.com/..." />
            <Field label="LinkedIn" value={form.social.linkedin} onChange={v => updateSocial('linkedin', v)} placeholder="https://linkedin.com/..." />
            <Field label="YouTube" value={form.social.youtube} onChange={v => updateSocial('youtube', v)} placeholder="https://youtube.com/..." />
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="font-semibold text-slate-800 mb-4">Görsel Ayarları</h2>
          <div className="flex gap-8">
            <ImageUpload label="Logo" value={form.logoUrl} onChange={v => update('logoUrl', v)} />
            <ImageUpload label="Favicon" value={form.faviconUrl} onChange={v => update('faviconUrl', v)} />
          </div>
        </div>
      </div>
    </div>
  )
}

function Field({ label, value, onChange, placeholder, className = '' }) {
  return (
    <div className={className}>
      <label className="block text-sm font-medium text-slate-700 mb-1.5">{label}</label>
      <input
        type="text"
        value={value || ''}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  )
}
