// =====================================================
// SPLASH SCREEN
// =====================================================
document.body.classList.add("loading");

const splashScreen = document.getElementById("splash-screen");
const splashLogo = document.querySelector(".splash-logo");
const splashMoon = document.querySelector(".splash-moon");

window.addEventListener("load", () => {
  // Small delay so the loader is visible for at least a moment
  setTimeout(() => {
    // Find where the real header logo and toggle button sit
    const realLogo = document.querySelector(".logo");
    const realMoon = document.querySelector(".theme-toggle");

    const splashLogoRect = splashLogo.getBoundingClientRect();
    const splashMoonRect = splashMoon.getBoundingClientRect();
    const realLogoRect = realLogo.getBoundingClientRect();
    const realMoonRect = realMoon.getBoundingClientRect();

    // Calculate how far the splash logo/moon need to move
    // to land exactly on top of the real header versions
    const logoX = realLogoRect.left - splashLogoRect.left;
    const logoY = realLogoRect.top - splashLogoRect.top;
    const moonX = realMoonRect.left - splashMoonRect.left;
    const moonY = realMoonRect.top - splashMoonRect.top;

    splashLogo.style.transform = `translate(${logoX}px, ${logoY}px) scale(0.6)`;
    splashMoon.style.transform = `translate(${moonX}px, ${moonY}px) scale(0.6)`;
    splashMoon.classList.add("splash-moon-toggle");

    // Fade the whole splash overlay out
    splashScreen.classList.add("splash-exit");

    // Once the fade finishes, remove splash and unlock scrolling
    splashScreen.addEventListener("transitionend", () => {
      splashScreen.remove();
      document.body.classList.remove("loading");
    }, { once: true });

  }, 3000); // how long the loader stays visible before exiting
});

// =====================================================
// DARK MODE TOGGLE
// Switches the [data-theme] attribute on <html> between
// "light" and "dark", and remembers the choice for next visit
// =====================================================
const root = document.documentElement;
const themeToggle = document.getElementById("theme-toggle");
const toggleIcon = themeToggle.querySelector(".toggle-icon");
const toggleLabel = themeToggle.querySelector(".toggle-label");

// Load saved theme (if any) when the page opens
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  root.setAttribute("data-theme", "dark");
  toggleIcon.textContent = "☀️";
  toggleLabel.textContent = "LIGHT MODE";
}

// Toggle theme on button click
themeToggle.addEventListener("click", () => {
  const isDark = root.getAttribute("data-theme") === "dark";

  if (isDark) {
    root.removeAttribute("data-theme");
    toggleIcon.textContent = "🌙";
    toggleLabel.textContent = "DARK MODE";
    localStorage.setItem("theme", "light");
  } else {
    root.setAttribute("data-theme", "dark");
    toggleIcon.textContent = "☀️";
    toggleLabel.textContent = "LIGHT MODE";
    localStorage.setItem("theme", "dark");
  }
});

// =====================================================
// TYPING TEXT ANIMATION
// Types out the line under the hero name, then loops
// =====================================================
const typingTextEl = document.getElementById("typing-text");
const linesToType = [
  "3rd year college, BSIT student",
   "Aspiring System Analyst",
   "Aspiring IT Professional"
];

let lineIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeLoop() {
  const currentLine = linesToType[lineIndex];

  if (isDeleting) {
    charIndex--;
  } else {
    charIndex++;
  }

  typingTextEl.textContent = currentLine.substring(0, charIndex);

  let typingSpeed = isDeleting ? 40 : 80;

  // Finished typing the full line — pause, then start deleting
  if (!isDeleting && charIndex === currentLine.length) {
    typingSpeed = 1800;
    isDeleting = true;
  }
  // Finished deleting — move to the next line
  else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    lineIndex = (lineIndex + 1) % linesToType.length;
    typingSpeed = 400;
  }

  setTimeout(typeLoop, typingSpeed);
}

typeLoop();

// =====================================================
// SMOOTH SCROLL FOR NAV LINKS
// =====================================================
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', (e) => {
    const targetId = link.getAttribute('href');
    const target = document.querySelector(targetId);

    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// =====================================================
// SCROLL REVEAL ANIMATION
// Fades elements in as they enter the viewport
// =====================================================
const revealEls = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    } else {
      entry.target.classList.remove("visible"); // reset so it can replay
    }
  });
}, { threshold: 0.15 });

revealEls.forEach(el => revealObserver.observe(el));

// =====================================================
// ACTIVE NAV LINK ON SCROLL
// Highlights the nav link matching the section in view
// =====================================================
const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".nav-link");

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute("id");

      navLinks.forEach(link => {
        link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(section => navObserver.observe(section));