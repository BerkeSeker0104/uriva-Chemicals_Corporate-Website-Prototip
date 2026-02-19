import { useState } from 'react'

export default function LangTabs({ children }) {
  const [lang, setLang] = useState('tr')

  return (
    <div>
      <div className="flex gap-1 mb-3 bg-slate-100 rounded-lg p-1 w-fit">
        {['tr', 'en'].map(l => (
          <button
            key={l}
            type="button"
            onClick={() => setLang(l)}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
              lang === l ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            {l === 'tr' ? 'TR' : 'EN'}
          </button>
        ))}
      </div>
      {children(lang)}
    </div>
  )
}
