import { useState, useEffect } from 'react'
import { Package, FileText, Award, MessageSquare, Eye, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { db } from '../store/db.js'

export default function Dashboard() {
  const [stats, setStats] = useState({ products: 0, blogs: 0, brands: 0, leads: 0, unreadLeads: 0 })
  const [recentLeads, setRecentLeads] = useState([])

  useEffect(() => {
    const products = db.products.getAll()
    const blogs = db.blogPosts.getAll()
    const brands = db.brands.getAll()
    const leads = db.leads.getAll()
    setStats({
      products: products.length,
      blogs: blogs.filter(b => b.status === 'published').length,
      brands: brands.filter(b => b.active).length,
      leads: leads.length,
      unreadLeads: leads.filter(l => l.status === 'unread').length,
    })
    setRecentLeads(leads.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5))
  }, [])

  const cards = [
    { label: 'Toplam Ürün', value: stats.products, icon: Package, color: 'blue', to: '/admin/products' },
    { label: 'Yayınlanan Blog', value: stats.blogs, icon: FileText, color: 'emerald', to: '/admin/blog' },
    { label: 'Aktif Marka', value: stats.brands, icon: Award, color: 'purple', to: '/admin/brands' },
    { label: 'Okunmamış Mesaj', value: stats.unreadLeads, icon: MessageSquare, color: 'red', to: '/admin/leads' },
  ]

  const colorMap = {
    blue: 'bg-blue-50 text-blue-600',
    emerald: 'bg-emerald-50 text-emerald-600',
    purple: 'bg-purple-50 text-purple-600',
    red: 'bg-red-50 text-red-600',
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-800 mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {cards.map(card => (
          <Link
            key={card.label}
            to={card.to}
            className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${colorMap[card.color]}`}>
                <card.icon className="w-5 h-5" />
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </div>
            <div className="text-2xl font-bold text-slate-800">{card.value}</div>
            <div className="text-sm text-slate-500 mt-0.5">{card.label}</div>
          </Link>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-slate-200">
        <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between">
          <h2 className="font-semibold text-slate-800">Son İletişim Kayıtları</h2>
          <Link to="/admin/leads" className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1">
            Tümünü Gör <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        {recentLeads.length === 0 ? (
          <div className="p-8 text-center text-slate-400 text-sm">Henüz iletişim kaydı yok.</div>
        ) : (
          <div className="divide-y divide-slate-100">
            {recentLeads.map(lead => (
              <div key={lead.id} className="px-5 py-3 flex items-center gap-4">
                <div className={`w-2 h-2 rounded-full shrink-0 ${lead.status === 'unread' ? 'bg-blue-500' : 'bg-slate-300'}`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm text-slate-800 truncate">{lead.name}</span>
                    <span className="text-xs text-slate-400 shrink-0">
                      {new Date(lead.createdAt).toLocaleDateString('tr-TR')}
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 truncate">{lead.subject} — {lead.message}</div>
                </div>
                <Link to="/admin/leads" className="text-slate-400 hover:text-blue-600">
                  <Eye className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
