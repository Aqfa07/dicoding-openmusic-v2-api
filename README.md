# OpenMusic API v2a

## Deskripsi
OpenMusic API v2 adalah pengembangan dari OpenMusic API v1 dengan penambahan fitur playlist dan autentikasi. API ini memungkinkan pengguna untuk mengelola musik, playlist, dan berkolaborasi dengan pengguna lain.

## Fitur Utama
- Registrasi dan autentikasi pengguna
- Pengelolaan data album dan lagu
- Pengelolaan playlist pribadi
- Kolaborasi playlist dengan pengguna lain
- Pencatatan aktivitas playlist

## Teknologi yang Digunakan
- Node.js
- Hapi.js
- PostgreSQL
- JWT Authentication
- Joi Validation

## Struktur Database
API ini menggunakan beberapa tabel dalam database:
- `users`: Menyimpan data pengguna
- `authentications`: Menyimpan refresh token
- `albums`: Menyimpan data album
- `songs`: Menyimpan data lagu
- `playlists`: Menyimpan data playlist
- `playlist_songs`: Menyimpan relasi playlist dan lagu
- `collaborations`: Menyimpan data kolaborasi playlist
- `playlist_song_activities`: Menyimpan aktivitas playlist

## Cara Menjalankan

### Prasyarat
- Node.js (versi 14 atau lebih tinggi)
- PostgreSQL
- npm

### Langkah-langkah
1. Clone repository ini
2. Install dependencies:
   \`\`\`
   npm install
   \`\`\`
3. Salin file `.env.example` menjadi `.env` dan sesuaikan konfigurasi:
   \`\`\`
   cp .env.example .env
   \`\`\`
4. Buat database PostgreSQL:
   \`\`\`
   createdb openmusic
   \`\`\`
5. Jalankan migrasi database:
   \`\`\`
   npm run migrate up
   \`\`\`
6. Jalankan server dalam mode development:
   \`\`\`
   npm run dev
   \`\`\`
7. Server akan berjalan di `http://localhost:5000`

## Endpoints API

### Users & Authentication
- `POST /users`: Registrasi pengguna baru
- `POST /authentications`: Login
- `PUT /authentications`: Refresh access token
- `DELETE /authentications`: Logout

### Albums & Songs
- `POST /albums`: Menambahkan album baru
- `GET /albums/{id}`: Mendapatkan detail album
- `PUT /albums/{id}`: Mengubah album
- `DELETE /albums/{id}`: Menghapus album
- `POST /songs`: Menambahkan lagu baru
- `GET /songs`: Mendapatkan daftar lagu
- `GET /songs/{id}`: Mendapatkan detail lagu
- `PUT /songs/{id}`: Mengubah lagu
- `DELETE /songs/{id}`: Menghapus lagu

### Playlists
- `POST /playlists`: Membuat playlist baru
- `GET /playlists`: Mendapatkan daftar playlist
- `DELETE /playlists/{id}`: Menghapus playlist
- `POST /playlists/{id}/songs`: Menambahkan lagu ke playlist
- `GET /playlists/{id}/songs`: Mendapatkan daftar lagu dalam playlist
- `DELETE /playlists/{id}/songs`: Menghapus lagu dari playlist
- `GET /playlists/{id}/activities`: Mendapatkan aktivitas playlist

### Collaborations
- `POST /collaborations`: Menambahkan kolaborator ke playlist
- `DELETE /collaborations`: Menghapus kolaborator dari playlist

## Tutorial Penggunaan API

### 1. Registrasi Pengguna Baru

**Endpoint:** `POST /users`

