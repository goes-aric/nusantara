# 🇮🇩 Nusantara Heritage Store — Static Website

Website statis halaman produk e-commerce dengan **Node.js** + **TailwindCSS**, dibangun dari komponen-komponen terpisah yang mudah dimodifikasi.

---

## 📁 Struktur Proyek

```
website/
├── components/             ← Komponen HTML terpisah (EDIT DI SINI!)
│   ├── header.html         ← Logo, navigasi, search bar, ikon cart/user
│   ├── content.html        ← Galeri foto, detail produk, tombol beli
│   ├── sidebar.html        ← Filter kategori, harga, rating, promo
│   ├── related-product.html ← Grid produk terkait
│   └── footer.html         ← Link kolom, newsletter, copyright
│
├── src/
│   └── input.css           ← CSS sumber untuk Tailwind CLI
│
├── public/
│   ├── index.html          ← Hasil build (jangan edit langsung)
│   └── output.css          ← CSS hasil kompilasi Tailwind
│
├── build.js                ← Script perakitan komponen → index.html
├── server.js               ← Server Express untuk menyajikan file
├── tailwind.config.js      ← Konfigurasi warna & font kustom
└── package.json            ← Dependensi & script npm
```

---

## 🚀 Cara Menjalankan

### 1. Install dependensi
```bash
npm install
```

### 2. Build CSS & HTML
```bash
npm run build
```

### 3. Jalankan server
```bash
npm start
```

Buka di browser: **http://localhost:3000**

### Mode Development (CSS watch + server)
```bash
npm run dev
```

---

## ✏️ Cara Modifikasi Komponen

Setiap bagian halaman berada di file terpisah di folder `components/`:

| File | Bagian yang Dimodifikasi |
|------|--------------------------|
| `header.html` | Logo, menu navigasi, search, cart |
| `content.html` | Foto produk, nama, harga, varian, tombol beli |
| `sidebar.html` | Filter, kategori, promo, toko pilihan |
| `related-product.html` | Kartu produk terkait |
| `footer.html` | Link footer, newsletter, metode bayar |

**Setelah mengedit komponen**, jalankan:
```bash
node build.js          # Rakit ulang HTML
# ATAU
npm run build          # Build CSS + HTML sekaligus
```

---

## 🎨 Kustomisasi Tema

Edit warna dan font di `tailwind.config.js`:

```js
colors: {
  cream: "#FAF7F2",          // Warna background utama
  terracotta: "#C4623A",     // Warna aksen utama
  "terracotta-pale": "#F5DDD4", // Aksen muda (hover, badge)
  "warm-dark": "#1C1A17",    // Teks gelap
  "warm-mid": "#4A4540",     // Teks sekunder
}
```

---

## 🛠️ Tech Stack

- **Node.js** — Runtime & server (Express)
- **TailwindCSS** — Utility-first CSS framework
- **Vanilla JS** — Interaksi ringan (galeri, qty, filter)
- **Google Fonts** — Playfair Display + DM Sans
