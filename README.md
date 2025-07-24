# 🎧 OpenMusic API v2

## 📘 Deskripsi
OpenMusic API v2 adalah pengembangan dari versi v1 dengan penambahan fitur **playlist**, **autentikasi**, dan **kolaborasi**.  
API ini memungkinkan pengguna untuk mengelola musik, membuat playlist pribadi, dan berbagi playlist dengan pengguna lain.

---

## 🚀 Fitur Utama

- 🔐 Registrasi & Autentikasi Pengguna (JWT)
- 💽 Manajemen Album & Lagu
- 🎶 Playlist Pribadi & Kolaborasi
- 📊 Aktivitas Playlist
- ✅ Validasi Input dengan Joi
- ⚙️ Error Handling yang Konsisten

---

## 🧰 Teknologi

- Node.js
- Hapi.js
- PostgreSQL
- JWT Authentication
- Joi Validation

---

## 🗂️ Struktur Database

- `users`: Data pengguna
- `authentications`: Refresh token
- `albums`: Data album
- `songs`: Data lagu
- `playlists`: Data playlist
- `playlist_songs`: Relasi lagu dan playlist
- `collaborations`: Data kolaborasi playlist
- `playlist_song_activities`: Aktivitas pengguna dalam playlist

---

## 🛠️ Cara Menjalankan

### Prasyarat
- Node.js ≥ 14
- PostgreSQL
- npm

### Langkah-langkah
```bash
# 1. Clone repository
git clone <repo-url>

# 2. Install dependencies
npm install

# 3. Copy dan edit konfigurasi
cp .env.example .env

# 4. Buat database PostgreSQL
createdb openmusic

# 5. Jalankan migrasi database
npm run migrate up

# 6. Jalankan server development
npm run dev
```

Server berjalan di `http://localhost:5000`

---

## 🌐 Endpoints API

### 🔐 Users & Auth
- `POST /users` – Registrasi
- `POST /authentications` – Login
- `PUT /authentications` – Refresh token
- `DELETE /authentications` – Logout

### 💿 Albums & Songs
- CRUD `albums` dan `songs`

### 🎵 Playlists
- `POST /playlists`
- `GET /playlists`
- `DELETE /playlists/{id}`
- `POST /playlists/{id}/songs`
- `GET /playlists/{id}/songs`
- `DELETE /playlists/{id}/songs`
- `GET /playlists/{id}/activities`

### 🤝 Collaborations
- `POST /collaborations`
- `DELETE /collaborations`

---

## 📦 Contoh Penggunaan (cURL)

### ✅ Registrasi Pengguna
```bash
curl -X POST http://localhost:5000/users \
  -H "Content-Type: application/json" \
  -d '{"username":"johndoe","password":"password123","fullname":"John Doe"}'
```

### 🔐 Login
```bash
curl -X POST http://localhost:5000/authentications \
  -H "Content-Type: application/json" \
  -d '{"username":"johndoe","password":"password123"}'
```

### 💿 Tambah Album
```bash
curl -X POST http://localhost:5000/albums \
  -H "Content-Type: application/json" \
  -d '{"name":"My Album","year":2023}'
```

### 🎵 Tambah Lagu
```bash
curl -X POST http://localhost:5000/songs \
  -H "Content-Type: application/json" \
  -d '{"title":"My Song","year":2023,"performer":"John","genre":"Pop","duration":240}'
```

### 📻 Buat Playlist (dengan Token)
```bash
curl -X POST http://localhost:5000/playlists \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name":"My Favorite Songs"}'
```

### ➕ Tambah Lagu ke Playlist
```bash
curl -X POST http://localhost:5000/playlists/{id}/songs \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"songId":"song-xyz"}'
```

---

## 🎯 Contoh Skenario

### Skenario 1: Playlist Pribadi
1. Registrasi & login
2. Tambah album & lagu
3. Buat playlist
4. Tambah lagu ke playlist
5. Lihat isi playlist

### Skenario 2: Kolaborasi Playlist
1. User A membuat playlist
2. User B registrasi & login
3. A menambahkan B sebagai kolaborator
4. B bisa menambah/menghapus lagu
5. Cek aktivitas playlist

---

## 💡 Tips
- Simpan access token dengan baik
- Gunakan refresh token untuk mendapatkan token baru
- Semua request ke playlist & kolaborasi membutuhkan `Authorization: Bearer <token>`
- Cek response status & message untuk debugging

---

## 📌 Kriteria Penilaian

### Utama:
- Autentikasi & registrasi
- Playlist (CRUD)
- Foreign key & validasi data
- Error handling konsisten

### Opsional:
- Kolaborator playlist
- Aktivitas playlist

---

## 📝 Lisensi

© 2023 OpenMusic API
