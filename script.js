// script.js - small interactions: mobile nav toggle and active link highlight

document.addEventListener("DOMContentLoaded", function () {
  // year in footer
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // mobile nav toggle
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");
  navToggle && navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("show");
  });

  // close mobile menu when link clicked
  document.querySelectorAll(".nav-link").forEach(a => {
    a.addEventListener("click", () => {
      navLinks.classList.remove("show");
    });
  });

  // active link on scroll
  const sections = document.querySelectorAll("main section[id]");
  const navLinksArr = document.querySelectorAll(".nav-link");

  function onScroll() {
    const pos = window.scrollY + (window.innerHeight * 0.35);
    sections.forEach(sec => {
      const rect = sec.getBoundingClientRect();
      const top = window.scrollY + rect.top;
      const bottom = top + sec.offsetHeight;
      const id = sec.id;
      if (pos >= top && pos < bottom) {
        navLinksArr.forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#" + id));
      }
    });
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // smooth internal linking (CSS also handles this, but ensure offset for sticky header if needed)
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href').slice(1);
      const target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        const headerOffset = 72; // adjust if your header height differs
        const elementPosition = target.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - headerOffset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      }
    });
  });
});