// =====================================================
// DARK MODE TOGGLE
// Switches the [data-theme] attribute on <html> between
// "light" and "dark", and remembers the choice for next visit
// =====================================================
const root = document.documentElement;
const themeToggle = document.getElementById("theme-toggle");
const toggleIcon = themeToggle.querySelector(".toggle-icon");

// Load saved theme (if any) when the page opens
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  root.setAttribute("data-theme", "dark");
  toggleIcon.textContent = "☀️";
}

// Toggle theme on button click
themeToggle.addEventListener("click", () => {
  const isDark = root.getAttribute("data-theme") === "dark";

  if (isDark) {
    root.removeAttribute("data-theme");
    toggleIcon.textContent = "🌙";
    localStorage.setItem("theme", "light");
  } else {
    root.setAttribute("data-theme", "dark");
    toggleIcon.textContent = "☀️";
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