function setFooterYear() {
  const yearTarget = document.querySelector("#displayYear");
  if (yearTarget) {
    yearTarget.textContent = new Date().getFullYear();
  }
}

function setTheme(theme) {
  const safeTheme = theme === "light" ? "light" : "dark";
  const body = document.body;
  const toggle = document.querySelector(".theme-toggle");
  const toggleText = document.querySelector(".theme-toggle-text");
  const themeMeta = document.querySelector('meta[name="theme-color"]');

  body.setAttribute("data-theme", safeTheme);
  localStorage.setItem("jomcloud-theme", safeTheme);

  if (toggle) {
    const nextTheme = safeTheme === "dark" ? "light" : "dark";
    toggle.setAttribute("aria-label", `Switch to ${nextTheme} theme`);
  }

  if (toggleText) {
    toggleText.textContent = safeTheme === "dark" ? "Light" : "Dark";
  }

  if (themeMeta) {
    themeMeta.setAttribute("content", safeTheme === "dark" ? "#071013" : "#f6fbfa");
  }
}

function initTheme() {
  const savedTheme = localStorage.getItem("jomcloud-theme");
  const preferredTheme = window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
  setTheme(savedTheme || preferredTheme);

  const toggle = document.querySelector(".theme-toggle");
  if (toggle) {
    toggle.addEventListener("click", () => {
      const currentTheme = document.body.getAttribute("data-theme");
      setTheme(currentTheme === "dark" ? "light" : "dark");
    });
  }
}

function initNavigation() {
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelectorAll(".site-nav a");

  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      const isOpen = document.body.classList.toggle("nav-open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      document.body.classList.remove("nav-open");
      if (menuToggle) {
        menuToggle.setAttribute("aria-expanded", "false");
      }
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      document.body.classList.remove("nav-open");
      if (menuToggle) {
        menuToggle.setAttribute("aria-expanded", "false");
      }
    }
  });
}

function initSmoothAnchors() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
      const href = anchor.getAttribute("href");
      if (!href || href === "#") {
        return;
      }

      const target = document.querySelector(href);
      if (!target) {
        return;
      }

      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

function initContactForm() {
  const form = document.querySelector("#contactForm");
  const status = document.querySelector("#formStatus");

  if (!form) {
    return;
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const plan = String(formData.get("plan") || "").trim();
    const message = String(formData.get("message") || "").trim();

    const subject = encodeURIComponent(`JomCloud VPS enquiry from ${name || "website visitor"}`);
    const body = encodeURIComponent(
      [
        "Hi JomCloud,",
        "",
        `Name: ${name}`,
        `Email: ${email}`,
        `Interested plan: ${plan}`,
        "",
        "Message:",
        message
      ].join("\n")
    );

    if (status) {
      status.textContent = "Opening your email app with the message ready to send.";
    }

    window.location.href = `mailto:iddinishak@gmail.com?subject=${subject}&body=${body}`;
  });
}

document.addEventListener("DOMContentLoaded", () => {
  setFooterYear();
  initTheme();
  initNavigation();
  initSmoothAnchors();
  initContactForm();
});
