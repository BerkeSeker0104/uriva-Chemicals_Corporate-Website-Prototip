import { useState, useEffect } from 'react'
import { Plus, ArrowLeft, Save, CheckCircle } from 'lucide-react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { db } from '../store/db.js'
import DataTable from '../components/DataTable.jsx'
import ConfirmDialog from '../components/ConfirmDialog.jsx'
import LangTabs from '../components/LangTabs.jsx'
import ImageUpload from '../components/ImageUpload.jsx'
import StatusBadge from '../components/StatusBadge.jsx'

const emptyProduct = {
  name: { tr: '', en: '' }, slug: '', category: '',
  shortDesc: { tr: '', en: '' }, detailDesc: { tr: '', en: '' },
  mainImage: '', gallery: [], pdfs: { tds: '', msds: '' }, brandId: '',
  volume: '', code: '', tag: '', badge: '',
  sortOrder: 0, featured: false, active: true,
}

function slugify(str) {
  return str.toLowerCase().replace(/ş/g, 's').replace(/ç/g, 'c').replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ö/g, 'o').replace(/ı/g, 'i').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

export default function ProductsPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isForm = id === 'new' || !!id

  if (isForm) return <ProductForm id={id === 'new' ? null : id} navigate={navigate} />
  return <ProductList navigate={navigate} />
}

function ProductList({ navigate }) {
  const [items, setItems] = useState([])
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [categories, setCategories] = useState([])

  const reload = () => {
    setItems(db.products.getAll())
    setCategories(db.categories.getAll())
  }
  useEffect(reload, [])

  const getCatName = (catId) => categories.find(c => c.id === catId)?.name?.tr || '—'

  const handleDelete = () => {
    db.products.delete(deleteTarget.id)
    setDeleteTarget(null)
    reload()
  }

  const columns = [
    {
      header: 'Görsel', accessor: r => r.mainImage,
      render: r => r.mainImage
        ? <img src={r.mainImage} alt="" className="w-12 h-12 object-cover rounded-lg" />
        : <div className="w-12 h-12 rounded-lg bg-slate-100" />
    },
    { header: 'Ürün Adı', accessor: r => r.name?.tr },
    { header: 'Kod', accessor: r => r.code },
    { header: 'Kategori', accessor: r => getCatName(r.category) },
    { header: 'Sıra', accessor: r => r.sortOrder },
    {
      header: 'Durum', accessor: r => r.active ? 'active' : 'passive',
      render: r => (
        <div className="flex items-center gap-2">
          <StatusBadge status={r.active ? 'active' : 'passive'} />
          {r.featured && <span className="text-xs bg-amber-50 text-amber-700 border border-amber-200 px-2 py-0.5 rounded-full">Öne Çıkan</span>}
        </div>
      )
    },
  ]

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Ürünler</h1>
        <Link to="/admin/products/new" className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-medium hover:bg-blue-700">
          <Plus className="w-4 h-4" /> Yeni Ürün
        </Link>
      </div>
      <DataTable columns={columns} rows={items} onEdit={r => navigate(`/admin/products/${r.id}`)} onDelete={setDeleteTarget} />
      <ConfirmDialog isOpen={!!deleteTarget} message={`"${deleteTarget?.name?.tr}" ürününü silmek istediğinize emin misiniz?`} onConfirm={handleDelete} onCancel={() => setDeleteTarget(null)} />
    </div>
  )
}

