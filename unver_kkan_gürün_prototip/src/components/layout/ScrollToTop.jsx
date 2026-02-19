import { ChevronUp } from 'lucide-react'

export default function ScrollToTop({ visible }) {
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={`fixed bottom-24 right-6 z-40 w-11 h-11 bg-slate-800 hover:bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
      aria-label="Scroll to top"
    >
      <ChevronUp size={20} />
    </button>
  )
}
