"use strict";
(() => {
  VOLT.form = (form, rules, onValid) => {
    const show = (name, message) => {
      const input = form.elements[name];
      const error = document.getElementById(`${input.id}-error`);
      input.setAttribute("aria-invalid", String(!!message));
      if (error) error.textContent = message;
      return !message;
    };
    const check = (name) => show(name, rules[name](form.elements[name].value, form));
    const valid = () =>
      Object.keys(rules).every((name) => !rules[name](form.elements[name].value, form));
    const updateButton = () => {
      Array.from(form.elements)
        .filter((element) => element.matches("[data-require-valid],#pay-button"))
        .forEach((button) => (button.disabled = !valid()));
    };
    form.addEventListener("input", (event) => {
      const name = event.target.name;
      if (rules[name]) check(name);
      if (name === "password" && rules.confirm && form.elements.confirm.value) check("confirm");
      updateButton();
    });
    form.addEventListener("focusout", (event) => {
      if (rules[event.target.name]) check(event.target.name);
    });
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      let firstInvalid;
      Object.keys(rules).forEach((name) => {
        if (!check(name) && !firstInvalid) firstInvalid = form.elements[name];
      });
      if (firstInvalid) {
        firstInvalid.focus();
        return;
      }
      onValid(new FormData(form), form);
    });
    updateButton();
    return { valid, updateButton };
  };
  VOLT.validators = {
    email: (value) =>
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()) ? "" : "Masukkan alamat email yang valid.",
    password: (value) => (value.length >= 8 ? "" : "Kata sandi minimal 8 karakter."),
    name: (value) => (value.trim().length >= 2 ? "" : "Masukkan nama lengkap Anda."),
    phone: (value) =>
      /^(?:\+?62|0)8\d{7,11}$/.test(value.replace(/[\s()-]/g, ""))
        ? ""
        : "Masukkan nomor ponsel Indonesia yang valid.",
  };
  document.addEventListener("click", (event) => {
    const button = event.target.closest("[data-toggle-password]");
    if (!button) return;
    const input = document.getElementById(button.dataset.togglePassword);
    const show = input.type === "password";
    input.type = show ? "text" : "password";
    button.setAttribute("aria-label", show ? "Sembunyikan sandi" : "Tampilkan sandi");
    button.setAttribute("aria-pressed", String(show));
  });
})();
