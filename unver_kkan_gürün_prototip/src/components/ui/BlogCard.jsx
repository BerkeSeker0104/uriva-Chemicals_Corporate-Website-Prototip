import { Link } from 'react-router-dom'
import { Calendar, Clock, ArrowRight } from 'lucide-react'
import { useLang, UI } from '../../context/LanguageContext.jsx'
import { slugify } from '../../utils/slugify.js'

export default function BlogCard({ post }) {
  const { t } = useLang()
  const slug = post.slug || slugify(typeof post.title === 'string' ? post.title : post.title?.tr)

  return (
    <article className="blog-card bg-white rounded-2xl overflow-hidden border border-slate-100 flex flex-col group">
      <div className="relative overflow-hidden h-48">
        <img src={post.coverImage || post.img} alt={t(post.title)} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
        <div className="absolute top-4 left-4">
          <span className="inline-flex items-center gap-1.5 bg-blue-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full">
            {post.category}
          </span>
        </div>
      </div>
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-4 text-xs text-slate-400 mb-3">
          <span className="flex items-center gap-1.5"><Calendar size={12} /> {post.publishDate || post.date}</span>
          <span className="flex items-center gap-1.5"><Clock size={12} /> {post.readTime}</span>
        </div>
        <h3 className="text-slate-800 font-bold text-base leading-snug">{t(post.title)}</h3>
        <p className="text-slate-500 text-sm leading-relaxed mt-2 flex-1">{t(post.excerpt)}</p>
        <div className="mt-5">
          <Link to={`/blog/${slug}`} className="inline-flex items-center gap-1.5 text-blue-600 font-semibold text-sm hover:gap-3 transition-all duration-200">
            {t(UI.blog.readMore)} <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </article>
  )
}
