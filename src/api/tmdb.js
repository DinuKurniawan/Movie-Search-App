import axios from 'axios'

const BASE_URL = 'https://api.themoviedb.org/3'
const TOKEN = import.meta.env.VITE_TMDB_API_TOKEN

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: TOKEN
    ? { Authorization: `Bearer ${TOKEN}` }
    : {},
})

export function hasApiToken() {
  return Boolean(TOKEN)
}

// Cari movie / tv / keduanya berdasarkan title + tahun
export async function searchMovies({ query, type = 'movie', year = '', page = 1 }) {
  const endpoint = type === 'multi' ? '/search/multi' : `/search/${type}`
  const params = { query, page, include_adult: false }
  if (year) {
    params[type === 'tv' ? 'first_air_date_year' : 'primary_release_year'] = year
  }
  const { data } = await api.get(endpoint, { params })
  return data
}

// Ambil detail lengkap sebuah movie/tv/series
export async function getDetail(id, type = 'movie') {
  const { data } = await api.get(`/${type}/${id}`, {
    params: { append_to_response: 'credits,videos' },
  })
  return data
}

// Daftar film populer (untuk landing tanpa keyword)
export async function getPopular(type = 'movie', page = 1) {
  const endpoint = type === 'multi' ? '/trending/all/week' : `/${type}/popular`
  const { data } = await api.get(endpoint, { params: { page } })
  return data
}

// Film/serial yang sedang trending minggu ini
export async function getTrending() {
  const { data } = await api.get('/trending/all/week')
  return data
}

// Daftar genre film (untuk dropdown filter)
export async function getGenres() {
  const { data } = await api.get('/genre/movie/list', { params: { language: 'id-ID' } })
  return data
}

// Film populer per genre (dipakai saat dropdown genre terpilih)
export async function getDiscover({ genre, page = 1 }) {
  const { data } = await api.get('/discover/movie', {
    params: { with_genres: genre, sort_by: 'popularity.desc', page },
  })
  return data
}