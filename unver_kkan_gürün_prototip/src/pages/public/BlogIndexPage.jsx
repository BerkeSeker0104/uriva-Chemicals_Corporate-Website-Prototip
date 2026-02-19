import { useState, useEffect } from 'react'
import { useLang, UI } from '../../context/LanguageContext.jsx'
import { db } from '../../admin/store/db.js'
import PageHero from '../../components/ui/PageHero.jsx'
import BlogCard from '../../components/ui/BlogCard.jsx'

export default function BlogIndexPage() {
  const { t } = useLang()
  const [posts, setPosts] = useState([])
  const [categories, setCategories] = useState([])
  const [activeCategory, setActiveCategory] = useState('all')

  useEffect(() => {
    const published = db.blogPosts.getAll().filter(p => p.status === 'published')
    setPosts(published)
    const cats = [...new Set(published.map(p => p.category).filter(Boolean))]
    setCategories(cats)
  }, [])

  const filtered = activeCategory === 'all'
    ? posts
    : posts.filter(p => p.category === activeCategory)

  return (
    <>
      <PageHero
        title={t(UI.blog.title)}
        subtitle={t(UI.blog.subtitle)}
        breadcrumbs={[{ label: t(UI.nav.blog) }]}
      />
      <section className="py-20 px-6" style={{ backgroundColor: '#f8fafc' }}>
        <div className="max-w-6xl mx-auto">
          {categories.length > 0 && (
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              <button
                onClick={() => setActiveCategory('all')}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${activeCategory === 'all' ? 'bg-blue-600 text-white shadow-lg' : 'bg-white text-slate-600 border border-slate-200 hover:border-blue-300'}`}
              >
                {t(UI.blog.allPosts)}
              </button>
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${activeCategory === cat ? 'bg-blue-600 text-white shadow-lg' : 'bg-white text-slate-600 border border-slate-200 hover:border-blue-300'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map(post => <BlogCard key={post.id} post={post} />)}
            </div>
          ) : (
            <p className="text-center text-slate-400 py-12">{t({ tr: 'Henüz blog yazısı yayınlanmadı.', en: 'No blog posts published yet.' })}</p>
          )}
        </div>
      </section>
    </>
  )
}
