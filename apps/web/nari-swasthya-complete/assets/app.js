// assets/app.js
// Keeps nav/footer injection compatibility + smooth anchors + active nav.
// (Index already fetches assets/partials.html; this complements it.) [Source](https://www.genspark.ai/api/files/s/27ozsO2j)

(function () {
  // Smooth anchor scrolling
  document.addEventListener("click", (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute("href");
    if (!id || id === "#") return;
    const el = document.querySelector(id);
    if (!el) return;
    e.preventDefault();
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  // Active nav highlighting (works after partials injection)
  const markActive = () => {
    const path = (location.pathname.split("/").pop() || "index.html").toLowerCase();
    document.querySelectorAll("nav a").forEach((a) => {
      const href = (a.getAttribute("href") || "").toLowerCase();
      a.classList.toggle("active", href === path);
    });
  };

  window.addEventListener("load", markActive);
  window.addEventListener("popstate", markActive);

  // If nav gets injected after load, re-run once.
  const obs = new MutationObserver(() => markActive());
  obs.observe(document.documentElement, { childList: true, subtree: true });
  setTimeout(() => obs.disconnect(), 4000);
})();
