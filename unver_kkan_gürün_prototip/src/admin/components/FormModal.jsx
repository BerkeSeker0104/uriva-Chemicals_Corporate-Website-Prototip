import { useEffect } from 'react'
import { X } from 'lucide-react'

export default function FormModal({ title, isOpen, onClose, onSubmit, children, submitLabel = 'Kaydet' }) {
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    if (isOpen) document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center p-4 pt-[10vh] overflow-y-auto" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>
        <form onSubmit={(e) => { e.preventDefault(); onSubmit?.() }}>
          <div className="px-6 py-5 space-y-4 max-h-[60vh] overflow-y-auto">
            {children}
          </div>
          <div className="px-6 py-4 border-t border-slate-200 flex justify-end gap-3">
            <button type="button" onClick={onClose} className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50">
              İptal
            </button>
            <button type="submit" className="px-4 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-medium hover:bg-blue-700">
              {submitLabel}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
