/* -------------------------
       Footer year
       ------------------------- */
document.getElementById("year").textContent = new Date().getFullYear();

/* -------------------------
       Sync header height to CSS var --nav-h
       ------------------------- */
(function syncNavHeight() {
  const header = document.querySelector("header");
  function apply() {
    if (!header) return;
    document.documentElement.style.setProperty(
      "--nav-h",
      header.offsetHeight + "px"
    );
  }
  window.addEventListener("load", apply);
  window.addEventListener("resize", apply);
  apply();
})();

/* -------------------------
       Mobile menu behaviour
       ------------------------- */
(function mobileMenu() {
  const toggle = document.querySelector(".menu-toggle");
  const mobileMenu = document.getElementById("mobileMenu");
  const mobileClose = document.getElementById("mobileClose");

  if (!toggle || !mobileMenu) return;

  function openMenu() {
    mobileMenu.hidden = false;
    mobileMenu.style.display = "flex";
    toggle.setAttribute("aria-expanded", "true");
    const first = mobileMenu.querySelector("a");
    if (first) first.focus();
  }
  function closeMenu() {
    mobileMenu.hidden = true;
    mobileMenu.style.display = "";
    toggle.setAttribute("aria-expanded", "false");
    toggle.focus();
  }

  toggle.addEventListener("click", () => {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    if (isOpen) closeMenu();
    else openMenu();
  });

  mobileClose && mobileClose.addEventListener("click", closeMenu);

  mobileMenu.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => setTimeout(closeMenu, 90));
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !mobileMenu.hidden) closeMenu();
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 720 && !mobileMenu.hidden) closeMenu();
  });
})();

/* -------------------------
       Reveal on scroll (IntersectionObserver)
       ------------------------- */
(function revealOnScroll() {
  const obsOptions = { root: null, rootMargin: "0px", threshold: 0.12 };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        entry.target.classList.add("fade-in-visible"); // legacy-safe
        entry.target.classList.add("is-visible"); // ensure portrait also picks up
        observer.unobserve(entry.target);
      }
    });
  }, obsOptions);

  // Observe visible elements
  document.querySelectorAll(".fade-in").forEach((el) => observer.observe(el));
  // portrait specific
  const p = document.getElementById("portraitWrap");
  if (p) observer.observe(p);
})();

