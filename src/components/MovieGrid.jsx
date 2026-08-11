import MovieCard from './MovieCard'

export default function MovieGrid({ items, baseType, onSelect }) {
  const visible = items.filter((it) => it.media_type !== 'person')

  if (visible.length === 0) {
    return (
      <p className="py-24 text-center text-slate-400">
        Tidak ada hasil yang ditemukan.
      </p>
    )
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {visible.map((item) => (
        <MovieCard
          key={`${item.media_type ?? baseType}-${item.id}`}
          item={item}
          onClick={(it) => onSelect(it)}
        />
      ))}
    </div>
  )
}

export function SkeletonGrid() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className="animate-pulse overflow-hidden rounded-xl border border-slate-800 bg-slate-900"
        >
          <div className="aspect-[2/3] w-full bg-slate-800" />
          <div className="space-y-2 p-3">
            <div className="h-3 w-3/4 rounded bg-slate-800" />
            <div className="h-3 w-1/3 rounded bg-slate-800" />
          </div>
        </div>
      ))}
    </div>
  )
}