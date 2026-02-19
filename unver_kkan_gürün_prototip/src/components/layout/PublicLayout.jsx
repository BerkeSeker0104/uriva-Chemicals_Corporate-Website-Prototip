import { useState, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import WhatsAppButton from './WhatsAppButton.jsx'
import ScrollToTop from './ScrollToTop.jsx'

export default function PublicLayout() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 60)
      setShowScrollTop(window.scrollY > 600)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu + scroll to top on route change
  useEffect(() => {
    setMenuOpen(false)
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <>
      <Header isScrolled={isScrolled} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <main>
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
      <ScrollToTop visible={showScrollTop} />
    </>
  )
}
