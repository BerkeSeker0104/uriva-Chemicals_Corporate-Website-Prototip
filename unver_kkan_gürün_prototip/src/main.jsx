import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import { LanguageProvider } from './context/LanguageContext.jsx'
import { initializeIfNeeded } from './admin/store/db.js'
import PublicLayout from './components/layout/PublicLayout.jsx'
import HomePage from './pages/public/HomePage.jsx'
import AboutPage from './pages/public/AboutPage.jsx'
import ProductsPage from './pages/public/ProductsPage.jsx'
import ProductDetailPage from './pages/public/ProductDetailPage.jsx'
import ServicesPage from './pages/public/ServicesPage.jsx'
import BlogIndexPage from './pages/public/BlogIndexPage.jsx'
import BlogDetailPage from './pages/public/BlogDetailPage.jsx'
import ContactPage from './pages/public/ContactPage.jsx'
import NotFoundPage from './pages/public/NotFoundPage.jsx'
import AdminRoot from './admin/index.jsx'

initializeIfNeeded()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <LanguageProvider>
        <Routes>
          <Route element={<PublicLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/hakkimizda" element={<AboutPage />} />
            <Route path="/urunler" element={<ProductsPage />} />
            <Route path="/urunler/:slug" element={<ProductDetailPage />} />
            <Route path="/hizmetler" element={<ServicesPage />} />
            <Route path="/blog" element={<BlogIndexPage />} />
            <Route path="/blog/:slug" element={<BlogDetailPage />} />
            <Route path="/iletisim" element={<ContactPage />} />
          </Route>
          <Route path="/admin/*" element={<AdminRoot />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </LanguageProvider>
    </BrowserRouter>
  </StrictMode>,
)
