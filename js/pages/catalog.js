"use strict";
(() => {
  const params = new URLSearchParams(location.search);
  const form = document.getElementById("catalog-filters");
  const search = (params.get("q") || "").trim();
  let selected = ["Apex", "Nova", "Air", "Ultra"].includes(params.get("seri"))
    ? params.get("seri")
    : "Semua";
  let applied = { seri: selected, min: 0, max: Infinity, capacity: "", warranty: "" };
  let page = 1;
  const pageSize = 6;
  const chips = document.getElementById("series-filters");
  chips.innerHTML = ["Semua", "Apex", "Nova", "Air", "Ultra"]
    .map(
      (seri) => /* HTML */ `
        <button
          class="chip"
          type="button"
          data-series="${seri}"
          aria-pressed="${seri === selected}"
        >
          ${seri === "Semua"
            ? "Semua"
            : "VOLT " + seri + " (" + VOLT.products.filter((p) => p.seri === seri).length + ")"}
        </button>
      `,
    )
    .join("");
  const syncChips = () =>
    chips
      .querySelectorAll("button")
      .forEach((button) =>
        button.setAttribute("aria-pressed", String(button.dataset.series === selected)),
      );
  chips.addEventListener("click", (event) => {
    const button = event.target.closest("[data-series]");
    if (button) {
      selected = button.dataset.series;
      syncChips();
    }
  });
  const status = document.getElementById("filter-status");
  if (search) {
    status.hidden = false;
    status.textContent = `Hasil pencarian untuk “${search}”`;
  }
  const parsePrice = (value) => Number(value.replace(/[^\d]/g, ""));
  const filtered = () => {
    let products = VOLT.products.filter(
      (p) =>
        (applied.seri === "Semua" || p.seri === applied.seri) &&
        p.harga >= applied.min &&
        p.harga <= applied.max &&
        (!applied.capacity || p.ram_rom === applied.capacity) &&
        (!search ||
          (p.nama + " " + p.seri + " " + p.warna).toLowerCase().includes(search.toLowerCase())),
    );
    const sort = document.getElementById("catalog-sort").value;
    if (sort === "cheap") products.sort((a, b) => a.harga - b.harga);
    if (sort === "expensive") products.sort((a, b) => b.harga - a.harga);
    if (sort === "popular") products.sort((a, b) => b.terlaris - a.terlaris);
    return products;
  };
  const grid = document.getElementById("catalog-products");
  const render = () => {
    const products = filtered();
    const count = Math.max(1, Math.ceil(products.length / pageSize));
    page = Math.min(page, count);
    const visible = products.slice((page - 1) * pageSize, page * pageSize);
    grid.innerHTML = visible.length
      ? visible.map((product) => VOLT.productCard(product, { catalog: true })).join("")
      : /* HTML */ `
          <div class="panel empty-state">
            <h2>Belum ada produk yang cocok.</h2>
            <p>Coba rentang harga atau seri lainnya.</p>
            <button type="button" class="button secondary" data-reset>Reset filter</button>
          </div>
        `;
    document.getElementById("catalog-count").textContent =
      `${visible.length} dari ${products.length} koleksi`;
    document.getElementById("pagination").innerHTML = /* HTML */ `
      <button type="button" data-page="${page - 1}" ${page === 1 ? "disabled" : ""}>
        ← Sebelumnya
      </button>
      <div class="page-numbers">
        ${Array.from(
          { length: count },
          (_, index) => /* HTML */ `
            <button
              type="button"
              data-page="${index + 1}"
              ${page === index + 1 ? 'aria-current="page"' : ""}
              aria-label="Halaman ${index + 1}"
            >
              ${index + 1}
            </button>
          `,
        ).join("")}
      </div>
      <button type="button" data-page="${page + 1}" ${page === count ? "disabled" : ""}>
        Selanjutnya →
      </button>
    `;
  };
  const reset = () => {
    form.reset();
    selected = "Semua";
    applied = { seri: "Semua", min: 0, max: Infinity, capacity: "", warranty: "" };
    page = 1;
    syncChips();
    document.getElementById("price-error").textContent = "";
    render();
  };
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const min = parsePrice(form.elements.min.value);
    const max = form.elements.max.value.trim() ? parsePrice(form.elements.max.value) : Infinity;
    const error = min > max ? "Harga minimum tidak boleh melebihi harga maksimum." : "";
    document.getElementById("price-error").textContent = error;
    if (error) return;
    applied = {
      seri: selected,
      min,
      max,
      capacity: form.elements.capacity.value,
      warranty: form.elements.warranty.value,
    };
    page = 1;
    render();
  });
  document.addEventListener("click", (event) => {
    if (event.target.closest("[data-reset]")) reset();
  });
  document.getElementById("catalog-sort").addEventListener("change", () => {
    page = 1;
    render();
  });
  document.querySelectorAll("[data-view]").forEach((button) =>
    button.addEventListener("click", () => {
      grid.classList.toggle("is-list", button.dataset.view === "list");
      document
        .querySelectorAll("[data-view]")
        .forEach((other) => other.setAttribute("aria-pressed", String(other === button)));
    }),
  );
  document.getElementById("pagination").addEventListener("click", (event) => {
    const button = event.target.closest("[data-page]");
    if (!button || button.disabled) return;
    page = Number(button.dataset.page);
    render();
    document
      .querySelector(".catalog-toolbar")
      .scrollIntoView({ block: "start", behavior: "smooth" });
  });
  render();
  const detail = params.get("product");
  if (detail && VOLT.product(detail)) VOLT.detail(detail);
})();
