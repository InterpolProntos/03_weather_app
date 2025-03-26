document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("darkModeToggle");

  const darkMode =
    localStorage.getItem("darkMode") ||
    (window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "enabled"
      : "disabled");

  document.body.classList.toggle("dark", darkMode === "enabled");
  toggle.checked = darkMode === "enabled";

  toggle.addEventListener("change", () => {
    const mode = toggle.checked ? "enabled" : "disabled";
    document.body.classList.toggle("dark", toggle.checked);
    localStorage.setItem("darkMode", mode);
  });
});
