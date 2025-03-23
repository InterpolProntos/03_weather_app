const changeDarkMode = (toggle, checked) => {
  if (checked) {
    document.body.classList.add("dark");
    document.documentElement.style.setProperty("--bg-color", "#121212");
    document.documentElement.style.setProperty("--text-color", "#ffffff");
    localStorage.setItem("darkMode", "enabled");
    toggle.checked = true;
  } else {
    document.body.classList.remove("dark");
    document.documentElement.style.setProperty("--bg-color", "#ffffff");
    document.documentElement.style.setProperty("--text-color", "#000000");
    localStorage.setItem("darkMode", "disabled");
    toggle.checked = false;
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("darkModeToggle");
  let darkMode = localStorage.getItem("darkMode");

  if (!darkMode) {
    darkMode = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "enabled"
      : "disabled";
  }

  changeDarkMode(toggle, darkMode === "enabled");

  // Add event listener for dark mode toggle
  toggle.addEventListener("change", () => {
    changeDarkMode(toggle, toggle.checked);
  });
});
