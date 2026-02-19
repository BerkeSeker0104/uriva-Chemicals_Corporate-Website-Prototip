import { useState, useEffect, lazy, Suspense } from 'react'
import { Plus, ArrowLeft, Save, CheckCircle } from 'lucide-react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { db } from '../store/db.js'
import DataTable from '../components/DataTable.jsx'
import ConfirmDialog from '../components/ConfirmDialog.jsx'
import LangTabs from '../components/LangTabs.jsx'
import ImageUpload from '../components/ImageUpload.jsx'
import StatusBadge from '../components/StatusBadge.jsx'

const MDEditor = lazy(() => import('@uiw/react-md-editor'))

const emptyPost = {
  title: { tr: '', en: '' }, content: { tr: '', en: '' }, excerpt: { tr: '', en: '' },
  coverImage: '', category: '', tags: [], publishDate: new Date().toISOString().split('T')[0],
  status: 'draft', readTime: '', seo: { metaTitle: { tr: '', en: '' }, metaDescription: { tr: '', en: '' } },
}

export default function BlogPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isForm = id === 'new' || !!id

  if (isForm) return <BlogForm id={id === 'new' ? null : id} navigate={navigate} />
  return <BlogList navigate={navigate} />
}

function BlogList({ navigate }) {
  const [items, setItems] = useState([])
  const [deleteTarget, setDeleteTarget] = useState(null)

  const reload = () => setItems(db.blogPosts.getAll())
  useEffect(reload, [])

  const handleDelete = () => {
    db.blogPosts.delete(deleteTarget.id)
    setDeleteTarget(null)
    reload()
  }

  const columns = [
    {
      header: 'Kapak', accessor: r => r.coverImage,
      render: r => r.coverImage
        ? <img src={r.coverImage} alt="" className="w-16 h-10 object-cover rounded-lg" />
        : <div className="w-16 h-10 rounded-lg bg-slate-100" />
    },
    { header: 'Başlık', accessor: r => r.title?.tr },
    { header: 'Kategori', accessor: r => r.category },
    { header: 'Tarih', accessor: r => r.publishDate },
    { header: 'Durum', accessor: r => r.status, render: r => <StatusBadge status={r.status} /> },
  ]

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Blog</h1>
        <Link to="/admin/blog/new" className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-medium hover:bg-blue-700">
          <Plus className="w-4 h-4" /> Yeni Yazı
        </Link>
      </div>
      <DataTable columns={columns} rows={items} onEdit={r => navigate(`/admin/blog/${r.id}`)} onDelete={setDeleteTarget} />
      <ConfirmDialog isOpen={!!deleteTarget} message={`"${deleteTarget?.title?.tr}" yazısını silmek istediğinize emin misiniz?`} onConfirm={handleDelete} onCancel={() => setDeleteTarget(null)} />
    </div>
  )
}

function BlogForm({ id, navigate }) {
  const [form, setForm] = useState(emptyPost)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (id) {
      const p = db.blogPosts.getById(id)
      if (p) setForm(p)
    }
  }, [id])

  const update = (key, value) => setForm(prev => ({ ...prev, [key]: value }))
  const updateNested = (parent, key, value) => setForm(prev => ({ ...prev, [parent]: { ...prev[parent], [key]: value } }))

  const handleSave = () => {
    if (id) db.blogPosts.update(id, form)
    else db.blogPosts.create(form)
    setSaved(true)
    setTimeout(() => navigate('/admin/blog'), 1000)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/admin/blog')} className="p-2 rounded-lg hover:bg-slate-200 text-slate-600">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-2xl font-bold text-slate-800">{id ? 'Blog Düzenle' : 'Yeni Blog Yazısı'}</h1>
        </div>
        <button onClick={handleSave} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-medium hover:bg-blue-700">
          {saved ? <CheckCircle className="w-4 h-4" /> : <Save className="w-4 h-4" />}
          {saved ? 'Kaydedildi' : 'Kaydet'}
        </button>
      </div>

      <div className="space-y-6">
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="font-semibold text-slate-800 mb-4">İçerik</h2>
          <LangTabs>
            {(lang) => (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Başlık ({lang.toUpperCase()})</label>
                  <input type="text" value={form.title?.[lang] || ''} onChange={e => updateNested('title', lang, e.target.value)} className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Özet ({lang.toUpperCase()})</label>
                  <textarea value={form.excerpt?.[lang] || ''} onChange={e => updateNested('excerpt', lang, e.target.value)} rows={2} className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">İçerik ({lang.toUpperCase()})</label>
                  <Suspense fallback={<div className="h-48 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 text-sm">Editör yükleniyor...</div>}>
                    <div data-color-mode="light">
                      <MDEditor
                        value={form.content?.[lang] || ''}
                        onChange={val => updateNested('content', lang, val || '')}
                        height={300}
                      />
                    </div>
                  </Suspense>
                </div>
              </div>
            )}
          </LangTabs>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="font-semibold text-slate-800 mb-4">Yayın Detayları</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Kategori</label>
              <input type="text" value={form.category} onChange={e => update('category', e.target.value)} placeholder="Oto Bakım, Endüstriyel, Teknik..." className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Etiketler (virgülle ayırın)</label>
              <input type="text" value={(form.tags || []).join(', ')} onChange={e => update('tags', e.target.value.split(',').map(t => t.trim()).filter(Boolean))} className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Yayın Tarihi</label>
              <input type="date" value={form.publishDate} onChange={e => update('publishDate', e.target.value)} className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Okuma Süresi</label>
              <input type="text" value={form.readTime} onChange={e => update('readTime', e.target.value)} placeholder="5 dk okuma" className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Durum</label>
              <select value={form.status} onChange={e => update('status', e.target.value)} className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="draft">Taslak</option>
                <option value="published">Yayında</option>
              </select>
            </div>
          </div>
          <div className="mt-4">
            <ImageUpload label="Kapak Görseli" value={form.coverImage} onChange={v => update('coverImage', v)} />
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="font-semibold text-slate-800 mb-4">SEO Ayarları</h2>
          <LangTabs>
            {(lang) => (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Meta Title ({lang.toUpperCase()})</label>
                  <input type="text" value={form.seo?.metaTitle?.[lang] || ''} onChange={e => setForm(f => ({ ...f, seo: { ...f.seo, metaTitle: { ...f.seo?.metaTitle, [lang]: e.target.value } } }))} className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Meta Description ({lang.toUpperCase()})</label>
                  <textarea value={form.seo?.metaDescription?.[lang] || ''} onChange={e => setForm(f => ({ ...f, seo: { ...f.seo, metaDescription: { ...f.seo?.metaDescription, [lang]: e.target.value } } }))} rows={2} className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
                </div>
              </div>
            )}
          </LangTabs>
        </div>
      </div>
    </div>
  )
}
