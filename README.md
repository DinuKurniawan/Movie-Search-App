# Movie Search App

Aplikasi pencarian film berbasis web yang dibangun dengan **React**, **Tailwind CSS**, dan **REST API TMDB**.

## Fitur

- Pencarian judul film / serial TV (dengan debounce otomatis)
- Filter tipe: Film, Serial TV, atau Semua
- Filter tahun rilis
- Pagination (Sebelumnya / Berikutnya)
- Detail lengkap dalam modal (overview, rating, genre, pemain utama, trailer)
- Tampilan awal menampilkan daftar film populer
- Grid responsif dengan skeleton loading saat memuat data
- Dark theme

## Tech Stack

- [Vite](https://vite.dev) + React 19
- [Tailwind CSS](https://tailwindcss.com) v4 (via `@tailwindcss/vite`)
- [axios](https://axios-http.com)
- REST API: [The Movie Database (TMDB)](https://www.themoviedb.org) v3

## Struktur Folder

```
src/
├── api/
│   ├── tmdb.js          # Wrapper REST API TMDB (axios)
│   └── helpers.js       # Helper URL poster & tahun
├── hooks/
│   └── useMovies.js     # State pencarian, filter, pagination, debounce
└── components/
    ├── SearchBar.jsx    # Input pencarian
    ├── FilterBar.jsx    # Filter tipe & tahun
    ├── MovieCard.jsx    # Kartu film
    ├── MovieGrid.jsx    # Grid hasil + skeleton loading
    ├── Pagination.jsx   # Navigasi halaman
    └── MovieDetail.jsx  # Modal detail film
```

## Cara Menjalankan

### 1. Dapatkan API Token TMDB

1. Daftar gratis di [themoviedb.org](https://www.themoviedb.org).
2. Buka **Settings → API**, buat **API Read Access Token**.

### 2. Konfigurasi `.env`

```powershell
Copy-Item .env.example .env
```

Buka file `.env` dan isi:

```env
VITE_TMDB_API_TOKEN=token_anda_di_sini
```

### 3. Install & Jalankan

```powershell
npm install
npm run dev
```

Buka **http://localhost:5173** di browser.

## Build Produksi

```powershell
npm run build     # hasil produksi di folder dist/
npm run preview   # preview hasil build secara lokal
```

## Lint

```powershell
npm run lint
```

## Disclaimer

Seluruh data (judul, poster, rating, dll.) bersumber dari [The Movie Database (TMDB)](https://www.themoviedb.org) dan dilindungi hak cipta masing-masing pemiliknya.
