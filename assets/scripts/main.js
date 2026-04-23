// Theme toggle functionality
const toggle = document.getElementById("theme-toggle");
const body = document.body;
const root = document.documentElement;
const icon = toggle ? toggle.querySelector(".toggle-circle i") : null;

function applyTheme(theme) {
  root.classList.remove("dark-mode", "light-mode");
  root.classList.add(theme === "dark" ? "dark-mode" : "light-mode");

  if (theme === "dark") {
    body.classList.add("dark-mode");
    body.classList.remove("light-mode");
    if (icon) {
      icon.classList.remove("fa-moon");
      icon.classList.add("fa-sun");
    }
  } else {
    body.classList.add("light-mode");
    body.classList.remove("dark-mode");
    if (icon) {
      icon.classList.remove("fa-sun");
      icon.classList.add("fa-moon");
    }
  }
}

const savedTheme = localStorage.getItem("portfolio-theme") || "light";
applyTheme(savedTheme);

if (toggle) {
  toggle.addEventListener("click", () => {
    const newTheme = body.classList.contains("dark-mode") ? "light" : "dark";
    applyTheme(newTheme);
    localStorage.setItem("portfolio-theme", newTheme);
  });
}

// Parallax accent layers for non-hero sections
const parallaxSections = document.querySelectorAll("section:not(.hero)");
parallaxSections.forEach((section, index) => {
  section.style.position = "relative";
  const layer = document.createElement("div");
  layer.className = "parallax-layer";
  layer.dataset.depth = (0.02 + index * 0.003).toFixed(3);
  section.appendChild(layer);
});

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;
  document.querySelectorAll(".parallax-layer").forEach((layer) => {
    const depth = parseFloat(layer.dataset.depth);
    layer.style.transform = `translate3d(0, ${scrollY * depth}px, 0)`;
  });
});

// Shared page-up button behavior for pages that include the control.
const pageUpBtn = document.getElementById("pageup-btn");

if (pageUpBtn) {
  window.addEventListener("scroll", () => {
    pageUpBtn.style.display = window.scrollY > 300 ? "flex" : "none";
  });

  pageUpBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}