function ProductForm({ id, navigate }) {
  const [form, setForm] = useState(emptyProduct)
  const [categories, setCategories] = useState([])
  const [brands, setBrands] = useState([])
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    setCategories(db.categories.getAll())
    setBrands(db.brands.getAll())
    if (id) {
      const p = db.products.getById(id)
      if (p) setForm(p)
    }
  }, [id])

  const update = (key, value) => setForm(prev => ({ ...prev, [key]: value }))
  const updateNested = (parent, key, value) => setForm(prev => ({ ...prev, [parent]: { ...prev[parent], [key]: value } }))

  const handleSave = () => {
    const data = { ...form }
    if (!data.slug) data.slug = slugify(data.name?.tr || '')
    if (id) db.products.update(id, data)
    else db.products.create(data)
    setSaved(true)
    setTimeout(() => navigate('/admin/products'), 1000)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/admin/products')} className="p-2 rounded-lg hover:bg-slate-200 text-slate-600">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-2xl font-bold text-slate-800">{id ? 'Ürün Düzenle' : 'Yeni Ürün'}</h1>
        </div>
        <button onClick={handleSave} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-medium hover:bg-blue-700">
          {saved ? <CheckCircle className="w-4 h-4" /> : <Save className="w-4 h-4" />}
          {saved ? 'Kaydedildi' : 'Kaydet'}
        </button>
      </div>

      <div className="space-y-6">
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="font-semibold text-slate-800 mb-4">Temel Bilgiler</h2>
          <LangTabs>
            {(lang) => (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Ürün Adı ({lang.toUpperCase()})</label>
                  <input type="text" value={form.name?.[lang] || ''} onChange={e => updateNested('name', lang, e.target.value)} className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Kısa Açıklama ({lang.toUpperCase()})</label>
                  <textarea value={form.shortDesc?.[lang] || ''} onChange={e => updateNested('shortDesc', lang, e.target.value)} rows={2} className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Detay Açıklama ({lang.toUpperCase()})</label>
                  <textarea value={form.detailDesc?.[lang] || ''} onChange={e => updateNested('detailDesc', lang, e.target.value)} rows={4} className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
                </div>
              </div>
            )}
          </LangTabs>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="font-semibold text-slate-800 mb-4">Ürün Detayları</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Slug</label>
              <input type="text" value={form.slug} onChange={e => update('slug', e.target.value)} placeholder="otomatik oluşturulur" className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Ürün Kodu</label>
              <input type="text" value={form.code} onChange={e => update('code', e.target.value)} placeholder="PUR-XX-000" className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Kategori</label>
              <select value={form.category} onChange={e => update('category', e.target.value)} className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Seçiniz</option>
                {categories.map(c => <option key={c.id} value={c.id}>{c.name?.tr}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Marka</label>
              <select value={form.brandId} onChange={e => update('brandId', e.target.value)} className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Seçiniz</option>
                {brands.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Hacim / Ambalaj</label>
              <input type="text" value={form.volume} onChange={e => update('volume', e.target.value)} placeholder="5L / 20L" className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Etiket</label>
              <input type="text" value={form.tag} onChange={e => update('tag', e.target.value)} placeholder="Temizlik, Bakım vb." className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Badge</label>
              <select value={form.badge || ''} onChange={e => update('badge', e.target.value || null)} className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Yok</option>
                <option value="Çok Satan">Çok Satan</option>
                <option value="Yeni">Yeni</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Sıralama</label>
              <input type="number" value={form.sortOrder} onChange={e => update('sortOrder', parseInt(e.target.value) || 0)} className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>
          <div className="flex gap-6 mt-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.featured} onChange={e => update('featured', e.target.checked)} className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
              <span className="text-sm text-slate-700">Öne Çıkan Ürün</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.active} onChange={e => update('active', e.target.checked)} className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
              <span className="text-sm text-slate-700">Aktif</span>
            </label>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="font-semibold text-slate-800 mb-4">Görseller & Dokümanlar</h2>
          <div className="flex flex-wrap gap-6">
            <ImageUpload label="Ana Görsel" value={form.mainImage} onChange={v => update('mainImage', v)} />
            <ImageUpload label="TDS (PDF)" value={form.pdfs?.tds} onChange={v => updateNested('pdfs', 'tds', v)} accept=".pdf" />
            <ImageUpload label="MSDS (PDF)" value={form.pdfs?.msds} onChange={v => updateNested('pdfs', 'msds', v)} accept=".pdf" />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-slate-700 mb-2">Galeri (opsiyonel)</label>
            <div className="flex flex-wrap gap-3">
              {(form.gallery || []).map((img, i) => (
                <div key={i} className="relative">
                  <img src={img} alt="" className="w-20 h-20 object-cover rounded-lg border border-slate-200" />
                  <button type="button" onClick={() => update('gallery', form.gallery.filter((_, idx) => idx !== i))} className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center text-xs hover:bg-red-600">×</button>
                </div>
              ))}
              <ImageUpload label="" value="" onChange={v => { if (v) update('gallery', [...(form.gallery || []), v]) }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
