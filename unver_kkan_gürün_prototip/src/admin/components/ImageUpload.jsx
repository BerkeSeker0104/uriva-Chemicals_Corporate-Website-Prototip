import { useRef } from 'react'
import { Upload, X, Image } from 'lucide-react'

export default function ImageUpload({ value, onChange, label = 'Görsel Yükle', accept = 'image/*' }) {
  const inputRef = useRef(null)

  const handleFile = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onloadend = () => onChange(reader.result)
    reader.readAsDataURL(file)
    e.target.value = ''
  }

  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1.5">{label}</label>
      <input ref={inputRef} type="file" accept={accept} onChange={handleFile} className="hidden" />

      {value ? (
        <div className="relative inline-block">
          {accept === 'image/*' ? (
            <img src={value} alt="" className="w-32 h-32 object-cover rounded-xl border border-slate-200" />
          ) : (
            <div className="w-32 h-32 rounded-xl border border-slate-200 flex items-center justify-center bg-slate-50">
              <span className="text-xs text-slate-500 text-center px-2">PDF yüklendi</span>
            </div>
          )}
          <button
            type="button"
            onClick={() => onChange('')}
            className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="w-32 h-32 rounded-xl border-2 border-dashed border-slate-300 flex flex-col items-center justify-center gap-2 text-slate-400 hover:border-blue-400 hover:text-blue-500 transition-colors"
        >
          {accept === 'image/*' ? <Image className="w-6 h-6" /> : <Upload className="w-6 h-6" />}
          <span className="text-xs">Yükle</span>
        </button>
      )}
    </div>
  )
}
