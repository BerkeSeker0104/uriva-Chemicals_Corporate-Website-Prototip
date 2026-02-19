import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, FlaskConical, ChevronDown, Globe } from 'lucide-react'
import { useLang, UI } from '../../context/LanguageContext.jsx'
import { db } from '../../admin/store/db.js'
import TopBar from './TopBar.jsx'

export default function Header({ isScrolled, menuOpen, setMenuOpen }) {
  const { lang, toggleLang, t } = useLang()
  const { pathname } = useLocation()
  const isHome = pathname === '/'
  const showTransparent = isHome && !isScrolled

  const navLinks = [
    { label: t(UI.nav.home), to: '/' },
    { label: t(UI.nav.about), to: '/hakkimizda' },
    { label: t(UI.nav.products), to: '/urunler' },
    { label: t(UI.nav.services), to: '/hizmetler', hasDropdown: true },
    { label: t(UI.nav.blog), to: '/blog' },
    { label: t(UI.nav.contact), to: '/iletisim' },
  ]

  const isActive = (to) => to === '/' ? pathname === '/' : pathname.startsWith(to)

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {isHome && (
        <div className={`overflow-hidden transition-all duration-300 ${isScrolled ? 'max-h-0' : 'max-h-12'}`}>
          <TopBar />
        </div>
      )}
      <div className={`transition-all duration-300 ${showTransparent ? 'bg-slate-900/60 backdrop-blur-sm py-4' : 'bg-white/95 backdrop-blur-md shadow-lg py-3'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300 ${showTransparent ? 'bg-blue-500/20 border border-blue-400/30' : 'bg-blue-600'}`}>
              <FlaskConical size={18} className={showTransparent ? 'text-blue-300' : 'text-white'} />
            </div>
            <div className="flex flex-col leading-none">
              <span className={`text-xl font-black tracking-widest transition-colors duration-300 ${showTransparent ? 'text-white' : 'text-blue-600'}`}>PURIVA</span>
              <span className={`text-[9px] font-medium tracking-[0.35em] uppercase transition-colors duration-300 ${showTransparent ? 'text-slate-300' : 'text-slate-400'}`}>Chemicals</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <NavItem key={link.to} link={link} isActive={isActive(link.to)} showTransparent={showTransparent} t={t} />
            ))}
            <button
              onClick={toggleLang}
              className={`ml-2 flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border transition-all ${showTransparent ? 'border-white/20 text-white/80 hover:bg-white/10' : 'border-slate-200 text-slate-600 hover:bg-slate-50'}`}
            >
              <Globe size={12} />
              {lang === 'tr' ? 'EN' : 'TR'}
            </button>
            <Link to="/iletisim" className="ml-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-all duration-200 hover:shadow-lg">
              {t(UI.nav.cta)}
            </Link>
          </nav>

          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={toggleLang}
              className={`flex items-center gap-1 text-xs font-semibold px-2.5 py-1.5 rounded-full border ${showTransparent ? 'border-white/20 text-white/80' : 'border-slate-200 text-slate-600'}`}
            >
              {lang === 'tr' ? 'EN' : 'TR'}
            </button>
            <button onClick={() => setMenuOpen(!menuOpen)} className={`p-2 rounded-lg transition-colors ${showTransparent ? 'text-white hover:bg-white/10' : 'text-slate-700 hover:bg-slate-100'}`} aria-label="Menu">
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${menuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <nav className="bg-white/95 backdrop-blur-md border-t border-slate-100 px-6 py-4 flex flex-col gap-1 shadow-xl">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className={`text-sm font-medium py-2.5 px-3 rounded-lg transition-colors ${isActive(link.to) ? 'text-blue-600 bg-blue-50' : 'text-slate-700 hover:text-blue-600 hover:bg-slate-50'}`}
            >
              {link.label}
            </Link>
          ))}
          <Link to="/iletisim" onClick={() => setMenuOpen(false)} className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-lg text-center transition-all mt-2">
            {t(UI.nav.cta)}
          </Link>
        </nav>
      </div>
    </header>
  )
}

function NavItem({ link, isActive, showTransparent, t }) {
  const [dropOpen, setDropOpen] = useState(false)
  const [services, setServices] = useState([])
  const timeoutRef = useRef(null)

  useEffect(() => {
    if (link.hasDropdown) {
      setServices(db.services.getAll().filter(s => s.active))
    }
  }, [link.hasDropdown])

  const handleEnter = () => { clearTimeout(timeoutRef.current); setDropOpen(true) }
  const handleLeave = () => { timeoutRef.current = setTimeout(() => setDropOpen(false), 150) }

  if (link.hasDropdown) {
    return (
      <div className="relative" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
        <Link
          to={link.to}
          className={`relative text-sm font-medium px-4 py-2 rounded-lg transition-all duration-200 inline-flex items-center gap-1 ${
            isActive
              ? showTransparent ? 'text-white bg-white/10' : 'text-blue-600 bg-blue-50'
              : showTransparent ? 'text-slate-200 hover:text-white hover:bg-white/10' : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
          }`}
        >
          {link.label}
          <ChevronDown size={14} className={`transition-transform ${dropOpen ? 'rotate-180' : ''}`} />
          {isActive && <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-blue-500" />}
        </Link>
        {dropOpen && services.length > 0 && (
          <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50">
            {services.map(s => (
              <Link
                key={s.id}
                to="/hizmetler"
                onClick={() => setDropOpen(false)}
                className="block px-4 py-2.5 text-sm text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-colors"
              >
                {t(s.name)}
              </Link>
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <Link
      to={link.to}
      className={`relative text-sm font-medium px-4 py-2 rounded-lg transition-all duration-200 ${
        isActive
          ? showTransparent ? 'text-white bg-white/10' : 'text-blue-600 bg-blue-50'
          : showTransparent ? 'text-slate-200 hover:text-white hover:bg-white/10' : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
      }`}
    >
      {link.label}
      {isActive && <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-blue-500" />}
    </Link>
  )
}
