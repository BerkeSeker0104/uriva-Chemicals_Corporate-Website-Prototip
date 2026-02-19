import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { initializeIfNeeded } from './store/db.js'
import { useAuth } from './auth/useAuth.js'
import LoginPage from './auth/LoginPage.jsx'
import AdminLayout from './layout/AdminLayout.jsx'
import Dashboard from './pages/Dashboard.jsx'
import GeneralSettings from './pages/GeneralSettings.jsx'
import LanguageSettings from './pages/LanguageSettings.jsx'
import ProductsPage from './pages/ProductsPage.jsx'
import CategoriesPage from './pages/CategoriesPage.jsx'
import ServicesPage from './pages/ServicesPage.jsx'
import BrandsPage from './pages/BrandsPage.jsx'
import BlogPage from './pages/BlogPage.jsx'
import LeadsPage from './pages/LeadsPage.jsx'

export default function AdminRoot() {
  const { authed, login, logout, changePassword } = useAuth()
  const [showPasswordModal, setShowPasswordModal] = useState(false)

  useEffect(() => { initializeIfNeeded() }, [])

  if (!authed) return <LoginPage onLogin={login} />

  return (
    <>
      <Routes>
        <Route element={<AdminLayout onLogout={logout} onChangePassword={() => setShowPasswordModal(true)} />}>
          <Route index element={<Dashboard />} />
          <Route path="settings" element={<GeneralSettings />} />
          <Route path="languages" element={<LanguageSettings />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="products/new" element={<ProductsPage />} />
          <Route path="products/:id" element={<ProductsPage />} />
          <Route path="categories" element={<CategoriesPage />} />
          <Route path="services" element={<ServicesPage />} />
          <Route path="brands" element={<BrandsPage />} />
          <Route path="blog" element={<BlogPage />} />
          <Route path="blog/new" element={<BlogPage />} />
          <Route path="blog/:id" element={<BlogPage />} />
          <Route path="leads" element={<LeadsPage />} />
        </Route>
      </Routes>

      {showPasswordModal && (
        <PasswordModal
          onClose={() => setShowPasswordModal(false)}
          onSubmit={changePassword}
        />
      )}
    </>
  )
}

function PasswordModal({ onClose, onSubmit }) {
  const [current, setCurrent] = useState('')
  const [newPass, setNewPass] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    if (newPass.length < 4) { setError('Yeni şifre en az 4 karakter olmalı.'); return }
    if (newPass !== confirm) { setError('Şifreler eşleşmiyor.'); return }
    if (!onSubmit(current, newPass)) { setError('Mevcut şifre hatalı.'); return }
    setSuccess(true)
    setTimeout(onClose, 1500)
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6" onClick={e => e.stopPropagation()}>
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Şifre Değiştir</h3>
        {success ? (
          <div className="p-3 rounded-lg bg-green-50 border border-green-200 text-green-700 text-sm">
            Şifre başarıyla değiştirildi.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm">{error}</div>}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Mevcut Şifre</label>
              <input type="password" value={current} onChange={e => setCurrent(e.target.value)} className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Yeni Şifre</label>
              <input type="password" value={newPass} onChange={e => setNewPass(e.target.value)} className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Yeni Şifre (Tekrar)</label>
              <input type="password" value={confirm} onChange={e => setConfirm(e.target.value)} className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="flex gap-3 pt-2">
              <button type="button" onClick={onClose} className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50">İptal</button>
              <button type="submit" className="flex-1 px-4 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-medium hover:bg-blue-700">Kaydet</button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
