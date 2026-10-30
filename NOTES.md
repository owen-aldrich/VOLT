# Catatan implementasi VOLT

## Acuan dan ruang lingkup

- Acuan: PRD Frontend VOLT versi 1.0 dan [file Figma VOLT](https://www.figma.com/design/17RN3mnNUdMbQ2tcA9L7k9/Untitled).
- Implementasi hanya HTML, CSS, dan JavaScript browser. Tidak ada backend, framework, build, paket npm, atau dependensi runtime.
- Kode ditulis dengan baris baru dan indentasi dua spasi agar dapat diedit langsung.
- Pemeriksaan browser memakai alat sementara di luar folder proyek; alat tersebut tidak dibutuhkan untuk membuka website.

## Penyesuaian desain dan konten

1. **Nama dan foto produk.** Atas permintaan pengguna, seluruh produk memakai seri VOLT. Foto diganti dengan perangkat Apple/Samsung dari internet. VOLT Apex Pro 5G memakai iPhone 17 Pro Max Cosmic Orange. Dua belas produk memakai dua belas foto berbeda; label warna disesuaikan. Sumber tercatat di `assets/products/SOURCES.md`.
2. **Aset Figma.** Foto hero, gambar kamera/baterai/performa, foto studio Tentang Kami, serta ikon terkait diunduh sebagai aset lokal. Screenshot halaman hanya dipakai sebagai referensi dan bukti pemeriksaan, bukan latar halaman.
3. **Header dan footer.** Tinggi dan susunan pada frame Figma tidak seragam. Semua halaman memakai satu header sticky setinggi 65 px dan satu footer bersama, sesuai normalisasi yang diizinkan PRD. Profil lingkaran pada header desktop dipertahankan sebagai dekorasi.
4. **Lebar konten.** Halaman utama memakai maksimum 1200 px. Checkout, Garansi, dan Tentang Kami memakai layout sempit maksimum 1000 px dengan padding dalam 24 px mengikuti susunan frame terkait. Frame Tentang Kami yang berukuran 1375 px tetap beradaptasi pada viewport 1280 px dan mobile.
5. **Font.** Inter disimpan lokal. Bagian Figma yang memakai Nimbus Sans dinormalisasi ke Inter sesuai PRD; pemenggalan baris dapat sedikit berbeda.
6. **Masa garansi.** Sebagian teks Figma menyebut 24 bulan, sedangkan kartu produk, Checkout, dan PRD memakai 15 bulan. Semua data produk dan halaman Garansi diseragamkan menjadi 15 bulan.
7. **Katalog.** Chip merek diubah menjadi seri VOLT Apex/Nova/Air/Ultra. Jumlah chip dihitung dari data. Katalog berisi 12 produk dan dua halaman nyata, masing-masing maksimal enam produk, sehingga tidak menampilkan tombol halaman kosong sampai angka 5 seperti contoh Figma.
8. **Urutan katalog.** Urutan awal mengikuti urutan enam kartu desain. Pengguna dapat memilih Terlaris, Harga Terendah, atau Harga Tertinggi. Tab Beranda bekerja pada empat produk unggulan.
9. **Keranjang.** Contoh dua barang di Figma tidak otomatis dimasukkan ke keranjang pengunjung. Keranjang dimulai kosong. Tidak ada diskon tersembunyi; total selalu sama dengan jumlah harga × kuantitas. Angka total Figma yang berbeda dari subtotal tidak disalin. Batas jumlah per produk adalah 99.
10. **Detail produk.** Karena tidak ada frame khusus, tombol Lihat Detail membuka modal berisi foto, varian, harga, tombol tambah keranjang, dan beli langsung.
11. **Checkout.** Alamat dan kota pada Figma menjadi placeholder, bukan data pengunjung yang terisi otomatis. Negara awal Indonesia. Validasi wajib mengaktifkan tombol bayar. Konfirmasi ditampilkan dalam modal dan kondisi sukses pada halaman yang sama. Checkout tanpa barang menampilkan kondisi kosong.
12. **Akun.** Login dan daftar adalah demo. Tombol Google/Apple memberi penjelasan lalu menawarkan sesi demo. Sandi tidak disimpan. Opsi Ingat saya membedakan penyimpanan sesi permanen dan sementara. Pemulihan sandi, Syarat & Ketentuan, dan Privasi memakai modal sederhana.
13. **Garansi dan layanan.** IMEI aktif hanya nomor contoh `358291048291024`. Hasil aktif/tidak ditemukan adalah data dummy yang ditandai sebagai simulasi. Panduan, layanan baterai, dan daftar 18 kota contoh memakai modal; pengantaran mengarah ke tautan WhatsApp yang dapat dipilih pengguna. Form tidak menghubungi sistem garansi sungguhan.
14. **Responsif dan aksesibilitas.** Adaptasi dibuat pada breakpoint 1024, 768, dan 480 px. Label tambahan, struktur heading berurutan, dialog keyboard, skip link, pesan validasi, teks alternatif, dan fokus terlihat ditambahkan. Nilai px breakpoint merupakan pengecualian teknis terhadap penggunaan token karena CSS custom properties tidak dapat digunakan langsung pada kondisi media query.
15. **Pengukuran visual.** Layout desktop dan mobile dibandingkan dengan screenshot acuan. Tidak dilakukan pengukuran selisih pixel otomatis; toleransi ±2 px tidak diklaim telah dibuktikan, terutama setelah normalisasi font, komponen bersama, serta penggantian foto.

## Verifikasi — 30 Oktober 2026

- Delapan halaman diperiksa di Chrome pada lebar 360, 480, 768, 1024, dan 1280 px.
- Semua halaman lolos pemeriksaan tanpa scroll horizontal, error JavaScript, gambar gagal dimuat, atau tautan navigasi internal yang hilang.
- 42 pemeriksaan interaksi lolos: urutan produk, pencarian, filter, rentang harga tidak valid, pagination, grid/list, modal detail, tambah/ubah/hapus keranjang, persistensi, total beberapa produk, Checkout dan konfirmasi, daftar/login/logout, penyimpanan sandi, cek IMEI, layanan, serta menu mobile.
- Audit axe-core untuk WCAG A/AA, WCAG 2.1 AA, dan praktik aksesibilitas dasar tidak menemukan pelanggaran pada keadaan awal delapan halaman setelah perbaikan struktur heading dan daftar kontak.
- Screenshot desktop/mobile dipakai selama pemeriksaan lokal dan tidak disertakan dalam repository production.
- Audit Lighthouse 12.8.2 pada server statis lokal menghasilkan skor berikut (skala 0–100):

| Halaman | Accessibility | Best Practices |
| --- | --- | --- |
| Beranda | 100 | 100 |
| Katalog | 100 | 100 |
| Keranjang | 100 | 100 |
| Checkout | 100 | 100 |
| Masuk | 100 | 100 |
| Daftar | 100 | 100 |
| Garansi & Servis | 100 | 100 |
| Tentang Kami | 100 | 100 |

Kategori Performance dan SEO tidak dimasukkan dalam audit ini. Hasil di lingkungan hosting atau browser lain dapat berbeda.

Audit otomatis tidak menggantikan pengujian pembaca layar dan tinjauan manual seluruh kemungkinan input.
