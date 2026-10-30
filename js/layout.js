"use strict";
(() => {
  const current = location.pathname.split("/").pop() || "index.html";
  const icon = (name, alt = "") => /* HTML */ `
    <img
      class="icon icon-${name}"
      src="assets/figma/${{ cart: "cart-add", eye: "eye", search: "search", bag: "bag" }[name]}.svg"
      alt="${alt}"
      aria-hidden="true"
    />
  `;
  VOLT.icon = icon;
  const link = (href, label, extra = "") => /* HTML */ `
    <a href="${href}" ${current === href ? 'aria-current="page"' : ""} ${extra}>${label}</a>
  `;
  document.getElementById("site-header").innerHTML = /* HTML */ `
    <div class="container header-inner">
      <a class="logo" href="index.html" aria-label="VOLT — Beranda">VOLT</a>
      <nav class="main-nav" id="main-nav" aria-label="Navigasi utama">
        ${link("index.html", "Beranda")}${link("katalog.html", "Produk")}${link(
          "garansi.html",
          "Garansi &amp; Servis",
        )}${link("tentang.html", "Tentang Kami")}${link(
          "masuk.html",
          "Masuk",
          'class="nav-account"',
        )}${link("daftar.html", "Daftar", 'class="nav-account"')}
      </nav>
      <div class="header-actions">
        <button class="icon-button" type="button" data-search aria-label="Cari produk">
          ${icon("search")}
        </button>
        <a class="icon-button cart-link" href="keranjang.html" aria-label="Keranjang belanja">
          ${icon("bag")}
          <span class="cart-count" data-cart-count>0</span>
        </a>
        <span class="header-divider" aria-hidden="true"></span>
        <a class="account-link" href="masuk.html" data-account-link>Masuk</a>
        <a class="button compact account-link" href="daftar.html">Daftar</a>
        <span class="profile-ring" aria-hidden="true"></span>
      </div>
      <button
        class="icon-button menu-toggle"
        type="button"
        aria-label="Buka menu"
        aria-controls="main-nav"
        aria-expanded="false"
      >
        ☰
      </button>
    </div>
  `;
  document.getElementById("site-footer").innerHTML = /* HTML */ `
    <div class="container footer-inner">
      <div class="footer-grid">
        <div>
          <a class="logo" href="index.html">VOLT</a>
          <p>Smartphone resmi, harga jelas, garansi terjamin.</p>
          <p>JL.Napoleon 18-20 Jakarta Indonesia</p>
        </div>
        <div>
          <h2>Jelajahi</h2>
          <a href="index.html">Beranda</a>
          <a href="katalog.html">Produk</a>
        </div>
        <div>
          <h2>Layanan</h2>
          <a href="garansi.html#layanan">Service Center Resmi</a>
          <a href="garansi.html">Garansi</a>
          <a href="garansi.html#cek-garansi">Lacak Perbaikan</a>
          <a href="garansi.html#panduan">Panduan Pengguna</a>
        </div>
        <div>
          <h2>Hubungi kami</h2>
          <a href="tel:+628127138956">08127138956</a>
          <a href="mailto:VOLT@gmail.com">VOLT@gmail.com</a>
          <a href="https://www.instagram.com/volt.id/" target="_blank" rel="noopener noreferrer">
            Instagram @volt.id
          </a>
          <p>Senin–Sabtu, 09.00–18.00</p>
        </div>
      </div>
      <p class="copyright">© 2026 VOLT. Hak cipta dilindungi.</p>
    </div>
  `;
  document.body.insertAdjacentHTML(
    "beforeend",
    /* HTML */ `
      <dialog id="product-dialog" aria-labelledby="product-dialog-title">
        <button class="icon-button dialog-close" data-close-dialog aria-label="Tutup detail">
          ×
        </button>
        <div id="product-dialog-content"></div>
      </dialog>
      <dialog id="info-dialog" aria-labelledby="info-dialog-title">
        <button class="icon-button dialog-close" data-close-dialog aria-label="Tutup dialog">
          ×
        </button>
        <h2 id="info-dialog-title"></h2>
        <div id="info-dialog-content"></div>
      </dialog>
      <dialog id="search-dialog" aria-labelledby="search-title">
        <button class="icon-button dialog-close" data-close-dialog aria-label="Tutup pencarian">
          ×
        </button>
        <h2 id="search-title">Temukan VOLT Anda.</h2>
        <form action="katalog.html">
          <label for="global-search">Nama produk atau seri</label>
          <input
            class="input"
            id="global-search"
            name="q"
            type="search"
            placeholder="Coba VOLT Apex atau Nova"
            required
          />
          <button class="button full" type="submit">Cari Produk →</button>
        </form>
      </dialog>
      <div class="toast" role="status" hidden></div>
    `,
  );
  let toastTimer;
  VOLT.toast = (message) => {
    const element = document.querySelector(".toast");
    element.textContent = message;
    element.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => (element.hidden = true), 4000);
  };
  VOLT.info = (title, content) => {
    document.getElementById("info-dialog-title").textContent = title;
    document.getElementById("info-dialog-content").innerHTML = content;
    document.getElementById("info-dialog").showModal();
  };
  VOLT.productCard = (product, { catalog = false } = {}) => /* HTML */ `
    <article class="product-card" data-product="${product.id}">
      ${catalog
        ? /* HTML */ `
            <span class="catalog-memory">${product.ram_rom}</span>
          `
        : ""}
      <a
        class="product-image"
        href="katalog.html?product=${product.id}"
        data-detail="${product.id}"
        aria-label="Lihat ${product.nama}"
      >
        <img
          src="${product.gambar}"
          alt="${product.nama} warna ${product.warna}"
          loading="lazy"
          width="192"
          height="160"
        />
      </a>
      <div class="product-meta">
        ${catalog
          ? ""
          : /* HTML */ `
              <span class="memory-badge">${product.ram_rom}</span>
            `}
        <span>
          ${product.warna}${catalog ? " — " + VOLT.escape(product.spesifikasi.split(" · ")[0]) : ""}
        </span>
      </div>
      <h3>${product.nama}</h3>
      <div class="product-bottom">
        <div class="price-row">
          <span class="price-label">${catalog ? "Garansi resmi" : "Harga resmi"}</span>
          ${catalog
            ? /* HTML */ `
                <s>${VOLT.rupiah(product.hargaLama)}</s>
              `
            : ""}
        </div>
        <p class="product-price">${VOLT.rupiah(product.harga)}</p>
        <button class="button secondary" data-detail="${product.id}" type="button">
          ${icon("eye")} Lihat Detail
        </button>
        <button class="button" data-add="${product.id}" type="button">
          ${icon("cart")} Tambah ke Keranjang
        </button>
      </div>
    </article>
  `;
  VOLT.detail = (id) => {
    const product = VOLT.product(id);
    if (!product) return;
    document.getElementById("product-dialog-content").innerHTML = /* HTML */ `
      <div class="product-image dialog-product">
        <img src="${product.gambar}" alt="${product.nama}" width="192" height="160" />
      </div>
      <h2 id="product-dialog-title">${product.nama}</h2>
      <p>
        ${product.ram_rom} · ${product.warna}
        <br />
        ${VOLT.escape(product.spesifikasi)}
        <br />
        ${product.garansi}
      </p>
      <p class="product-price">${VOLT.rupiah(product.harga)}</p>
      <button class="button full" data-add="${id}" type="button">
        ${icon("cart")} Tambah ke Keranjang
      </button>
      <a class="button secondary full" href="checkout.html?product=${id}">Beli Sekarang</a>
    `;
    document.getElementById("product-dialog").showModal();
  };
  const updateBadge = () => {
    document
      .querySelectorAll("[data-cart-count]")
      .forEach((el) => (el.textContent = VOLT.cart.count()));
    document
      .querySelector(".cart-link")
      .setAttribute("aria-label", `Keranjang belanja, ${VOLT.cart.count()} barang`);
  };
  updateBadge();
  window.addEventListener("volt:cart", updateBadge);
  const session =
    VOLT.storage.get("volt_session", null, true) || VOLT.storage.get("volt_session", null);
  if (session) {
    const account = document.querySelector("[data-account-link]");
    account.textContent = "Akun";
    account.href = "index.html";
    account.addEventListener("click", (event) => {
      event.preventDefault();
      VOLT.info(
        "Akun VOLT",
        /* HTML */ `
          <p>Anda masuk dalam sesi demo. Tidak ada autentikasi atau pembayaran sungguhan.</p>
          <button class="button full" id="logout" type="button">Keluar</button>
        `,
      );
      document.getElementById("logout").onclick = () => {
        VOLT.storage.set("volt_session", null);
        VOLT.storage.set("volt_session", null, true);
        location.href = "index.html";
      };
    });
  }
  document.querySelector(".menu-toggle").addEventListener("click", (event) => {
    const button = event.currentTarget;
    const open = button.getAttribute("aria-expanded") !== "true";
    button.setAttribute("aria-expanded", open);
    button.setAttribute("aria-label", open ? "Tutup menu" : "Buka menu");
    document.getElementById("main-nav").classList.toggle("is-open", open);
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      document.getElementById("main-nav").classList.remove("is-open");
      document.querySelector(".menu-toggle").setAttribute("aria-expanded", "false");
    }
  });
  document.addEventListener("click", (event) => {
    const add = event.target.closest("[data-add]");
    if (add) {
      VOLT.cart.add(add.dataset.add);
      location.href = "keranjang.html";
      return;
    }
    const detail = event.target.closest("[data-detail]");
    if (detail) {
      event.preventDefault();
      VOLT.detail(detail.dataset.detail);
    }
    if (event.target.closest("[data-search]")) document.getElementById("search-dialog").showModal();
    const close = event.target.closest("[data-close-dialog]");
    if (close) close.closest("dialog").close();
    if (event.target.matches("dialog")) {
      const rect = event.target.getBoundingClientRect();
      if (
        event.clientX < rect.left ||
        event.clientX > rect.right ||
        event.clientY < rect.top ||
        event.clientY > rect.bottom
      )
        event.target.close();
    }
  });
})();
