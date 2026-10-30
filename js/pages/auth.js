"use strict";
(() => {
  const form = document.getElementById("auth-form");
  const isSignup = form.dataset.mode === "signup";
  const login = (provider = "email") => {
    const session = { loggedIn: true, provider, demo: true };
    const remember = isSignup || form.elements.remember?.checked;
    if (!VOLT.storage.set("volt_session", session, !remember)) {
      VOLT.toast("Penyimpanan browser tidak tersedia. Aktifkan penyimpanan untuk sesi demo.");
      return;
    }
    VOLT.storage.set("volt_session", null, !!remember);
    location.href = "index.html";
  };
  if (isSignup) {
    VOLT.form(
      form,
      {
        fullName: VOLT.validators.name,
        email: VOLT.validators.email,
        phone: VOLT.validators.phone,
        password: VOLT.validators.password,
        confirm: (value, form) =>
          value === form.elements.password.value && value
            ? ""
            : "Konfirmasi kata sandi harus sama.",
        terms: (_value, form) =>
          form.elements.terms.checked
            ? ""
            : "Setujui Syarat & Ketentuan dan Kebijakan Privasi untuk melanjutkan.",
      },
      () => login(),
    );
  } else {
    VOLT.form(
      form,
      {
        identity: (value) =>
          !VOLT.validators.email(value) || !VOLT.validators.phone(value)
            ? ""
            : "Masukkan email atau nomor ponsel yang valid.",
        password: VOLT.validators.password,
      },
      () => {
        login();
      },
    );
  }
  document.querySelectorAll("[data-social]").forEach((button) =>
    button.addEventListener("click", () => {
      const provider = button.dataset.social;
      VOLT.info(
        `Masuk dengan ${provider}`,
        /* HTML */ `
          <p>
            Login ${provider} belum terhubung pada website demo ini. Anda dapat mencoba alur akun
            tanpa membagikan data akun ${provider}.
          </p>
          <button class="button full" type="button" id="demo-social">Lanjutkan mode demo</button>
        `,
      );
      document.getElementById("demo-social").onclick = () => login(provider);
    }),
  );
  document.querySelectorAll("[data-policy]").forEach((link) =>
    link.addEventListener("click", (event) => {
      event.preventDefault();
      if (link.dataset.policy === "privacy")
        VOLT.info(
          "Kebijakan Privasi",
          /* HTML */ `
            <p>
              Website VOLT ini merupakan demo frontend. Keranjang dan status sesi demo disimpan di
              browser Anda. Kata sandi dan alamat pengiriman tidak disimpan atau dikirim ke server.
            </p>
            <p>Hapus data situs pada pengaturan browser untuk membersihkan data lokal.</p>
          `,
        );
      else
        VOLT.info(
          "Syarat & Ketentuan",
          /* HTML */ `
            <p>
              Produk, harga, garansi, dan pesanan pada website ini merupakan data demonstrasi. Tidak
              ada transaksi, pengiriman, atau akun sungguhan yang dibuat.
            </p>
            <p>Nama seri VOLT memakai foto ponsel Samsung dan Apple sebagai ilustrasi desain.</p>
          `,
        );
    }),
  );
  document.querySelector("[data-forgot]")?.addEventListener("click", () => {
    VOLT.info(
      "Lupa kata sandi?",
      /* HTML */ `
        <p>Masukkan email untuk mencoba alur pemulihan akun demo.</p>
        <form id="recovery-form">
          <div class="field">
            <label for="recovery-email">Alamat email</label>
            <input
              id="recovery-email"
              name="email"
              type="email"
              autocomplete="email"
              placeholder="nama@email.com"
              required
            />
          </div>
          <button class="button full" type="submit">Kirim tautan pemulihan</button>
        </form>
      `,
    );
    document.getElementById("recovery-form").addEventListener("submit", (event) => {
      event.preventDefault();
      document.getElementById("info-dialog").close();
      VOLT.toast("Simulasi pemulihan selesai. Tidak ada email yang dikirim.");
    });
  });
})();