\`\`\`bash
curl -X POST http://localhost:5000/users \
  -H "Content-Type: application/json" \
  -d '{
    "username": "johndoe",
    "password": "password123",
    "fullname": "John Doe"
  }'
\`\`\`

**Response:**
\`\`\`json
{
  "status": "success",
  "data": {
    "userId": "user-Qbax5Oy-Q8xg2IfVUstqNINp"
  }
}
\`\`\`

### 2. Login (Autentikasi)

**Endpoint:** `POST /authentications`

\`\`\`bash
curl -X POST http://localhost:5000/authentications \
  -H "Content-Type: application/json" \
  -d '{
    "username": "johndoe",
    "password": "password123"
  }'
\`\`\`

**Response:**
\`\`\`json
{
  "status": "success",
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
\`\`\`

### 3. Menambahkan Album

**Endpoint:** `POST /albums`

\`\`\`bash
curl -X POST http://localhost:5000/albums \
  -H "Content-Type: application/json" \
  -d '{
    "name": "My Album",
    "year": 2023
  }'
\`\`\`

### 4. Menambahkan Lagu

**Endpoint:** `POST /songs`

\`\`\`bash
curl -X POST http://localhost:5000/songs \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My Song",
    "year": 2023,
    "performer": "John Doe",
    "genre": "Pop",
    "duration": 240,
    "albumId": "album-Qbax5Oy-Q8xg2IfVUstqNINp"
  }'
\`\`\`

### 5. Membuat Playlist (Perlu Autentikasi)

**Endpoint:** `POST /playlists`

\`\`\`bash
curl -X POST http://localhost:5000/playlists \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -d '{
    "name": "My Favorite Songs"
  }'
\`\`\`

**Response:**
\`\`\`json
{
  "status": "success",
  "data": {
    "playlistId": "playlist-Qbax5Oy-Q8xg2IfVUstqNINp"
  }
}
\`\`\`

### 6. Menambahkan Lagu ke Playlist

**Endpoint:** `POST /playlists/{id}/songs`

\`\`\`bash
curl -X POST http://localhost:5000/playlists/playlist-Qbax5Oy-Q8xg2IfVUstqNINp/songs \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -d '{
    "songId": "song-Qbax5Oy-Q8xg2IfVUstqNINp"
  }'
\`\`\`

### 7. Mendapatkan Daftar Playlist

**Endpoint:** `GET /playlists`

\`\`\`bash
curl -X GET http://localhost:5000/playlists \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
\`\`\`

**Response:**
\`\`\`json
{
  "status": "success",
  "data": {
    "playlists": [
      {
        "id": "playlist-Qbax5Oy-Q8xg2IfVUstqNINp",
        "name": "My Favorite Songs",
        "username": "johndoe"
      }
    ]
  }
}
\`\`\`

### 8. Mendapatkan Lagu dalam Playlist

**Endpoint:** `GET /playlists/{id}/songs`

\`\`\`bash
curl -X GET http://localhost:5000/playlists/playlist-Qbax5Oy-Q8xg2IfVUstqNINp/songs \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
\`\`\`

**Response:**
\`\`\`json
{
  "status": "success",
  "data": {
    "playlist": {
      "id": "playlist-Qbax5Oy-Q8xg2IfVUstqNINp",
      "name": "My Favorite Songs",
      "username": "johndoe",
      "songs": [
        {
          "id": "song-Qbax5Oy-Q8xg2IfVUstqNINp",
          "title": "My Song",
          "performer": "John Doe"
        }
      ]
    }
  }
}
\`\`\`

### 9. Menambahkan Kolaborator ke Playlist

**Endpoint:** `POST /collaborations`

\`\`\`bash
curl -X POST http://localhost:5000/collaborations \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -d '{
    "playlistId": "playlist-Qbax5Oy-Q8xg2IfVUstqNINp",
    "userId": "user-BfQX6tkjP4kY0O2qps4-VEIyv"
  }'
\`\`\`

### 10. Melihat Aktivitas Playlist

**Endpoint:** `GET /playlists/{id}/activities`

\`\`\`bash
curl -X GET http://localhost:5000/playlists/playlist-Qbax5Oy-Q8xg2IfVUstqNINp/activities \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
\`\`\`

**Response:**
\`\`\`json
{
  "status": "success",
  "data": {
    "playlistId": "playlist-Qbax5Oy-Q8xg2IfVUstqNINp",
    "activities": [
      {
        "username": "johndoe",
        "title": "My Song",
        "action": "add",
        "time": "2023-12-07T10:30:00.000Z"
      }
    ]
  }
}
\`\`\`

### 11. Refresh Access Token

**Endpoint:** `PUT /authentications`

\`\`\`bash
curl -X PUT http://localhost:5000/authentications \
  -H "Content-Type: application/json" \
  -d '{
    "refreshToken": "YOUR_REFRESH_TOKEN"
  }'
\`\`\`

### 12. Logout

**Endpoint:** `DELETE /authentications`

\`\`\`bash
curl -X DELETE http://localhost:5000/authentications \
  -H "Content-Type: application/json" \
  -d '{
    "refreshToken": "YOUR_REFRESH_TOKEN"
  }'
\`\`\`

## Contoh Skenario Penggunaan

### Skenario 1: Membuat Playlist dan Menambahkan Lagu

1. **Registrasi** pengguna baru
2. **Login** untuk mendapatkan access token
3. **Buat album** baru
4. **Tambahkan lagu** ke album
5. **Buat playlist** baru
6. **Tambahkan lagu** ke playlist
7. **Lihat isi playlist**

### Skenario 2: Kolaborasi Playlist

1. **User A** membuat playlist
2. **User B** registrasi dan login
3. **User A** menambahkan **User B** sebagai kolaborator
4. **User B** dapat menambah/hapus lagu dari playlist
5. **Lihat aktivitas** playlist untuk melihat siapa yang melakukan apa

## Tips Penggunaan

1. **Simpan Access Token**: Access token berlaku selama 30 menit (1800 detik)
2. **Gunakan Refresh Token**: Jika access token expired, gunakan refresh token untuk mendapatkan yang baru
3. **Authorization Header**: Semua endpoint playlist dan kolaborasi memerlukan header `Authorization: Bearer YOUR_ACCESS_TOKEN`
4. **Error Handling**: Selalu cek response status dan message untuk debugging
5. **Database Relationship**: Pastikan albumId dan songId valid saat menambahkan lagu

## Kriteria Utama
1. Registrasi dan Autentikasi Pengguna
2. Pengelolaan Data Playlist
3. Menerapkan Foreign Key
4. Menerapkan Data Validation
5. Penanganan Error (Error Handling)
6. Mempertahankan Fitur OpenMusic API versi 1

## Kriteria Opsional
1. Fitur kolaborator playlist
2. Fitur Playlist Activities
3. Mempertahankan Kriteria Opsional OpenMusic V1

## Lisensi
© 2023 OpenMusic API
