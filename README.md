# Monorepo - PPWL Project

Proyek monorepo yang mengintegrasikan Frontend (React + Vite + Tailwind + ShadCN) dan Backend (Bun + Elysia + Prisma) dengan integrasi Google Classroom API.

## 📋 Daftar Isi

- [Fitur](#-fitur)
- [Struktur Proyek](#-struktur-proyek)
- [Prasyarat](#-prasyarat)
- [Instalasi](#-instalasi)
- [Konfigurasi](#-konfigurasi)
- [Menjalankan Aplikasi](#-menjalankan-aplikasi)
- [API Endpoints](#-api-endpoints)
- [Google OAuth Setup](#-google-oauth-setup)
- [Troubleshooting](#-troubleshooting)

## ✨ Fitur

### Phase 1 - Setup Dasar
- ✅ Monorepo workspace dengan Bun
- ✅ Frontend: Vite + React + TypeScript + Tailwind CSS v4 + ShadCN UI
- ✅ Backend: Bun + ElysiaJS dengan CORS dan Swagger documentation
- ✅ Shared package untuk types yang digunakan bersama

### Phase 2 - Database & Prisma ORM
- ✅ Prisma ORM dengan SQLite database
- ✅ Model User dengan seed data
- ✅ API endpoint `/users` untuk menampilkan daftar user
- ✅ Frontend UI dengan ShadCN Table dan Card components

### Phase 3 - Google Classroom Integration
- ✅ OAuth2 Google authentication
- ✅ Integrasi Google Classroom API
- ✅ Tampilan courses (mata kuliah) mahasiswa
- ✅ Tampilan assignments (tugas) dengan status submisi
- ✅ Display skor, lampiran, dan deadline tugas
- ✅ Session management dengan cookies

## 📁 Struktur Proyek

```
monorepo/
├── apps/
│   ├── backend/
│   │   ├── prisma/
│   │   │   ├── schema.prisma      # Skema database Prisma
│   │   │   ├── db.ts              # Prisma client instance
│   │   │   ├── seed.ts            # Seed data untuk database
│   │   │   └── dev.db             # SQLite database file
│   │   ├── src/
│   │   │   ├── auth.ts            # OAuth2 Google helper
│   │   │   ├── classroom.ts       # Google Classroom API functions
│   │   │   └── index.ts           # Main ElysiaJS server
│   │   ├── .env                   # Environment variables (tidak di-commit)
│   │   └── package.json
│   │
│   └── frontend/
│       ├── src/
│       │   ├── components/ui/     # ShadCN UI components
│       │   ├── lib/utils.ts       # Utility functions
│       │   ├── App2.tsx           # Phase 2: User list UI
│       │   ├── App3.tsx           # Phase 3: Google Classroom UI
│       │   ├── main.tsx           # Entry point dengan routing
│       │   └── index.css          # Global styles
│       └── package.json
│
├── packages/
│   └── shared/
│       └── src/
│           └── index.ts           # Shared TypeScript interfaces
│
├── package.json                   # Root workspace config
└── tsconfig.json                  # Root TypeScript config
```

## 🛠 Prasyarat

Pastikan sudah terinstall:

- **Bun** v1.3.11 atau lebih baru
  ```bash
  # Install Bun (jika belum)
  curl -fsSL https://bun.sh/install | bash  # Linux/Mac
  powershell -c "irm bun.sh/install.ps1 | iex"  # Windows PowerShell
  ```

- **Node.js** v20.18+ (opsional, untuk beberapa tooling)
  ```bash
  # Cek versi
  node -v
  ```

## 📦 Instalasi

1. **Clone repository**
   ```bash
   git clone https://github.com/Vann-ui/monorepo.git
   cd monorepo
   ```

2. **Install semua dependencies**
   ```bash
   bun install
   ```

3. **Generate Prisma Client**
   ```bash
   cd apps/backend
   bun x prisma generate
   cd ../..
   ```

## ⚙️ Konfigurasi

### Backend Environment Variables

Buat file `apps/backend/.env` dengan konten berikut:

```env
# Database
DATABASE_URL="file:./dev.db"

# Google OAuth2 Credentials
GOOGLE_CLIENT_ID=your_client_id_here
GOOGLE_CLIENT_SECRET=your_client_secret_here
GOOGLE_REDIRECT_URI=http://localhost:3000/auth/callback

# Session Secret (ganti dengan random string unik)
SESSION_SECRET=your_random_secret_key_here
```

> ⚠️ **Penting:** File `.env` tidak di-commit ke Git untuk keamanan.

### Mendapatkan Google OAuth Credentials

1. Buka [Google Cloud Console](https://console.cloud.google.com/)
2. Buat project baru atau pilih project yang ada
3. Aktifkan **Google Classroom API**
4. Buka **APIs & Services → Credentials**
5. Klik **Create Credentials → OAuth client ID**
6. Pilih **Web application**
7. Tambahkan **Authorized redirect URIs**: `http://localhost:3000/auth/callback`
8. Download JSON dan salin `client_id` dan `client_secret` ke `.env`

## 🚀 Menjalankan Aplikasi

### Jalankan semua (Frontend + Backend)
```bash
bun dev
```

### Jalankan masing-masing

**Frontend saja:**
```bash
bun dev:frontend
```

**Backend saja:**
```bash
bun dev:backend
```

### Akses Aplikasi

| Service | URL | Deskripsi |
|---------|-----|-----------|
| Frontend (Phase 2) | http://localhost:5173 | User list dari database |
| Frontend (Phase 3) | http://localhost:5173/classroom | Google Classroom Viewer |
| Backend API | http://localhost:3000 | REST API |
| Swagger Docs | http://localhost:3000/swagger | API Documentation |

## 📡 API Endpoints

### Health Check
- `GET /` - Cek status server

### Users (Phase 2)
- `GET /users` - Ambil daftar user dari database

### Authentication (Phase 3)
- `GET /auth/login` - Redirect ke Google OAuth login
- `GET /auth/callback` - Google OAuth callback handler
- `GET /auth/me` - Cek status login user
- `POST /auth/logout` - Logout user

### Google Classroom (Phase 3)
- `GET /classroom/courses` - Ambil daftar mata kuliah mahasiswa
- `GET /classroom/courses/:courseId/submissions` - Ambil tugas dan submisi untuk mata kuliah tertentu

Lihat dokumentasi lengkap di: **http://localhost:3000/swagger**

## 🔐 Google OAuth Setup

### Langkah-langkah Detail

1. **Buka Google Cloud Console**
   - Kunjungi https://console.cloud.google.com/
   - Login dengan akun Google Anda

2. **Buat Project Baru**
   - Klik dropdown project di bagian atas
   - Klik **NEW PROJECT**
   - Beri nama, misalnya "monorepo"
   - Klik **CREATE**

3. **Aktifkan Google Classroom API**
   - Buka menu **APIs & Services → Library**
   - Cari "Google Classroom API"
   - Klik **ENABLE**

4. **Konfigurasi OAuth Consent Screen**
   - Buka **APIs & Services → OAuth consent screen**
   - Pilih **External** untuk User Type
   - Isi:
     - App name: `monorepo`
     - User Support Email: email Anda
     - Contact Information: email Anda
   - Klik **SAVE AND CONTINUE**
   - Lewati Scopes dan Test users
   - Klik **BACK TO DASHBOARD**

5. **Buat OAuth Credentials**
   - Buka **APIs & Services → Credentials**
   - Klik **CREATE CREDENTIALS → OAuth client ID**
   - Pilih **Web application**
   - Name: `web monorepo`
   - **Authorized redirect URIs**: `http://localhost:3000/auth/callback`
   - Klik **CREATE**
   - Download JSON dan salin credentials ke `.env`

## 🐛 Troubleshooting

### Port sudah digunakan
Jika port 5173 atau 3000 sudah digunakan:
```bash
# Kill port (sudah ada kill-port di frontend)
bunx kill-port 5173
bunx kill-port 3000
```

### redirect_uri_mismatch
Pastikan redirect URI di Google Cloud Console **persis sama** dengan yang di `.env`:
- Console: `http://localhost:3000/auth/callback`
- .env: `GOOGLE_REDIRECT_URI=http://localhost:3000/auth/callback`

### Data Classroom kosong
- Pastikan akun Google yang digunakan **terdaftar sebagai student** di Google Classroom
- Akun pribadi (@gmail.com) yang tidak join kelas akan mengembalikan data kosong
- Pastikan scope OAuth sudah benar di `src/auth.ts`

### Prisma errors
```bash
# Reset database (hati-hati, data akan hilang!)
cd apps/backend
bun x prisma migrate reset
bun x prisma generate
bun run prisma/seed.ts
```

### Module not found
```bash
# Hapus node_modules dan install ulang
rm -rf node_modules apps/*/node_modules packages/*/node_modules
bun install
```

## 📝 Scripts

| Command | Deskripsi |
|---------|-----------|
| `bun dev` | Jalankan frontend + backend bersamaan |
| `bun dev:frontend` | Jalankan frontend saja |
| `bun dev:backend` | Jalankan backend saja |
| `bun build` | Build semua aplikasi |
| `cd apps/backend && bun x prisma migrate dev` | Buat migration baru |
| `cd apps/backend && bun x prisma generate` | Generate Prisma Client |
| `cd apps/backend && bun run prisma/seed.ts` | Jalankan seed data |

## 🎯 Cara Penggunaan (Phase 3)

1. Buka **http://localhost:5173/classroom**
2. Klik tombol **"🎓 Login dengan Google"**
3. Pilih akun Google kampus yang terdaftar di Classroom
4. Izinkan akses ke Google Classroom data
5. Setelah login, pilih mata kuliah dari daftar
6. Lihat daftar tugas dengan status, skor, dan lampiran

## 📄 License

Project ini dibuat untuk keperluan pembelajaran PPWL.

---

**Dibuat dengan ❤️ menggunakan Bun, ElysiaJS, React, dan Google Classroom API**
"# Force redeploy"  
