import { posterUrl, yearFromDate } from '../api/helpers'

export default function Hero({ item, onSelect }) {
  if (!item) return null

  const title = item.title || item.name || 'Tanpa Judul'
  const overview = item.overview || ''
  const year = yearFromDate(item.release_date || item.first_air_date)
  const rating = item.vote_average ? item.vote_average.toFixed(1) : null
  const backdrop = posterUrl(item.backdrop_path, 'w1280')

  return (
    <section className="relative -mt-8 mb-10 overflow-hidden sm:-mt-10">
      <div className="relative aspect-[4/3] max-h-[560px] w-full overflow-hidden sm:aspect-video sm:h-[70vh]">
        {backdrop ? (
          <img
            src={backdrop}
            alt={title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-base-800 to-base-900" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-base-950 via-base-950/60 to-base-950/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-base-950/80 via-transparent to-transparent" />

        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto w-full max-w-7xl px-4 pb-10 sm:pb-16">
            <p className="mb-2 text-xs font-semibold tracking-[0.3em] text-brand-400 uppercase animate-fade-in-up">
              Trending Minggu Ini
            </p>
            <h2 className="font-display text-5xl leading-none tracking-wide text-white sm:text-7xl lg:text-8xl animate-fade-in-up">
              {title}
            </h2>

            <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-slate-300">
              {rating != null && (
                <span className="rounded-full bg-brand-500/20 px-2.5 py-1 font-semibold text-brand-400">
                  ★ {rating}
                </span>
              )}
              {year && <span className="text-slate-400">{year}</span>}
            </div>

            {overview && (
              <p className="mt-3 line-clamp-3 max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base">
                {overview}
              </p>
            )}

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => onSelect(item)}
                className="inline-flex items-center gap-2 rounded-lg bg-brand-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-500/30 transition hover:bg-brand-400"
              >
                ▶ Detail
              </button>
              <a
                href={`https://www.themoviedb.org/search?query=${encodeURIComponent(title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-slate-100 px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-white"
              >
                ↗ Kunjungi TMDB
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
