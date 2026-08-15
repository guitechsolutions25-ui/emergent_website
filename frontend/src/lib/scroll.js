export function scrollToSection(selector) {
  const el = document.querySelector(selector);
  if (!el) return;
  if (window.__lenis) {
    window.__lenis.scrollTo(el, { offset: -56, duration: 1.4 });
  } else {
    el.scrollIntoView({ behavior: "smooth" });
  }
}
