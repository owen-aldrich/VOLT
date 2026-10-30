# VOLT — Website Toko Smartphone

Frontend statis berbahasa Indonesia dengan HTML, CSS, dan JavaScript murni. Tidak ada framework, build tool, backend, `node_modules`, atau instalasi paket untuk menjalankannya.

## Cara membuka

1. Buka folder `D:\VOLT` di VS Code.
2. Klik kanan `index.html`, lalu pilih **Open with Live Server**.
3. Gunakan alamat yang ditampilkan Live Server dan buka halaman lain melalui navigasi website.

Anda juga dapat membuka `index.html` langsung di browser. Live Server disarankan agar penyimpanan keranjang dan sesi konsisten antarhalaman; perilaku `localStorage` pada alamat `file://` dapat berbeda antarbrowser.

Tidak perlu menjalankan `npm install`, `npm start`, atau perintah build.

## Halaman

| File | Isi |
| --- | --- |
| `index.html` | Beranda, hero, tab produk, dan fitur kamera/baterai/performa |
| `katalog.html` | 12 produk, filter seri/harga/kapasitas, urutan, grid/list, dan pagination |
| `keranjang.html` | Kuantitas, hapus barang, perhitungan total, dan kondisi kosong |
| `checkout.html` | Produk pilihan, validasi alamat, dan konfirmasi pesanan demo |
| `masuk.html` | Validasi login demo, tampilkan sandi, ingat sesi, dan pemulihan demo |
| `daftar.html` | Validasi nama, email, ponsel, sandi, konfirmasi, dan persetujuan |
| `garansi.html` | Cek IMEI demo, pilar layanan, lokasi contoh, panduan, dan kontak |
| `tentang.html` | Profil VOLT dan nilai perusahaan berdasarkan Figma |

## Bagian yang bisa diedit

- **Nama, harga, warna, kapasitas, dan foto produk:** `js/data.js`.
- **Warna, ukuran, radius, dan bayangan bersama:** `css/tokens.css`.
- **Header, footer, modal detail, dan navigasi bersama:** `js/layout.js`.
- **Tampilan komponen bersama:** `css/components.css`.
- **Isi halaman:** file HTML masing-masing.
- **Tampilan dan interaksi halaman:** file terkait di `css/pages/` dan `js/pages/`.
- **Foto produk:** `assets/products/`. Daftar sumber ada di `assets/products/SOURCES.md`.

Contoh mengganti foto: simpan gambar di `assets/products/`, lalu ubah nilai `gambar` pada produk terkait di `js/data.js`. Perubahannya berlaku di Beranda, Katalog, detail, Keranjang, dan Checkout.

Header dan footer sengaja ditulis sekali di `js/layout.js`, lalu ditampilkan pada semua halaman. Aktifkan JavaScript di browser.

## Mencoba interaksi

1. Tambahkan produk dari Beranda atau Katalog.
2. Di Keranjang, ubah jumlah dan refresh halaman untuk melihat penyimpanannya.
3. Lanjutkan ke Checkout. Tombol bayar aktif setelah alamat dan kota valid.
4. Kirim pesanan untuk menampilkan konfirmasi simulasi. Checkout keranjang mengosongkan barang yang dibayar; beli langsung tidak menghapus keranjang lain.
5. Coba Daftar dengan data contoh dan sandi minimal delapan karakter. Data akun asli tidak diperlukan.
6. Di Garansi, masukkan IMEI contoh **358291048291024** untuk hasil aktif. IMEI 15 digit lain menampilkan hasil tidak ditemukan; input yang tidak valid menampilkan pesan kesalahan.

## Penyimpanan browser

- `volt_cart`: ID produk dan jumlah barang di `localStorage`.
- `volt_session`: flag sesi demo. Opsi **Ingat saya** memakai `localStorage`; login biasa memakai `sessionStorage`.
- Kata sandi dan alamat pengiriman tidak disimpan atau dikirim ke server.

Keranjang baru dimulai kosong. Anda dapat menghapus barang melalui halaman Keranjang atau membersihkan data situs melalui pengaturan browser.

## Batas demo

Pembayaran, autentikasi Google/Apple, pengecekan garansi, dan pemulihan sandi adalah simulasi frontend. Nama VOLT adalah nama seri demo, sementara foto menampilkan perangkat Apple/Samsung. Data produk bukan penawaran perangkat asli pada foto.

Penyesuaian terhadap desain Figma dan hasil verifikasi dicatat di `NOTES.md`.
