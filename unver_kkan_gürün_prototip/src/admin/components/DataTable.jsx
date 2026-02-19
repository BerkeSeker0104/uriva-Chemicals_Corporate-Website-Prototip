import { useState, useMemo } from 'react'
import { Search, ChevronLeft, ChevronRight, Edit2, Trash2, ArrowUpDown } from 'lucide-react'

export default function DataTable({ columns, rows, onEdit, onDelete, searchPlaceholder = 'Ara...', pageSize = 10 }) {
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(0)
  const [sortCol, setSortCol] = useState(null)
  const [sortDir, setSortDir] = useState('asc')

  const filtered = useMemo(() => {
    let result = rows
    if (search) {
      const q = search.toLowerCase()
      result = result.filter(row =>
        columns.some(col => {
          const val = col.accessor(row)
          return val && String(val).toLowerCase().includes(q)
        })
      )
    }
    if (sortCol !== null) {
      const col = columns[sortCol]
      result = [...result].sort((a, b) => {
        const aVal = col.accessor(a) ?? ''
        const bVal = col.accessor(b) ?? ''
        const cmp = String(aVal).localeCompare(String(bVal), 'tr', { numeric: true })
        return sortDir === 'asc' ? cmp : -cmp
      })
    }
    return result
  }, [rows, search, sortCol, sortDir, columns])

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize))
  const paged = filtered.slice(page * pageSize, (page + 1) * pageSize)

  const handleSort = (idx) => {
    if (sortCol === idx) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    } else {
      setSortCol(idx)
      setSortDir('asc')
    }
  }

  return (
    <div>
      <div className="mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(0) }}
            placeholder={searchPlaceholder}
            className="w-full sm:w-72 pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                {columns.map((col, idx) => (
                  <th
                    key={idx}
                    className="text-left px-4 py-3 font-medium text-slate-600 cursor-pointer hover:text-slate-800 select-none"
                    onClick={() => handleSort(idx)}
                  >
                    <div className="flex items-center gap-1">
                      {col.header}
                      <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
                    </div>
                  </th>
                ))}
                {(onEdit || onDelete) && (
                  <th className="text-right px-4 py-3 font-medium text-slate-600 w-24">İşlem</th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paged.length === 0 ? (
                <tr>
                  <td colSpan={columns.length + (onEdit || onDelete ? 1 : 0)} className="px-4 py-8 text-center text-slate-400">
                    Kayıt bulunamadı.
                  </td>
                </tr>
              ) : (
                paged.map(row => (
                  <tr key={row.id} className="hover:bg-slate-50">
                    {columns.map((col, idx) => (
                      <td key={idx} className="px-4 py-3 text-slate-700">
                        {col.render ? col.render(row) : col.accessor(row)}
                      </td>
                    ))}
                    {(onEdit || onDelete) && (
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          {onEdit && (
                            <button onClick={() => onEdit(row)} className="p-1.5 rounded-lg hover:bg-blue-50 text-slate-400 hover:text-blue-600">
                              <Edit2 className="w-4 h-4" />
                            </button>
                          )}
                          {onDelete && (
                            <button onClick={() => onDelete(row)} className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-600">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="px-4 py-3 border-t border-slate-200 flex items-center justify-between text-sm">
            <span className="text-slate-500">{filtered.length} kayıt</span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setPage(p => Math.max(0, p - 1))}
                disabled={page === 0}
                className="p-1.5 rounded-lg hover:bg-slate-100 disabled:opacity-30"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="px-3 text-slate-600">{page + 1} / {totalPages}</span>
              <button
                onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
                disabled={page >= totalPages - 1}
                className="p-1.5 rounded-lg hover:bg-slate-100 disabled:opacity-30"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
