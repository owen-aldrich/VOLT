"use strict";
(() => {
  const render = () => {
    const items = VOLT.cart.items();
    const count = VOLT.cart.count();
    document.getElementById("cart-status").textContent = `${count} barang siap dicheckout`;
    document.getElementById("selected-count").textContent = `${count} Produk Terpilih`;
    document.getElementById("cart-content").hidden = !items.length;
    document.getElementById("empty-cart").hidden = !!items.length;
    document.getElementById("cart-items").innerHTML = items
      .map(
        ({ product: p, qty }) => /* HTML */ `
          <article class="cart-item">
            <a
              class="cart-item-image"
              href="katalog.html?product=${p.id}"
              aria-label="Lihat ${p.nama}"
            >
              <img src="${p.gambar}" alt="${p.nama}" width="112" height="112" />
            </a>
            <div class="cart-item-info">
              <div class="cart-item-title">
                <h2>${p.nama}</h2>
                <strong>${VOLT.rupiah(p.harga * qty)}</strong>
              </div>
              <p>${p.warna} • ${p.ram_rom}</p>
              <span class="cart-guarantee">✓ ${p.garansi}</span>
              <div class="quantity-row">
                <div class="stepper" role="group" aria-label="Jumlah ${p.nama}">
                  <button
                    type="button"
                    data-quantity="${p.id}"
                    data-change="-1"
                    aria-label="Kurangi ${p.nama}"
                    ${qty === 1 ? "disabled" : ""}
                  >
                    −
                  </button>
                  <output aria-label="Kuantitas ${p.nama}">${qty}</output>
                  <button
                    type="button"
                    data-quantity="${p.id}"
                    data-change="1"
                    aria-label="Tambah ${p.nama}"
                    ${qty === 99 ? "disabled" : ""}
                  >
                    +
                  </button>
                </div>
                <button
                  class="remove-button"
                  type="button"
                  data-remove="${p.id}"
                  aria-label="Hapus ${p.nama}"
                >
                  ♲ Hapus
                </button>
              </div>
            </div>
          </article>
        `,
      )
      .join("");
    document.getElementById("summary-label").textContent = `Total Harga Produk (${count} Barang)`;
    document
      .querySelectorAll("[data-cart-total]")
      .forEach((el) => (el.textContent = VOLT.rupiah(VOLT.cart.total())));
  };
  render();
  window.addEventListener("volt:cart", render);
  document.getElementById("cart-items").addEventListener("click", (event) => {
    const remove = event.target.closest("[data-remove]");
    if (remove) {
      const index = VOLT.cart.items().findIndex((item) => item.id === remove.dataset.remove);
      VOLT.cart.remove(remove.dataset.remove);
      const next =
        document.querySelectorAll("[data-remove]")[Math.min(index, VOLT.cart.items().length - 1)];
      (next || document.querySelector("#empty-cart a")).focus();
      return;
    }
    const quantity = event.target.closest("[data-quantity]");
    if (quantity && !quantity.disabled) {
      const id = quantity.dataset.quantity;
      const change = Number(quantity.dataset.change);
      const item = VOLT.cart.items().find((item) => item.id === id);
      VOLT.cart.set(id, item.qty + change);
      document.querySelector(`[data-quantity="${id}"][data-change="${change}"]`)?.focus();
    }
  });
})();
