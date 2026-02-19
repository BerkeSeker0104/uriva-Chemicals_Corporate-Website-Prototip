import { useState } from 'react'
import { Save, CheckCircle, Info } from 'lucide-react'
import { db } from '../store/db.js'

export default function LanguageSettings() {
  const [langs, setLangs] = useState(db.languages.get())
  const [saved, setSaved] = useState(false)

  const toggle = (key) => {
    if (key === 'tr') return // TR always active
    setLangs(prev => ({ ...prev, [key]: { ...prev[key], active: !prev[key].active } }))
  }

  const handleSave = () => {
    db.languages.set(langs)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Dil Yönetimi</h1>
        <button onClick={handleSave} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-medium hover:bg-blue-700">
          {saved ? <CheckCircle className="w-4 h-4" /> : <Save className="w-4 h-4" />}
          {saved ? 'Kaydedildi' : 'Kaydet'}
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200">
        <div className="divide-y divide-slate-100">
          {Object.entries(langs).map(([key, lang]) => (
            <div key={key} className="flex items-center justify-between px-6 py-4">
              <div className="flex items-center gap-4">
                <span className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-sm font-bold text-slate-600 uppercase">
                  {key}
                </span>
                <div>
                  <div className="font-medium text-slate-800">{lang.label}</div>
                  <div className="text-xs text-slate-500">
                    {key === 'tr' ? 'Varsayılan dil (devre dışı bırakılamaz)' : 'İkinci dil'}
                  </div>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={lang.active}
                  onChange={() => toggle(key)}
                  disabled={key === 'tr'}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600 peer-disabled:opacity-60" />
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 flex items-start gap-2 text-sm text-slate-500 bg-blue-50 border border-blue-100 rounded-xl p-4">
        <Info className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
        <p>Makedonca (MK) ve Arnavutça (AL) dil desteği ilerleyen fazlarda eklenebilir. Mevcut yapı bu dilleri destekleyecek şekilde tasarlanmıştır.</p>
      </div>
    </div>
  )
}
