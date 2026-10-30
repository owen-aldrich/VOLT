"use strict";

(() => {
  const form = document.getElementById("warranty-form");
  const result = document.getElementById("warranty-result");
  const sampleImei = "358291048291024";

  VOLT.form(
    form,
    {
      imei: (value) =>
        /^\d{15}$/.test(value.trim()) ? "" : "Nomor IMEI harus terdiri dari tepat 15 digit angka.",
    },
    (data) => {
      const active = data.get("imei").trim() === sampleImei;
      result.className = `notice warranty-result ${active ? "success" : "error"}`;
      result.innerHTML = active
        ? /* HTML */ `
            <h3>Garansi aktif</h3>
            <p>
              <strong>VOLT Apex Pro 5G</strong>
              · Garansi resmi 15 bulan.
            </p>
            <p>Riwayat servis: belum ada pengajuan perbaikan.</p>
            <p class="small">
              Hasil simulasi untuk IMEI contoh, bukan pengecekan perangkat sungguhan.
            </p>
          `
        : /* HTML */ `
            <h3>Perangkat tidak ditemukan</h3>
            <p>Periksa kembali nomor IMEI Anda atau hubungi tim layanan VOLT.</p>
            <p class="small">Demo ini hanya mengenali IMEI contoh: ${sampleImei}.</p>
          `;
      result.hidden = false;
    },
  );

  form.elements.imei.addEventListener("input", () => {
    result.hidden = true;
  });

  const services = {
    battery: {
      title: "Layanan Baterai VOLT",
      content: /* HTML */ `
        <p>
          Klaim garansi baterai mencakup cacat produksi setelah pemeriksaan teknisi. Siapkan bukti
          pembelian dan nomor IMEI sebelum berkonsultasi.
        </p>
        <a
          class="button full"
          href="https://wa.me/6281288990011"
          target="_blank"
          rel="noopener noreferrer"
        >
          Konsultasi Layanan
        </a>
      `,
    },
    locations: {
      title: "Jaringan Service Center",
      content: /* HTML */ `
        <p>Contoh cakupan kota pada website demo VOLT:</p>
        <ul class="service-city-list">
          <li>Jakarta</li>
          <li>Bogor</li>
          <li>Depok</li>
          <li>Tangerang</li>
          <li>Bekasi</li>
          <li>Bandung</li>
          <li>Semarang</li>
          <li>Yogyakarta</li>
          <li>Surabaya</li>
          <li>Malang</li>
          <li>Denpasar</li>
          <li>Medan</li>
          <li>Palembang</li>
          <li>Pekanbaru</li>
          <li>Batam</li>
          <li>Balikpapan</li>
          <li>Makassar</li>
          <li>Manado</li>
        </ul>
        <p>Hubungi tim layanan untuk konfirmasi alamat dan jadwal sebelum berkunjung.</p>
      `,
    },
    pickup: {
      title: "Layanan Antar-Jemput",
      content: /* HTML */ `
        <p>
          Siapkan nomor IMEI, bukti pembelian, alamat penjemputan, serta keterangan kendala. Tim
          layanan membantu memeriksa cakupan dan jadwal penjemputan Anda.
        </p>
        <a
          class="button full"
          href="https://wa.me/6281288990011"
          target="_blank"
          rel="noopener noreferrer"
        >
          Hubungi Layanan WhatsApp
        </a>
      `,
    },
    guide: {
      title: "Panduan Pengguna VOLT",
      content: /* HTML */ `
        <p>
          Cadangkan data sebelum servis, lepaskan kartu SIM, dan catat IMEI perangkat. Gunakan
          adaptor yang sesuai serta hindari kelembapan dan suhu ekstrem.
        </p>
        <p>
          Untuk melihat status garansi demo, masukkan
          <strong>${sampleImei}</strong>
          pada form Cek Garansi.
        </p>
      `,
    },
  };

  document.querySelectorAll("[data-service]").forEach((button) => {
    button.addEventListener("click", () => {
      const service = services[button.dataset.service];
      if (service) VOLT.info(service.title, service.content);
    });
  });
})();
