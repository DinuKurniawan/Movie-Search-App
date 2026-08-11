import { useEffect, useState } from 'react'
import { getDetail } from '../api/tmdb'
import { posterUrl, yearFromDate } from '../api/helpers'

export default function MovieDetail({ item, baseType, onClose }) {
  const detailType = item.media_type && item.media_type !== 'person' ? item.media_type : baseType
  const [detail, setDetail] = useState(null)
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true
    setStatus('loading')
    setError('')
    getDetail(item.id, detailType)
      .then((data) => {
        if (active) {
          setDetail(data)
          setStatus('idle')
        }
      })
      .catch(() => {
        if (active) {
          setError('Gagal memuat detail.')
          setStatus('idle')
        }
      })
    return () => {
      active = false
    }
  }, [item.id, detailType])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const poster = posterUrl(item.poster_path, 'w500')
  const backdrop = item.backdrop_path || detail?.backdrop_path

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

      <div className="relative z-10 max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-base-700 bg-base-900 shadow-2xl">
        <div className="relative">
          {backdrop ? (
            <img
              src={posterUrl(backdrop, 'w1280')}
              alt=""
              className="h-56 w-full object-cover sm:h-72"
            />
          ) : (
            <div className="h-40 w-full bg-gradient-to-br from-base-800 to-base-900 sm:h-52" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-base-900 via-base-900/40 to-transparent" />

          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup"
            className="absolute top-3 right-3 rounded-full bg-black/60 p-2 text-slate-200 transition hover:bg-black/80 hover:text-white"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {status === 'loading' && (
          <div className="space-y-3 p-6">
            <div className="h-6 w-2/3 animate-pulse rounded bg-base-800" />
            <div className="h-4 w-1/2 animate-pulse rounded bg-base-800" />
            <div className="h-24 w-full animate-pulse rounded bg-base-800" />
          </div>
        )}

        {error && <p className="p-6 text-slate-400">{error}</p>}

        {status === 'idle' && detail && (
          <div className="p-6">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
              <img
                src={poster}
                alt={detail.title || detail.name}
                className="mx-auto h-64 w-44 shrink-0 rounded-xl border border-base-700 object-cover sm:mx-0"
              />
              <div>
                <h2 className="text-2xl font-bold text-white">
                  {detail.title || detail.name}
                </h2>
                {detail.tagline && (
                  <p className="mt-1 text-sm italic text-slate-400">{detail.tagline}</p>
                )}

                <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-slate-300">
                  {detail.vote_average > 0 && (
                    <span className="rounded-full bg-amber-500/15 px-2.5 py-1 font-semibold text-amber-400">
                      ★ {detail.vote_average.toFixed(1)}
                    </span>
                  )}
                  {yearFromDate(detail.release_date || detail.first_air_date) && (
                    <span className="text-slate-400">{yearFromDate(detail.release_date || detail.first_air_date)}</span>
                  )}
                  {detail.runtime > 0 && (
                    <span className="text-slate-400">{detail.runtime} menit</span>
                  )}
                </div>

                {detail.genres?.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {detail.genres.map((g) => (
                      <span key={g.id} className="rounded-full border border-base-700 px-2.5 py-0.5 text-xs text-slate-300">
                        {g.name}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {detail.overview && (
              <p className="mt-5 leading-relaxed text-slate-300">{detail.overview}</p>
            )}

            {detail.credits?.cast?.length > 0 && (
              <div className="mt-6">
                <h3 className="mb-3 text-sm font-semibold tracking-wide text-slate-400 uppercase">
                  Pemain Utama
                </h3>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {detail.credits.cast.slice(0, 6).map((c) => (
                    <div key={c.cast_id ?? c.id} className="flex items-center gap-2">
                      {c.profile_path ? (
                        <img
                          src={posterUrl(c.profile_path, 'w185')}
                          alt={c.name}
                          className="h-10 w-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="h-10 w-10 rounded-full bg-base-800" />
                      )}
                      <div className="min-w-0">
                        <p className="truncate text-sm text-slate-200">{c.name}</p>
                        <p className="truncate text-xs text-slate-500">{c.character}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {detail.videos?.results?.length > 0 && (
              <a
                href={`https://www.youtube.com/watch?v=${detail.videos.results[0].key}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-500 px-5 py-2 text-sm font-semibold text-white transition hover:bg-brand-400"
              >
                ▶ Tonton Trailer
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  )
}