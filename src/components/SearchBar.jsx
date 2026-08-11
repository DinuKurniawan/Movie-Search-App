export default function SearchBar({ value, onChange, onClear }) {
  return (
    <div className="relative w-full">
      <svg
        className="pointer-events-none absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-slate-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-4.35-4.35M17 10.5a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z"
        />
      </svg>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Cari judul film, serial, atau orang..."
        className="w-full rounded-full border border-base-700 bg-base-900/80 py-3.5 pr-12 pl-12 text-slate-100 placeholder-slate-500 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/40"
      />
      {value && (
        <button
          type="button"
          onClick={onClear}
          aria-label="Bersihkan pencarian"
          className="absolute top-1/2 right-4 -translate-y-1/2 rounded-full p-1 text-slate-400 transition hover:bg-slate-800 hover:text-slate-200"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  )
}