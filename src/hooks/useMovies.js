import { useCallback, useEffect, useRef, useState } from 'react'
import { getDiscover, getGenres, getPopular, getTrending, searchMovies } from '../api/tmdb'

const TRENDING_REFRESH_INTERVAL = 60 * 60 * 1000

export function useMovies() {
  const [query, setQuery] = useState('')
  const [type, setType] = useState('movie')
  const [year, setYear] = useState('')
  const [genre, setGenre] = useState('')
  const [page, setPage] = useState(1)
  const [results, setResults] = useState([])
  const [totalPages, setTotalPages] = useState(0)
  const [totalResults, setTotalResults] = useState(0)
  const [status, setStatus] = useState('idle') // idle | loading | error
  const [error, setError] = useState('')
  const [selected, setSelected] = useState(null)
  const [trending, setTrending] = useState([])
  const [genres, setGenres] = useState([])
  const requestId = useRef(0)
  const trendingRequestId = useRef(0)

  const debouncedQuery = useDebounce(query, 400)

  const fetchData = useCallback(async ({ q, t, y, g, p, reset }) => {
    const id = ++requestId.current
    setStatus('loading')
    setError('')
    try {
      const data = q
        ? await searchMovies({ query: q, type: t, year: y, page: p })
        : g
          ? await getDiscover({ genre: g, page: p })
          : await getPopular(t, p)
      if (id !== requestId.current) return
      const items = Array.isArray(data.results) ? data.results : []
      setResults((prev) => (reset ? items : [...prev, ...items]))
      setTotalPages(data.total_pages ?? 0)
      setTotalResults(data.total_results ?? 0)
      setStatus('idle')
    } catch (err) {
      if (id !== requestId.current) return
      setStatus('error')
      setError(
        err.response?.data?.status_message ||
          'Gagal mengambil data. Periksa koneksi / API token.',
      )
    }
  }, [])

  // reset ke halaman 1 saat pencarian/filter berubah
  useEffect(() => {
    setPage(1)
  }, [debouncedQuery, type, year, genre])

  useEffect(() => {
    fetchData({ q: debouncedQuery, t: type, y: year, g: genre, p: page, reset: page === 1 })
  }, [debouncedQuery, type, year, genre, page, fetchData])

  const refreshTrending = useCallback(async () => {
    if (document.visibilityState === 'hidden') return

    const id = ++trendingRequestId.current
    try {
      const data = await getTrending()
      if (id !== trendingRequestId.current) return
      setTrending((data.results ?? []).filter((it) => it.media_type !== 'person'))
    } catch {
      // Pertahankan data trending sebelumnya jika refresh gagal.
    }
  }, [])

  // Refresh trending saat mount, tab kembali aktif, dan setiap satu jam.
  useEffect(() => {
    let active = true

    const loadTrending = () => {
      if (active) refreshTrending()
    }

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') loadTrending()
    }

    loadTrending()
    const intervalId = window.setInterval(loadTrending, TRENDING_REFRESH_INTERVAL)
    document.addEventListener('visibilitychange', handleVisibilityChange)

    getGenres()
      .then((data) => {
        if (active) setGenres(data.genres ?? [])
      })
      .catch(() => {})

    return () => {
      active = false
      trendingRequestId.current += 1
      window.clearInterval(intervalId)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [refreshTrending])

  return {
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
  }
}

function useDebounce(value, delay = 400) {
  const [debounced, setDebounced] = useState(value)
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(t)
  }, [value, delay])
  return debounced
}
