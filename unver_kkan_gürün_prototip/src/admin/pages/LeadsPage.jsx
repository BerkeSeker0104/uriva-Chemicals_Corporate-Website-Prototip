import { useState, useEffect } from 'react'
import { Mail, MailOpen, Trash2, X, Bell } from 'lucide-react'
import { db } from '../store/db.js'
import DataTable from '../components/DataTable.jsx'
import ConfirmDialog from '../components/ConfirmDialog.jsx'
import StatusBadge from '../components/StatusBadge.jsx'

export default function LeadsPage() {
  const [items, setItems] = useState([])
  const [selectedLead, setSelectedLead] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)

  const reload = () => setItems(db.leads.getAll().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)))
  useEffect(reload, [])

  const handleDelete = () => {
    db.leads.delete(deleteTarget.id)
    setDeleteTarget(null)
    if (selectedLead?.id === deleteTarget?.id) setSelectedLead(null)
    reload()
  }

  const toggleRead = (lead) => {
    if (lead.status === 'unread') db.leads.markRead(lead.id)
    else db.leads.markUnread(lead.id)
    reload()
    if (selectedLead?.id === lead.id) setSelectedLead({ ...lead, status: lead.status === 'unread' ? 'read' : 'unread' })
  }

  const openDetail = (lead) => {
    setSelectedLead(lead)
    if (lead.status === 'unread') {
      db.leads.markRead(lead.id)
      reload()
    }
  }

  const columns = [
    {
      header: '', accessor: r => r.status,
      render: r => <div className={`w-2.5 h-2.5 rounded-full ${r.status === 'unread' ? 'bg-blue-500' : 'bg-slate-300'}`} />
    },
    { header: 'Ad Soyad', accessor: r => r.name },
    { header: 'E-posta', accessor: r => r.email },
    { header: 'Konu', accessor: r => r.subject },
    {
      header: 'Tarih', accessor: r => r.createdAt,
      render: r => <span className="text-slate-500">{new Date(r.createdAt).toLocaleDateString('tr-TR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
    },
    {
      header: 'Durum', accessor: r => r.status,
      render: r => <StatusBadge status={r.status} />
    },
  ]

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">İletişim Kayıtları</h1>
          <p className="text-sm text-slate-500 mt-1">{db.leads.getUnreadCount()} okunmamış mesaj</p>
        </div>
        <button
          onClick={() => alert('E-posta bildirimi gönderildi (simülasyon)')}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50"
        >
          <Bell className="w-4 h-4" /> Bildirim Ayarları
        </button>
      </div>

      <div className="flex gap-6">
        <div className={`${selectedLead ? 'hidden lg:block lg:flex-1' : 'flex-1'}`}>
          <DataTable
            columns={columns}
            rows={items}
            onEdit={openDetail}
            onDelete={setDeleteTarget}
            searchPlaceholder="İsim, e-posta veya konu ara..."
          />
        </div>

        {selectedLead && (
          <div className="flex-1 lg:max-w-md">
            <div className="bg-white rounded-xl border border-slate-200 sticky top-20">
              <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200">
                <h3 className="font-semibold text-slate-800">Mesaj Detayı</h3>
                <button onClick={() => setSelectedLead(null)} className="text-slate-400 hover:text-slate-600">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-slate-800">{selectedLead.name}</div>
                    <div className="text-sm text-slate-500">{selectedLead.email}</div>
                  </div>
                  <StatusBadge status={selectedLead.status} />
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-slate-500">Telefon:</span>
                    <div className="font-medium text-slate-700">{selectedLead.phone || '—'}</div>
                  </div>
                  <div>
                    <span className="text-slate-500">Konu:</span>
                    <div className="font-medium text-slate-700">{selectedLead.subject}</div>
                  </div>
                  <div className="col-span-2">
                    <span className="text-slate-500">Tarih:</span>
                    <div className="font-medium text-slate-700">{new Date(selectedLead.createdAt).toLocaleString('tr-TR')}</div>
                  </div>
                </div>
                <div className="bg-slate-50 rounded-lg p-4">
                  <div className="text-xs text-slate-500 mb-2">Mesaj</div>
                  <p className="text-sm text-slate-700 whitespace-pre-wrap">{selectedLead.message}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => toggleRead(selectedLead)}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg border border-slate-200 text-sm text-slate-600 hover:bg-slate-50"
                  >
                    {selectedLead.status === 'unread' ? <MailOpen className="w-4 h-4" /> : <Mail className="w-4 h-4" />}
                    {selectedLead.status === 'unread' ? 'Okundu İşaretle' : 'Okunmadı İşaretle'}
                  </button>
                  <button
                    onClick={() => setDeleteTarget(selectedLead)}
                    className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg border border-red-200 text-sm text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <ConfirmDialog isOpen={!!deleteTarget} message={`${deleteTarget?.name} adlı kişinin mesajını silmek istediğinize emin misiniz?`} onConfirm={handleDelete} onCancel={() => setDeleteTarget(null)} />
    </div>
  )
}
