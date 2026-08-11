const TYPES = [
  { value: 'movie', label: 'Film' },
  { value: 'tv', label: 'Serial TV' },
  { value: 'multi', label: 'Semua' },
]

export default function FilterBar({ type, setType, year, setYear }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="flex rounded-full border border-slate-700 bg-slate-900/70 p-1">
        {TYPES.map((t) => (
          <button
            key={t.value}
            type="button"
            onClick={() => setType(t.value)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
              type === t.value
                ? 'bg-blue-600 text-white shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <input
        type="number"
        min="1900"
        max="2100"
        value={year}
        onChange={(e) => setYear(e.target.value)}
        placeholder="Tahun (opsional)"
        className="w-40 rounded-full border border-slate-700 bg-slate-900/70 px-4 py-2 text-sm text-slate-100 placeholder-slate-500 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40"
      />

      {(type || year) && (
        <button
          type="button"
          onClick={() => {
            setYear('')
          }}
          className="px-3 py-2 text-sm text-slate-400 transition hover:text-slate-200"
        >
          Reset
        </button>
      )}
    </div>
  )
}