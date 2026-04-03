document.addEventListener("DOMContentLoaded", () => {
  // ---- Sticky Header ----
  const header = document.getElementById("site-header");
  window.addEventListener("scroll", () => {
    header.classList.toggle("scrolled", window.scrollY > 60);
  });

  // ---- Scroll Reveal ----
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("visible");
      });
    },
    { threshold: 0.1 },
  );
  document
    .querySelectorAll(".reveal")
    .forEach((el) => revealObserver.observe(el));

  // ---- FAQ Accordion ----
  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach((item) => {
    item.querySelector(".faq-question").addEventListener("click", () => {
      const isOpen = item.classList.contains("open");
      faqItems.forEach((i) => i.classList.remove("open"));
      if (!isOpen) item.classList.add("open");
    });
  });

  // ---- Mobile Menu ----
  const hamburger = document.querySelector(".hamburger");
  const mobileNav = document.querySelector(".mobile-nav");
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("open");
    mobileNav.classList.toggle("open");
    document.body.classList.toggle("nav-open");
  });
  mobileNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("open");
      mobileNav.classList.remove("open");
      document.body.classList.remove("nav-open");
    });
  });

  // ---- Count-Up Animation ----
  const countUpObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = +el.getAttribute("data-target");
          let current = 0;
          const increment = target / 100;
          const updateCount = () => {
            current += increment;
            if (current < target) {
              el.innerText = Math.ceil(current);
              requestAnimationFrame(updateCount);
            } else {
              el.innerText = target;
            }
          };
          updateCount();
          observer.unobserve(el);
        }
      });
    },
    { threshold: 0.5 },
  );
  document
    .querySelectorAll(".stat-block__value[data-target]")
    .forEach((el) => countUpObserver.observe(el));
});
