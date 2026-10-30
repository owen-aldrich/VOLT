"use strict";
(() => {
  const sanitize = (value) =>
    Array.isArray(value)
      ? value
          .filter(
            (item) => item && VOLT.product(item.id) && Number.isInteger(item.qty) && item.qty > 0,
          )
          .map((item) => ({ id: item.id, qty: Math.min(item.qty, 99) }))
      : [];
  let items = sanitize(VOLT.storage.get("volt_cart", []));
  const emit = () =>
    window.dispatchEvent(new CustomEvent("volt:cart", { detail: VOLT.cart.items() }));
  const save = () => {
    if (!VOLT.storage.set("volt_cart", items))
      VOLT.toast?.("Penyimpanan browser tidak tersedia. Keranjang berlaku selama sesi ini.");
    emit();
  };
  VOLT.cart = {
    items: () => items.map((item) => ({ ...item, product: VOLT.product(item.id) })),
    count: () => items.reduce((sum, item) => sum + item.qty, 0),
    total: () => items.reduce((sum, item) => sum + VOLT.product(item.id).harga * item.qty, 0),
    add(id, qty = 1) {
      if (!VOLT.product(id) || !Number.isInteger(qty) || qty < 1) return;
      const item = items.find((item) => item.id === id);
      if (item) item.qty = Math.min(99, item.qty + qty);
      else items.push({ id, qty: Math.min(99, qty) });
      save();
    },
    set(id, qty) {
      const item = items.find((item) => item.id === id);
      if (!item || !Number.isInteger(qty)) return;
      if (qty < 1) return this.remove(id);
      item.qty = Math.min(99, qty);
      save();
    },
    remove(id) {
      items = items.filter((item) => item.id !== id);
      save();
    },
    clear() {
      items = [];
      save();
    },
  };
  window.addEventListener("storage", (event) => {
    if (event.key === "volt_cart" || event.key === null) {
      items = sanitize(VOLT.storage.get("volt_cart", []));
      emit();
    }
  });
})();
