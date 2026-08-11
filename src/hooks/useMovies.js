import { useCallback, useEffect, useRef, useState } from 'react'
import { getPopular, searchMovies } from '../api/tmdb'

export function useMovies() {
  const [query, setQuery] = useState('')
  const [type, setType] = useState('movie')
  const [year, setYear] = useState('')
  const [page, setPage] = useState(1)
  const [results, setResults] = useState([])
  const [totalPages, setTotalPages] = useState(0)
  const [totalResults, setTotalResults] = useState(0)
  const [status, setStatus] = useState('idle') // idle | loading | error
  const [error, setError] = useState('')
  const [selected, setSelected] = useState(null)
  const requestId = useRef(0)

  const debouncedQuery = useDebounce(query, 400)

  const fetchData = useCallback(async ({ q, t, y, p, reset }) => {
    const id = ++requestId.current
    setStatus('loading')
    setError('')
    try {
      const data = q
        ? await searchMovies({ query: q, type: t, year: y, page: p })
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
  }, [debouncedQuery, type, year])

  useEffect(() => {
    fetchData({ q: debouncedQuery, t: type, y: year, p: page, reset: page === 1 })
  }, [debouncedQuery, type, year, page, fetchData])

  return {
    query,
    setQuery,
    type,
    setType,
    year,
    setYear,
    page,
    setPage,
    results,
    totalPages,
    totalResults,
    status,
    error,
    selected,
    setSelected,
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