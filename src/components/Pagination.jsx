export default function Pagination({ page, totalPages, onPrev, onNext }) {
  if (totalPages <= 1) return null

  return (
    <div className="flex items-center justify-center gap-4 py-10">
      <button
        type="button"
        disabled={page <= 1}
        onClick={onPrev}
        className="rounded-full border border-base-700 bg-base-900 px-5 py-2 text-sm text-slate-200 transition enabled:hover:border-brand-500/60 enabled:hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
      >
        ← Sebelumnya
      </button>

      <span className="text-sm text-slate-400">
        Halaman <span className="font-semibold text-slate-200">{page}</span> dari {totalPages}
      </span>

      <button
        type="button"
        disabled={page >= totalPages}
        onClick={onNext}
        className="rounded-full border border-base-700 bg-base-900 px-5 py-2 text-sm text-slate-200 transition enabled:hover:border-brand-500/60 enabled:hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
      >
        Berikutnya →
      </button>
    </div>
  )
}