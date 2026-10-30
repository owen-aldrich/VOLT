"use strict";
window.VOLT = window.VOLT || {};
VOLT.products = [
  {
    id: "apex-pro",
    nama: "VOLT Apex Pro 5G",
    merek: "VOLT",
    seri: "Apex",
    harga: 12499000,
    hargaLama: 13999000,
    ram_rom: "12/512 GB",
    warna: "Oranye kosmik",
    spesifikasi: "5G · Kamera Pro · OLED 120 Hz",
    gambar: "assets/products/apex-pro-iphone17.png",
    kategori: "Smartphone",
    terlaris: 98,
  },
  {
    id: "ultra",
    nama: "VOLT Ultra",
    merek: "VOLT",
    seri: "Ultra",
    harga: 16999000,
    hargaLama: 17499000,
    ram_rom: "16/512 GB",
    warna: "Titanium putih",
    spesifikasi: "Kamera Pro 48 MP · OLED 120 Hz",
    gambar: "assets/products/ultra-iphone16-white.png",
    kategori: "Smartphone",
    terlaris: 94,
  },
  {
    id: "nova-pro",
    nama: "VOLT Nova Pro",
    merek: "VOLT",
    seri: "Nova",
    harga: 5899000,
    hargaLama: 6499000,
    ram_rom: "12/256 GB",
    warna: "Titanium abu",
    spesifikasi: "Performa cepat · Layar AMOLED",
    gambar: "assets/products/nova.png",
    kategori: "Smartphone",
    terlaris: 99,
  },
  {
    id: "air",
    nama: "VOLT Air",
    merek: "VOLT",
    seri: "Air",
    harga: 4299000,
    hargaLama: 4699000,
    ram_rom: "8/256 GB",
    warna: "Titanium pasir",
    spesifikasi: "Ringan dan nyaman · Kamera OIS",
    gambar: "assets/products/air.png",
    kategori: "Smartphone",
    terlaris: 91,
  },
  {
    id: "apex",
    nama: "VOLT Apex",
    merek: "VOLT",
    seri: "Apex",
    harga: 11999000,
    hargaLama: 12499000,
    ram_rom: "12/256 GB",
    warna: "Hijau giok",
    spesifikasi: "Layar 120 Hz · Kamera 50 MP",
    gambar: "assets/products/apex-green.png",
    kategori: "Smartphone",
    terlaris: 90,
  },
  {
    id: "nova",
    nama: "VOLT Nova",
    merek: "VOLT",
    seri: "Nova",
    harga: 3999000,
    hargaLama: 4499000,
    ram_rom: "8/256 GB",
    warna: "Hijau zaitun",
    spesifikasi: "Baterai tahan lama · Performa efisien",
    gambar: "assets/products/nova-galaxy-a56.jpg",
    kategori: "Smartphone",
    terlaris: 89,
  },
  {
    id: "air-plus",
    nama: "VOLT Air Plus",
    merek: "VOLT",
    seri: "Air",
    harga: 4799000,
    hargaLama: 5299000,
    ram_rom: "8/256 GB",
    warna: "Biru kehijauan",
    spesifikasi: "Layar lebih lega · Ringan sepanjang hari",
    gambar: "assets/products/air-plus-iphone16-teal.png",
    kategori: "Smartphone",
    terlaris: 86,
  },
  {
    id: "nova-lite",
    nama: "VOLT Nova Lite",
    merek: "VOLT",
    seri: "Nova",
    harga: 2999000,
    hargaLama: 3499000,
    ram_rom: "8/128 GB",
    warna: "Ungu lilac",
    spesifikasi: "Pilihan harian · Baterai 5.000 mAh",
    gambar: "assets/products/nova-lite-galaxy-a55.png",
    kategori: "Smartphone",
    terlaris: 88,
  },
  {
    id: "apex-plus",
    nama: "VOLT Apex Plus",
    merek: "VOLT",
    seri: "Apex",
    harga: 13499000,
    hargaLama: 14499000,
    ram_rom: "12/512 GB",
    warna: "Titanium biru perak",
    spesifikasi: "Layar imersif · Kamera Pro",
    gambar: "assets/products/apex-plus-galaxy-s25.png",
    kategori: "Smartphone",
    terlaris: 84,
  },
  {
    id: "ultra-max",
    nama: "VOLT Ultra Max",
    merek: "VOLT",
    seri: "Ultra",
    harga: 17999000,
    hargaLama: 18999000,
    ram_rom: "16/512 GB",
    warna: "Biru gelap",
    spesifikasi: "Kamera Pro · Kapasitas maksimal",
    gambar: "assets/products/ultra-max-iphone17-blue.png",
    kategori: "Smartphone",
    terlaris: 82,
  },
  {
    id: "air-mini",
    nama: "VOLT Air Mini",
    merek: "VOLT",
    seri: "Air",
    harga: 3499000,
    hargaLama: 3999000,
    ram_rom: "8/128 GB",
    warna: "Merah muda",
    spesifikasi: "Desain ringkas · Nyaman satu tangan",
    gambar: "assets/products/air-mini-iphone13-pink.png",
    kategori: "Smartphone",
    terlaris: 80,
  },
  {
    id: "nova-max",
    nama: "VOLT Nova Max",
    merek: "VOLT",
    seri: "Nova",
    harga: 6499000,
    hargaLama: 6999000,
    ram_rom: "12/256 GB",
    warna: "Biru muda",
    spesifikasi: "Performa bertenaga · Multitasking lancar",
    gambar: "assets/products/nova-max-galaxy-flip6.png",
    kategori: "Smartphone",
    terlaris: 83,
  },
].map((product) => ({ ...product, garansi: "Garansi resmi 15 bulan" }));
VOLT.product = (id) => VOLT.products.find((product) => product.id === id);
VOLT.rupiah = (value) =>
  "Rp" + new Intl.NumberFormat("id-ID", { maximumFractionDigits: 0 }).format(value);
VOLT.escape = (value) =>
  String(value).replace(
    /[&<>"']/g,
    (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char],
  );
VOLT.storage = {
  get(key, fallback, temporary = false) {
    try {
      const storage = temporary ? sessionStorage : localStorage;
      const value = storage.getItem(key);
      return value === null ? fallback : JSON.parse(value);
    } catch {
      return fallback;
    }
  },
  set(key, value, temporary = false) {
    try {
      const storage = temporary ? sessionStorage : localStorage;
      storage.setItem(key, JSON.stringify(value));
      return true;
    } catch {
      return false;
    }
  },
};
