"use strict";
(() => {
  const params = new URLSearchParams(location.search);
  const fromCart = params.get("source") === "cart";
  const directId = params.get("product") || "apex-pro";
  let order = fromCart
    ? VOLT.cart.items()
    : VOLT.product(directId)
      ? [{ id: directId, qty: 1, product: VOLT.product(directId) }]
      : [];
  let complete = false;
  const root = document.getElementById("checkout-content");
  const empty = document.getElementById("checkout-empty");
  const render = () => {
    if (complete) return;
    if (fromCart) order = VOLT.cart.items();
    root.hidden = !order.length;
    empty.hidden = !!order.length;
    const total = order.reduce((sum, item) => sum + item.product.harga * item.qty, 0);
    document
      .querySelectorAll("[data-checkout-total]")
      .forEach((el) => (el.textContent = VOLT.rupiah(total)));
    document.getElementById("checkout-products").innerHTML = order
      .map(
        ({ product: p, qty }) => /* HTML */ `
          <article class="checkout-product-card">
            <div class="checkout-product-image">
              <img src="${p.gambar}" alt="${p.nama} warna ${p.warna}" width="400" height="460" />
            </div>
            <h3>${p.nama}${qty > 1 ? " × " + qty : ""}</h3>
            <p>${p.ram_rom}, ${p.warna} • ${p.garansi}</p>
            <p class="checkout-price">${VOLT.rupiah(p.harga * qty)}</p>
          </article>
        `,
      )
      .join("");
  };
  render();
  if (fromCart) window.addEventListener("volt:cart", render);
  VOLT.form(
    document.getElementById("shipping-form"),
    {
      address: (value) =>
        value.trim().length >= 10 ? "" : "Tuliskan alamat lengkap, minimal 10 karakter.",
      city: (value) => (value.trim().length >= 2 ? "" : "Masukkan kota tujuan."),
      country: (value) =>
        value.trim().toLowerCase() === "indonesia"
          ? ""
          : "Pengiriman saat ini tersedia untuk Indonesia.",
    },
    () => {
      if (!order.length) return;
      complete = true;
      if (fromCart) VOLT.cart.clear();
      root.hidden = true;
      empty.hidden = true;
      document.getElementById("order-complete").hidden = false;
      document.getElementById("order-complete").focus();
      VOLT.info(
        "Pesanan berhasil",
        /* HTML */ `
          <p>Pesanan demo Anda berhasil dibuat. Tidak ada tagihan atau pembayaran sungguhan.</p>
          <a class="button full" href="index.html">Kembali ke Beranda</a>
        `,
      );
    },
  );
})();
