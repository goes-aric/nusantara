/**
 * server.js — Server Express untuk menyajikan website statis
 *
 * Fitur:
 *  - Menyajikan file dari folder /public
 *  - Auto-rebuild HTML saat file komponen berubah (mode dev)
 *  - Route fallback ke index.html
 *
 * Jalankan: node server.js
 * Dev mode: npm run dev
 */

const express = require("express");
const path    = require("path");
const fs      = require("fs");

const { execSync } = require("child_process");

const app  = express();
const PORT = process.env.PORT || 3000;

// ── Sajikan folder public sebagai static files ──────────────────
app.use(express.static(path.join(__dirname, "public")));

// ── Middleware: auto-rebuild jika index.html tidak ada ──────────
app.use((req, res, next) => {
  const indexPath = path.join(__dirname, "public", "index.html");
  if (!fs.existsSync(indexPath)) {
    console.log("⚙️  index.html belum ada, menjalankan build...");
    try {
      execSync("node build.js", { cwd: __dirname, stdio: "inherit" });
    } catch (err) {
      console.error("❌  Build gagal:", err.message);
    }
  }
  next();
});

// ── Route utama ─────────────────────────────────────────────────
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// ── API: rebuild on-demand (berguna untuk development) ──────────
app.post("/api/rebuild", (req, res) => {
  try {
    execSync("node build.js", { cwd: __dirname, stdio: "inherit" });
    res.json({ success: true, message: "Build berhasil!" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ── Fallback ─────────────────────────────────────────────────────
app.get("*", (req, res) => {
  const indexPath = path.join(__dirname, "public", "index.html");
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).send("Halaman tidak ditemukan. Jalankan <code>npm run build</code> terlebih dahulu.");
  }
});

// ── Jalankan server ───────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🚀  Server berjalan di → http://localhost:${PORT}`);
  console.log(`📁  Menyajikan file dari: ${path.join(__dirname, "public")}`);
  console.log(`\n💡  Tip: Gunakan 'npm run dev' untuk mode development dengan live CSS watch.\n`);
});
