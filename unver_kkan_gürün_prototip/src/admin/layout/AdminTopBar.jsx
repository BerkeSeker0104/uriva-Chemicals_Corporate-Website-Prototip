import { Menu, LogOut, User, KeyRound } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'

export default function AdminTopBar({ onMenuToggle, onLogout, onChangePassword }) {
  const [dropOpen, setDropOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setDropOpen(false) }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200 px-4 lg:px-6 py-3 flex items-center justify-between">
      <button onClick={onMenuToggle} className="lg:hidden text-slate-600 hover:text-slate-800">
        <Menu className="w-6 h-6" />
      </button>
      <div className="hidden lg:block" />

      <div className="relative" ref={ref}>
        <button
          onClick={() => setDropOpen(!dropOpen)}
          className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-800"
        >
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
            <User className="w-4 h-4 text-blue-600" />
          </div>
          <span className="hidden sm:inline font-medium">Admin</span>
        </button>

        {dropOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-200 py-1 z-50">
            <button
              onClick={() => { setDropOpen(false); onChangePassword?.() }}
              className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50"
            >
              <KeyRound className="w-4 h-4" />
              Şifre Değiştir
            </button>
            <hr className="my-1 border-slate-100" />
            <button
              onClick={() => { setDropOpen(false); onLogout() }}
              className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50"
            >
              <LogOut className="w-4 h-4" />
              Çıkış Yap
            </button>
          </div>
        )}
      </div>
    </header>
  )
}
