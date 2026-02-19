import { useState, useEffect } from 'react'
import { Plus } from 'lucide-react'
import { db } from '../store/db.js'
import DataTable from '../components/DataTable.jsx'
import FormModal from '../components/FormModal.jsx'
import ConfirmDialog from '../components/ConfirmDialog.jsx'
import LangTabs from '../components/LangTabs.jsx'
import StatusBadge from '../components/StatusBadge.jsx'

const emptyService = { name: { tr: '', en: '' }, description: { tr: '', en: '' }, sortOrder: 0, active: true }

export default function ServicesPage() {
  const [items, setItems] = useState([])
  const [editing, setEditing] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [form, setForm] = useState(emptyService)

  const reload = () => setItems(db.services.getAll())
  useEffect(reload, [])

  const openNew = () => { setForm({ ...emptyService, name: { tr: '', en: '' }, description: { tr: '', en: '' } }); setEditing(null); setModalOpen(true) }
  const openEdit = (row) => { setForm({ ...row }); setEditing(row.id); setModalOpen(true) }

  const handleSubmit = () => {
    if (editing) db.services.update(editing, form)
    else db.services.create(form)
    setModalOpen(false)
    reload()
  }

  const handleDelete = () => {
    db.services.delete(deleteTarget.id)
    setDeleteTarget(null)
    reload()
  }

  const columns = [
    { header: 'Hizmet Adı (TR)', accessor: r => r.name?.tr },
    { header: 'Hizmet Adı (EN)', accessor: r => r.name?.en },
    { header: 'Sıra', accessor: r => r.sortOrder },
    { header: 'Durum', accessor: r => r.active ? 'active' : 'passive', render: r => <StatusBadge status={r.active ? 'active' : 'passive'} /> },
  ]

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Hizmetler</h1>
        <button onClick={openNew} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-medium hover:bg-blue-700">
          <Plus className="w-4 h-4" /> Yeni Hizmet
        </button>
      </div>

      <DataTable columns={columns} rows={items} onEdit={openEdit} onDelete={setDeleteTarget} />

      <FormModal title={editing ? 'Hizmet Düzenle' : 'Yeni Hizmet'} isOpen={modalOpen} onClose={() => setModalOpen(false)} onSubmit={handleSubmit}>
        <LangTabs>
          {(lang) => (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Hizmet Adı ({lang.toUpperCase()})</label>
                <input
                  type="text"
                  value={form.name?.[lang] || ''}
                  onChange={e => setForm(f => ({ ...f, name: { ...f.name, [lang]: e.target.value } }))}
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Açıklama ({lang.toUpperCase()})</label>
                <textarea
                  value={form.description?.[lang] || ''}
                  onChange={e => setForm(f => ({ ...f, description: { ...f.description, [lang]: e.target.value } }))}
                  rows={3}
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>
            </div>
          )}
        </LangTabs>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Sıralama</label>
            <input type="number" value={form.sortOrder} onChange={e => setForm(f => ({ ...f, sortOrder: parseInt(e.target.value) || 0 }))} className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div className="flex items-end">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.active} onChange={e => setForm(f => ({ ...f, active: e.target.checked }))} className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
              <span className="text-sm text-slate-700">Aktif</span>
            </label>
          </div>
        </div>
      </FormModal>

      <ConfirmDialog isOpen={!!deleteTarget} message={`"${deleteTarget?.name?.tr}" hizmetini silmek istediğinize emin misiniz?`} onConfirm={handleDelete} onCancel={() => setDeleteTarget(null)} />
    </div>
  )
}
