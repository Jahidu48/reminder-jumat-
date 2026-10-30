# Reminder Jumat — Jumatan Interactive Flow

Single Page Application (SPA) interaktif bertema **Pengingat Salat Jumat** dengan estetika **Warm Cream, Beige & Soft Sage**, foto karakter bergaya stiker modern, sinkronisasi audio otomatis, serta kutipan Dalil Al-Qur'an & Hadits Shahih.

## Tech Stack
- **React 18** + **Vite 6**
- **Tailwind CSS 3**
- **Framer Motion**
- **Lucide React**

## Fitur Utama
- **Time-Aware System**: Mendeteksi waktu lokal secara otomatis pada hari **Jumat pukul 11:00 – 13:00** dan memunculkan *floating banner* pengingat waktu Jumatan.
- **Layar Utama (`GA JUMATAN KAH?`)**: Kartu *frosted glass* hangat dengan foto stiker karakter, tombol **YES** (*hover glow* statis), dan tombol **NO** (*micro-jitter* saat di-*hover*).
- **Mode Peringatan Bertahap + Audio Sinkron (`NO`)**:
  1. `NGATUR LUWH!` — Layar merah marun dengan efek *heavy shake & glitch* diiringi suara ceramah pengingat.
  2. `SEKEDAR MENGINGATKAN` — Layar hitam pekat dengan stiker keris & pedang merah berkedip.
  3. `PAKAIAN SEMBAHYANG: ON` — *Flash* putih terang menuju halaman pencari masjid.
- **Pencari Masjid & Dalil (`INFOKAN MASJID TERDEKAT`)**: Menampilkan kutipan **QS. Al-Jumu'ah: 9** & **Hadits Shahih Muslim**, komponen *Mock-up Map*, musik latar menenangkan, serta tombol langsung **Buka Google Maps**.

## Menjalankan Proyek Secara Lokal
```bash
npm install
npm run dev
```
