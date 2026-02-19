import { MapPin, Clock, Phone, Mail } from 'lucide-react'
import { db } from '../../admin/store/db.js'

export default function TopBar() {
  const s = db.settings.get()
  return (
    <div className="hidden lg:block bg-slate-900 text-slate-300 text-xs py-2.5 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-1.5">
            <MapPin size={12} className="text-blue-400" />
            {s.address}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock size={12} className="text-blue-400" />
            {s.businessHours}
          </span>
        </div>
        <div className="flex items-center gap-6">
          <a href={`tel:${s.phone}`} className="flex items-center gap-1.5 hover:text-white transition-colors">
            <Phone size={12} className="text-blue-400" /> {s.phone}
          </a>
          <a href={`mailto:${s.email}`} className="flex items-center gap-1.5 hover:text-white transition-colors">
            <Mail size={12} className="text-blue-400" /> {s.email}
          </a>
        </div>
      </div>
    </div>
  )
}
