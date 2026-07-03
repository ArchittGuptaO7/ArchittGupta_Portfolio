(function () {
  "use strict";

  /* ---------------------------------------------------------
     Footer year
  --------------------------------------------------------- */
  var footerCopy = document.getElementById("footer-copy");
  if (footerCopy) {
    footerCopy.textContent = "Copyright " + new Date().getFullYear() + " Architt Gupta. All rights reserved.";
  }

  /* ---------------------------------------------------------
     Navbar scrolled state
  --------------------------------------------------------- */
  var navbar = document.getElementById("navbar");
  function updateScrollState() {
    if (window.scrollY > 10) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  }
  updateScrollState();
  window.addEventListener("scroll", updateScrollState, { passive: true });

  /* ---------------------------------------------------------
     Mobile menu toggle
  --------------------------------------------------------- */
  var navToggle = document.getElementById("nav-toggle");
  var mobileMenu = document.getElementById("mobile-menu");

  function closeMenu() {
    navToggle.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
    mobileMenu.classList.remove("open");
  }

  navToggle.addEventListener("click", function () {
    var isOpen = mobileMenu.classList.toggle("open");
    navToggle.classList.toggle("open", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  Array.prototype.forEach.call(document.querySelectorAll(".mobile-link"), function (link) {
    link.addEventListener("click", closeMenu);
  });

  /* ---------------------------------------------------------
     Active section highlighting (mirrors useActiveSection hook)
  --------------------------------------------------------- */
  var navLinks = Array.prototype.slice.call(document.querySelectorAll(".nav-link"));
  var sectionIds = [
    "hero",
    "about",
    "skills",
    "projects",
    "experience",
    "education",
    "contact",
    "certifications",
    "coding-profiles",
    "resume"
  ];

  var sections = sectionIds
    .map(function (id) {
      return document.getElementById(id);
    })
    .filter(Boolean);

  function setActive(id) {
    navLinks.forEach(function (link) {
      link.classList.toggle("active", link.dataset.section === id);
    });
  }

  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: 0.01 }
    );
    sections.forEach(function (section) {
      observer.observe(section);
    });
  }

  /* ---------------------------------------------------------
     Scroll reveal for section headers and cards.
     Uses IntersectionObserver where available, with a manual
     scroll-position fallback/backstop so nothing gets stuck
     invisible regardless of scroll speed or browser quirks.
  --------------------------------------------------------- */
  var revealTargets = Array.prototype.slice.call(document.querySelectorAll(".reveal, .card"));

  function isNearViewport(el) {
    var rect = el.getBoundingClientRect();
    var vh = window.innerHeight || document.documentElement.clientHeight;
    return rect.top < vh * 0.92 && rect.bottom > 0;
  }

  function revealVisible() {
    revealTargets.forEach(function (el) {
      if (!el.classList.contains("in-view") && isNearViewport(el)) {
        el.classList.add("in-view");
      }
    });
  }

  if ("IntersectionObserver" in window) {
    var revealObserver = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px -5% 0px" }
    );
    revealTargets.forEach(function (el) {
      revealObserver.observe(el);
    });
  }

  // Backstop: catches anything the observer missed (fast scrolls,
  // programmatic jumps, edge cases) and runs once on load too.
  window.addEventListener("scroll", revealVisible, { passive: true });
  window.addEventListener("resize", revealVisible);
  revealVisible();

  /* ---------------------------------------------------------
     Hero stat bars: read --h custom property into height
  --------------------------------------------------------- */
  var bars = document.querySelectorAll("#signal-bars span");
  bars.forEach(function (bar, index) {
    var h = bar.style.getPropertyValue("--h");
    bar.style.height = h;
    bar.style.animationDelay = (0.25 + index * 0.06) + "s";
  });
})();
