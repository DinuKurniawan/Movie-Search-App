import { useCallback, useEffect, useRef, useState } from 'react'
import { posterUrl } from '../api/helpers'
import { useScrollReveal } from '../hooks/useScrollReveal'

export default function TrendingRow({ items, baseType, onSelect }) {
  const containerRef = useRef(null)
  const { ref: sectionRef, visible } = useScrollReveal()
  const [canLeft, setCanLeft] = useState(false)
  const [canRight, setCanRight] = useState(false)
  const [progress, setProgress] = useState(0)

  const updateArrows = useCallback(() => {
    const el = containerRef.current
    if (!el) return
    const max = el.scrollWidth - el.clientWidth
    setCanLeft(el.scrollLeft > 0)
    setCanRight(el.scrollLeft < max - 1)
    setProgress(max > 0 ? el.scrollLeft / max : 0)
  }, [])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    updateArrows()
    el.addEventListener('scroll', updateArrows)
    const ro = new ResizeObserver(updateArrows)
    ro.observe(el)
    return () => {
      el.removeEventListener('scroll', updateArrows)
      ro.disconnect()
    }
  }, [updateArrows])

  const scrollBy = (dir) => {
    const el = containerRef.current
    if (!el) return
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: 'smooth' })
  }

  if (!items.length) return null

  const arrowBase =
    'absolute top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-base-700 bg-base-900/80 text-slate-200 backdrop-blur transition enabled:hover:border-brand-500 enabled:hover:bg-brand-500 enabled:hover:text-white disabled:cursor-not-allowed disabled:opacity-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/50'

  return (
    <section
      ref={sectionRef}
      className={`group/row mb-10 reveal-on-scroll ${visible ? 'is-visible' : ''}`}
    >
      <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-white">
        🔥 Trending
        <span className="hidden text-sm font-normal text-slate-500 sm:block">
          Paling banyak dicari minggu ini
        </span>
      </h3>

      <div className="relative">
        <button
          type="button"
          onClick={() => scrollBy(-1)}
          disabled={!canLeft}
          aria-label="Geser ke kiri"
          className={`${arrowBase} left-0 opacity-0 group-hover/row:opacity-100`}
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => scrollBy(1)}
          disabled={!canRight}
          aria-label="Geser ke kanan"
          className={`${arrowBase} right-0 opacity-0 group-hover/row:opacity-100`}
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <div ref={containerRef} className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-6 sm:gap-4">
          {items.map((item, i) => {
            const title = item.title || item.name || 'Tanpa Judul'
            const poster = posterUrl(item.poster_path, 'w342')
            const rating = item.vote_average ? item.vote_average.toFixed(1) : null
            return (
              <button
                key={`${item.media_type ?? baseType}-${item.id}`}
                type="button"
                onClick={() => onSelect(item)}
                className="group/card relative w-36 shrink-0 snap-start text-left sm:w-44"
              >
                <div className="relative aspect-[2/3] overflow-hidden rounded-xl border border-base-700 bg-base-800">
                  {poster ? (
                    <img
                      src={poster}
                      alt={title}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-300 group-hover/card:scale-110"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center p-3 text-center text-xs text-slate-500">
                      {title}
                    </div>
                  )}
                  <div className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-base-950/90 via-transparent to-transparent opacity-0 transition group-hover/card:opacity-100">
                    <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-brand-500 text-white shadow-lg">
                      ▶
                    </span>
                  </div>
                  {rating != null && (
                    <span className="absolute top-2 right-2 rounded-full bg-black/70 px-1.5 py-0.5 text-[10px] font-semibold text-amber-400 backdrop-blur">
                      ★ {rating}
                    </span>
                  )}
                  <span className="absolute bottom-1 left-2 font-display text-5xl leading-none text-slate-700/80 drop-shadow-lg transition group-hover/card:text-brand-500">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <p className="mt-2 line-clamp-1 text-sm font-medium text-slate-200 group-hover/card:text-white">
                  {title}
                </p>
              </button>
            )
          })}
        </div>

      </div>

      <div className="mt-1 h-1 w-full overflow-hidden rounded-full bg-base-800">
        <div
          className="h-full rounded-full bg-brand-500 transition-[width] duration-300"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
    </section>
  )
}