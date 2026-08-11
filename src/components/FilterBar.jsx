const TYPES = [
  { value: 'movie', label: 'Film' },
  { value: 'tv', label: 'Serial TV' },
  { value: 'multi', label: 'Semua' },
]

export default function FilterBar({ type, setType, year, setYear, genre, setGenre, genres, query }) {
  const genreDisabled = Boolean(query)

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="flex rounded-full border border-base-700 bg-base-900/80 p-1">
        {TYPES.map((t) => (
          <button
            key={t.value}
            type="button"
            onClick={() => setType(t.value)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
              type === t.value
                ? 'bg-brand-500 text-white shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <select
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
        disabled={genreDisabled}
        aria-label="Filter genre"
        className="h-9 rounded-full border border-base-700 bg-base-900/80 px-4 text-sm text-slate-100 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/40 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <option value="">Semua Genre</option>
        {genres.map((g) => (
          <option key={g.id} value={g.id}>
            {g.name}
          </option>
        ))}
      </select>

      <input
        type="number"
        min="1900"
        max="2100"
        value={year}
        onChange={(e) => setYear(e.target.value)}
        placeholder="Tahun (opsional)"
        className="h-9 w-36 rounded-full border border-base-700 bg-base-900/80 px-4 text-sm text-slate-100 placeholder-slate-500 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/40"
      />

      {(type || year || genre) && (
        <button
          type="button"
          onClick={() => {
            setYear('')
            setGenre('')
          }}
          className="px-3 py-2 text-sm text-slate-400 transition hover:text-slate-200"
        >
          Reset
        </button>
      )}

      {genreDisabled && (
        <span className="text-xs text-slate-500">
          Genre hanya aktif saat menjelajah (tanpa pencarian).
        </span>
      )}
    </div>
  )
}
