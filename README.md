# Movie Search App

Aplikasi pencarian film berbasis web yang dibangun dengan **React**, **Tailwind CSS**, dan **REST API TMDB**.

## Fitur

- Pencarian judul film / serial TV (dengan debounce otomatis)
- Filter tipe: Film, Serial TV, atau Semua
- Filter tahun rilis
- Pagination (Sebelumnya / Berikutnya)
- Detail lengkap dalam modal (overview, rating, genre, pemain utama, trailer)
- Tampilan awal menampilkan daftar film populer (tab "Semua" memakai `/trending/all/week`)
- Grid responsif dengan skeleton loading saat memuat data
- Dark theme
- Ter-deploy di GitHub Pages dengan custom domain

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

## Deploy ke GitHub Pages

App ini di-deploy otomatis ke GitHub Pages melalui GitHub Actions (`.github/workflows/deploy.yml`) saat ada push ke `main`. Live: <https://moviesearchapp.codeunchs.my.id>

Poin penting:

- `vite.config.js` memakai `base: '/'` karena disajikan di root custom domain.
- Workflow membangun dari `dist/` lalu meng-upload artifact ke GitHub Pages — pastikan di **Settings → Pages → Build and deployment** source-nya **"GitHub Actions"**, bukan "Deploy from a branch".
- Custom domain diatur di **Settings → Pages → Custom domain**.
- Token API dibaca dari GitHub Actions secret `VITE_TMDB_API_TOKEN` (bukan dari `.env` lokal):
  1. **Settings → Secrets and variables → Actions → New repository secret**
  2. Nama: `VITE_TMDB_API_TOKEN`, isi dengan API Read Access Token TMDB.
- Setelah secret ditambahkan, trigger ulang workflow **"Deploy to GitHub Pages"** agar token ikut ter-bundle.

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
