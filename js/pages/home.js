"use strict";
(() => {
  const featured = ["apex-pro", "nova-pro", "air", "ultra"].map(VOLT.product);
  const render = (sort) => {
    let products = [...featured];
    if (sort === "best") products.sort((a, b) => b.terlaris - a.terlaris);
    if (sort === "save") products.sort((a, b) => a.harga - b.harga);
    document.getElementById("featured-products").innerHTML = products
      .map((product) => VOLT.productCard(product))
      .join("");
  };
  render("new");
  const tabs = [...document.querySelectorAll("[data-sort]")];
  const select = (tab) => {
    tabs.forEach((other) => {
      other.setAttribute("aria-selected", String(other === tab));
      other.tabIndex = other === tab ? 0 : -1;
    });
    document.getElementById("featured-products").setAttribute("aria-labelledby", tab.id);
    render(tab.dataset.sort);
  };
  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => select(tab));
    tab.addEventListener("keydown", (event) => {
      if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
      event.preventDefault();
      const next =
        event.key === "Home"
          ? 0
          : event.key === "End"
            ? tabs.length - 1
            : (index + (event.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length;
      select(tabs[next]);
      tabs[next].focus();
    });
  });
})();
