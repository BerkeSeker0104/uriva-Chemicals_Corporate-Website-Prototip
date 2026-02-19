import { useState, useEffect } from 'react'
import { Plus } from 'lucide-react'
import { db } from '../store/db.js'
import DataTable from '../components/DataTable.jsx'
import FormModal from '../components/FormModal.jsx'
import ConfirmDialog from '../components/ConfirmDialog.jsx'
import ImageUpload from '../components/ImageUpload.jsx'
import StatusBadge from '../components/StatusBadge.jsx'

const emptyBrand = { name: '', logoUrl: '', link: '', sortOrder: 0, active: true }

export default function BrandsPage() {
  const [items, setItems] = useState([])
  const [editing, setEditing] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [form, setForm] = useState(emptyBrand)

  const reload = () => setItems(db.brands.getAll())
  useEffect(reload, [])

  const openNew = () => { setForm({ ...emptyBrand }); setEditing(null); setModalOpen(true) }
  const openEdit = (row) => { setForm({ ...row }); setEditing(row.id); setModalOpen(true) }

  const handleSubmit = () => {
    if (editing) db.brands.update(editing, form)
    else db.brands.create(form)
    setModalOpen(false)
    reload()
  }

  const handleDelete = () => {
    db.brands.delete(deleteTarget.id)
    setDeleteTarget(null)
    reload()
  }

  const columns = [
    {
      header: 'Logo', accessor: r => r.logoUrl,
      render: r => r.logoUrl
        ? <img src={r.logoUrl} alt="" className="w-10 h-10 object-contain rounded" />
        : <div className="w-10 h-10 rounded bg-slate-100 flex items-center justify-center text-xs text-slate-400">N/A</div>
    },
    { header: 'Marka Adı', accessor: r => r.name },
    { header: 'Link', accessor: r => r.link || '—' },
    { header: 'Sıra', accessor: r => r.sortOrder },
    { header: 'Durum', accessor: r => r.active ? 'active' : 'passive', render: r => <StatusBadge status={r.active ? 'active' : 'passive'} /> },
  ]

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Markalar</h1>
        <button onClick={openNew} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-medium hover:bg-blue-700">
          <Plus className="w-4 h-4" /> Yeni Marka
        </button>
      </div>

      <DataTable columns={columns} rows={items} onEdit={openEdit} onDelete={setDeleteTarget} />

      <FormModal title={editing ? 'Marka Düzenle' : 'Yeni Marka'} isOpen={modalOpen} onClose={() => setModalOpen(false)} onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Marka Adı</label>
          <input type="text" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <ImageUpload label="Logo" value={form.logoUrl} onChange={v => setForm(f => ({ ...f, logoUrl: v }))} />
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Link (opsiyonel)</label>
          <input type="text" value={form.link} onChange={e => setForm(f => ({ ...f, link: e.target.value }))} placeholder="https://..." className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
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

      <ConfirmDialog isOpen={!!deleteTarget} message={`"${deleteTarget?.name}" markasını silmek istediğinize emin misiniz?`} onConfirm={handleDelete} onCancel={() => setDeleteTarget(null)} />
    </div>
  )
}
