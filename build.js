/**
 * build.js — Script untuk merakit halaman HTML dari komponen-komponen terpisah
 *
 * Cara kerja:
 *  1. Baca masing-masing file komponen di folder /components
 *  2. Sisipkan ke dalam template HTML utama
 *  3. Tulis hasil akhir ke /public/index.html
 *
 * Jalankan dengan: node build.js
 */

const fs   = require("fs");
const path = require("path");

const COMPONENTS_DIR = path.join(__dirname, "components");
const OUTPUT_FILE    = path.join(__dirname, "public", "index.html");

/** Baca file komponen, kembalikan string kosong jika gagal */
function readComponent(filename) {
  const filePath = path.join(COMPONENTS_DIR, filename);
  if (!fs.existsSync(filePath)) {
    console.warn(`⚠️  Komponen tidak ditemukan: ${filename}`);
    return `<!-- MISSING: ${filename} -->`;
  }
  return fs.readFileSync(filePath, "utf-8");
}

/** Rakit halaman HTML penuh dari semua komponen */
function buildPage() {
  const header         = readComponent("header.html");
  const content        = readComponent("content.html");
  const sidebar        = readComponent("sidebar.html");
  const relatedProduct = readComponent("related-product.html");
  const footer         = readComponent("footer.html");

  const html = /* html */`<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="Nusantara Heritage Store — Platform terpercaya produk warisan budaya Indonesia: batik tulis, tenun ikat, kerajinan tangan, dan kuliner otentik." />
  <title>Batik Tulis Motif Parang Rusak — Nusantara Heritage Store</title>

  <!-- Tailwind CSS via CDN (untuk preview/demo) -->
  <!-- PRODUCTION: ganti dengan <link rel="stylesheet" href="/output.css" /> setelah npm run build -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            cream: "#FAF7F2",
            "warm-dark": "#1C1A17",
            "warm-mid": "#4A4540",
            terracotta: "#C4623A",
            "terracotta-light": "#E8835F",
            "terracotta-pale": "#F5DDD4",
            "border-warm": "#E5DDD4",
            "sand": "#D4C5B0",
          },
          fontFamily: {
            display: ["'Playfair Display'", "Georgia", "serif"],
            body: ["'DM Sans'", "sans-serif"],
          },
        }
      }
    }
  </script>

  <!-- Google Fonts (Playfair Display + DM Sans) -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link
    href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap"
    rel="stylesheet"
  />

  <style>
    /* ── Global Base ── */
    *, *::before, *::after { box-sizing: border-box; }
    body { font-family: 'DM Sans', sans-serif; }
    h1, h2, h3, h4 { font-family: 'Playfair Display', Georgia, serif; }
    a { text-decoration: none; color: inherit; }

    /* ── Scrollbar ── */
    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: #FAF7F2; }
    ::-webkit-scrollbar-thumb { background: #D4C5B0; border-radius: 3px; }

    /* ── Custom Classes ── */
    .btn-primary {
      display: inline-flex; align-items: center; gap: 0.5rem;
      background: #C4623A; color: white; font-weight: 500;
      padding: 0.75rem 2rem; border-radius: 9999px;
      text-transform: uppercase; letter-spacing: 0.05em; font-size: 0.875rem;
      border: none; cursor: pointer; transition: background 0.3s, transform 0.15s;
    }
    .btn-primary:hover { background: #E8835F; }
    .btn-primary:active { transform: scale(0.97); }

    .btn-outline {
      display: inline-flex; align-items: center; justify-content: center;
      border: 2px solid #C4623A; color: #C4623A; font-weight: 500;
      padding: 0.625rem 1.5rem; border-radius: 9999px;
      text-transform: uppercase; letter-spacing: 0.05em; font-size: 0.875rem;
      background: transparent; cursor: pointer; transition: all 0.3s;
    }
    .btn-outline:hover { background: #C4623A; color: white; }

    .section-title { font-family: 'Playfair Display', Georgia, serif; font-size: 1.5rem; color: #1C1A17; }
    .divider { border-top: 1px solid #E5DDD4; margin: 1.5rem 0; }
    .badge {
      display: inline-block; background: #F5DDD4; color: #C4623A;
      font-size: 0.75rem; font-weight: 500; padding: 0.25rem 0.75rem; border-radius: 9999px;
    }
    .line-clamp-2 {
      display: -webkit-box; -webkit-line-clamp: 2;
      -webkit-box-orient: vertical; overflow: hidden;
    }

    /* ── Animasi ── */
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(16px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    .animate-in { animation: fadeInUp 0.5s ease both; }
    .animate-in-delay-1 { animation-delay: 0.1s; }
    .animate-in-delay-2 { animation-delay: 0.2s; }
    .animate-in-delay-3 { animation-delay: 0.3s; }
  </style>
</head>

<body class="min-h-screen bg-cream">

  <!-- ═══════════════════════════════════════════════════════════
       HEADER
       Sumber: components/header.html
       ═══════════════════════════════════════════════════════════ -->
  ${header}

  <!-- ═══════════════════════════════════════════════════════════
       MAIN CONTENT AREA
       Layout: Content Product (kiri, 3/4) + Sidebar (kanan, 1/4)
       ═══════════════════════════════════════════════════════════ -->
  <main class="max-w-7xl mx-auto px-6 py-8">
    <div class="flex gap-8">

      <!-- Kolom Utama (Content + Related Products) -->
      <div class="flex-1 min-w-0 space-y-12 animate-in">

        <!-- ─────────────────────────────────────────────────────
             CONTENT PRODUCT
             Sumber: components/content.html
             ───────────────────────────────────────────────────── -->
        ${content}

        <!-- Divider antara Content dan Related Products -->
        <hr class="border-border-warm" />

        <!-- ─────────────────────────────────────────────────────
             RELATED PRODUCT
             Sumber: components/related-product.html
             ───────────────────────────────────────────────────── -->
        ${relatedProduct}

      </div>

      <!-- ─────────────────────────────────────────────────────
           SIDEBAR
           Sumber: components/sidebar.html
           Lebar tetap 280px, posisi sticky
           ───────────────────────────────────────────────────── -->
      <aside class="w-72 shrink-0 animate-in animate-in-delay-1">
        <div class="sticky top-28 space-y-0">
          ${sidebar}
        </div>
      </aside>

    </div>
  </main>

  <!-- ═══════════════════════════════════════════════════════════
       FOOTER
       Sumber: components/footer.html
       ═══════════════════════════════════════════════════════════ -->
  ${footer}

</body>
</html>`;

  // Pastikan folder public ada
  const publicDir = path.join(__dirname, "public");
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  fs.writeFileSync(OUTPUT_FILE, html, "utf-8");
  console.log(`✅  HTML berhasil dibuild → ${OUTPUT_FILE}`);
}

// Jalankan build
buildPage();
