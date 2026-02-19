import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar.jsx'
import AdminTopBar from './AdminTopBar.jsx'

export default function AdminLayout({ onLogout, onChangePassword }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="lg:ml-64">
        <AdminTopBar
          onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
          onLogout={onLogout}
          onChangePassword={onChangePassword}
        />
        <main className="p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
