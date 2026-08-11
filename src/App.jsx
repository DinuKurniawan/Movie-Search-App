import { useMovies } from './hooks/useMovies'
import { hasApiToken } from './api/tmdb'
import SearchBar from './components/SearchBar'
import FilterBar from './components/FilterBar'
import MovieGrid, { SkeletonGrid } from './components/MovieGrid'
import Pagination from './components/Pagination'
import MovieDetail from './components/MovieDetail'
import Hero from './components/Hero'
import TrendingRow from './components/TrendingRow'

export default function App() {
  const {
    query,
    setQuery,
    type,
    setType,
    year,
    setYear,
    genre,
    setGenre,
    page,
    setPage,
    results,
    totalPages,
    totalResults,
    status,
    error,
    selected,
    setSelected,
    trending,
    genres,
  } = useMovies()

  const noToken = !hasApiToken()
  const showHero = !query && !genre && trending.length > 0
  const heroItem = showHero ? trending[0] : null

  return (
    <div className="min-h-screen bg-base-950">
      <header className="sticky top-0 z-40 border-b border-base-800/80 bg-base-950/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3.5">
          <h1 className="font-display text-3xl leading-none tracking-wide text-white">
            <span className="text-brand-500">CINEMA</span> SEARCH
          </h1>
          {query && (
            <p className="hidden text-sm text-slate-400 sm:block">
              {totalResults.toLocaleString('id-ID')} hasil untuk
              &ldquo;{query}&rdquo;
            </p>
          )}
        </div>
      </header>

      {heroItem && <Hero item={heroItem} onSelect={setSelected} />}

      <main className="mx-auto max-w-7xl px-4 py-8">
        {noToken && (
          <div className="mb-6 rounded-xl border border-amber-500/40 bg-amber-500/10 p-4 text-sm text-amber-200">
            <p className="font-semibold">API token belum diatur.</p>
            <p className="mt-1">
              Daftar di themoviedb.org &rarr; Settings &rarr; API, salin{" "}
              <code className="rounded bg-black/30 px-1">API Read Access Token</code>, lalu
              simpan di file <code className="rounded bg-black/30 px-1">.env</code>:
              <br />
              <code className="mt-1 inline-block rounded bg-black/30 px-2 py-1">
                VITE_TMDB_API_TOKEN=token_anda_di_sini
              </code>
            </p>
          </div>
        )}

        <div className="mb-6 flex flex-col gap-4">
          <SearchBar
            value={query}
            onChange={setQuery}
            onClear={() => setQuery('')}
          />
          <FilterBar
            type={type}
            setType={setType}
            year={year}
            setYear={setYear}
            genre={genre}
            setGenre={setGenre}
            genres={genres}
            query={query}
          />
        </div>

        {showHero && (
          <TrendingRow
            items={trending}
            baseType={type}
            onSelect={setSelected}
          />
        )}

        {error && (
          <div className="mb-6 rounded-xl border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-300">
            {error}
          </div>
        )}

        {status === 'loading' && results.length === 0 ? (
          <SkeletonGrid />
        ) : (
          <MovieGrid items={results} baseType={type} onSelect={setSelected} />
        )}

        {results.length > 0 && (
          <Pagination
            page={page}
            totalPages={totalPages}
            onPrev={() => setPage((p) => Math.max(1, p - 1))}
            onNext={() => setPage((p) => Math.min(totalPages, p + 1))}
          />
        )}
      </main>

      {selected && (
        <MovieDetail
          item={selected}
          baseType={type}
          onClose={() => setSelected(null)}
        />
      )}

      <footer className="border-t border-base-800/80 py-6 text-center text-xs text-slate-500">
        Data dari The Movie Database (TMDB) — dibuat dengan React &amp; Tailwind CSS
      </footer>
    </div>
  )
}