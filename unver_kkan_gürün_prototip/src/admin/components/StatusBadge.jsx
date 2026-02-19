const styles = {
  active: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  passive: 'bg-slate-50 text-slate-500 border-slate-200',
  published: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  draft: 'bg-amber-50 text-amber-700 border-amber-200',
  read: 'bg-slate-50 text-slate-500 border-slate-200',
  unread: 'bg-blue-50 text-blue-700 border-blue-200',
}

const labels = {
  active: 'Aktif',
  passive: 'Pasif',
  published: 'Yayında',
  draft: 'Taslak',
  read: 'Okundu',
  unread: 'Okunmadı',
}

export default function StatusBadge({ status }) {
  return (
    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[status] || styles.passive}`}>
      {labels[status] || status}
    </span>
  )
}
