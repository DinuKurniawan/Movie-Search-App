import { posterUrl, yearFromDate } from '../api/helpers'

export default function MovieCard({ item, onClick }) {
  const title = item.title || item.name || 'Tanpa Judul'
  const date = item.release_date || item.first_air_date || ''
  const year = yearFromDate(date)
  const poster = posterUrl(item.poster_path)
  const rating = item.vote_average ? item.vote_average.toFixed(1) : null

  return (
    <button
      type="button"
      onClick={() => onClick(item)}
      className="group flex w-full flex-col overflow-hidden rounded-xl border border-base-700 bg-base-900 text-left transition hover:-translate-y-1 hover:border-brand-500/60 hover:shadow-xl hover:shadow-brand-500/10"
    >
      <div className="relative aspect-[2/3] w-full overflow-hidden bg-base-800">
        {poster ? (
          <img
            src={poster}
            alt={title}
            loading="lazy"
            className="h-full w-full object-cover transition duration-300 group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center p-4 text-center text-sm text-slate-500">
            {title}
          </div>
        )}
        <div className="absolute inset-0 flex items-center justify-center bg-base-950/60 opacity-0 transition group-hover:opacity-100">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-500 text-white shadow-lg shadow-brand-500/40 transition group-hover:scale-110">
            ▶
          </span>
        </div>
        {rating != null && (
          <span className="absolute top-2 right-2 rounded-full bg-black/70 px-2 py-1 text-xs font-semibold text-amber-400 backdrop-blur">
            ★ {rating}
          </span>
        )}
      </div>
      <div className="flex flex-col gap-1 p-3">
        <h3 className="line-clamp-2 text-sm font-semibold text-slate-100">
          {title}
        </h3>
        {year && <p className="text-xs text-slate-400">{year}</p>}
      </div>
    </button>
  )
}