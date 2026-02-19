import { useState, useEffect, lazy, Suspense } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Calendar, Clock, Tag } from 'lucide-react'
import { useLang, UI } from '../../context/LanguageContext.jsx'
import { db } from '../../admin/store/db.js'
import { slugify } from '../../utils/slugify.js'
import PageHero from '../../components/ui/PageHero.jsx'
import BlogCard from '../../components/ui/BlogCard.jsx'

const MDEditor = lazy(() => import('@uiw/react-md-editor'))

export default function BlogDetailPage() {
  const { slug } = useParams()
  const { t } = useLang()
  const [post, setPost] = useState(null)
  const [related, setRelated] = useState([])

  useEffect(() => {
    const all = db.blogPosts.getAll().filter(p => p.status === 'published')
    const found = all.find(p => slugify(p.title?.tr || '') === slug)
    if (found) {
      setPost(found)
      setRelated(all.filter(p => p.id !== found.id && p.category === found.category).slice(0, 3))
    }
  }, [slug])

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-slate-400">{t({ tr: 'Yazı bulunamadı.', en: 'Post not found.' })}</p>
      </div>
    )
  }

  return (
    <>
      <PageHero
        title={t(post.title)}
        subtitle={post.category || ''}
        breadcrumbs={[
          { label: t(UI.nav.blog), to: '/blog' },
          { label: t(post.title) },
        ]}
      />

      {/* Cover Image */}
      {post.coverImage && (
        <div className="max-w-4xl mx-auto px-6 -mt-4 relative z-10">
          <img src={post.coverImage} alt={t(post.title)} className="w-full h-64 md:h-80 object-cover rounded-2xl shadow-xl" />
        </div>
      )}

      <article className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400 mb-8">
            {post.publishDate && (
              <span className="flex items-center gap-1.5"><Calendar size={14} /> {post.publishDate}</span>
            )}
            {post.readTime && (
              <span className="flex items-center gap-1.5"><Clock size={14} /> {post.readTime}</span>
            )}
            {post.category && (
              <span className="flex items-center gap-1.5"><Tag size={14} /> {post.category}</span>
            )}
          </div>

          {/* Tags */}
          {post.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {post.tags.map(tag => (
                <span key={tag} className="bg-blue-50 text-blue-600 text-xs font-medium px-3 py-1 rounded-full">{tag}</span>
              ))}
            </div>
          )}

          {/* Content */}
          <div className="prose prose-slate max-w-none" data-color-mode="light">
            <Suspense fallback={<div className="py-12 text-center text-slate-400">{t({ tr: 'Yükleniyor...', en: 'Loading...' })}</div>}>
              <MDEditor.Markdown source={t(post.content)} />
            </Suspense>
          </div>

          {/* Back link */}
          <div className="mt-12 pt-8 border-t border-slate-200">
            <Link to="/blog" className="text-blue-600 font-semibold text-sm hover:underline">
              &larr; {t(UI.blog.allPosts)}
            </Link>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {related.length > 0 && (
        <section className="py-20 px-6" style={{ backgroundColor: '#f0f7ff' }}>
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-800 mb-8">{t(UI.blog.relatedPosts)}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {related.map(p => <BlogCard key={p.id} post={p} />)}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
