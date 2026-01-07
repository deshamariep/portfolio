import TubesCursor from "https://cdn.jsdelivr.net/npm/threejs-components@0.0.19/build/cursors/tubes1.min.js";

const hero = document.getElementById("hero");
const canvas = document.getElementById("hero-cursor");

if (!hero || !canvas) {
  console.error("Hero or canvas not found");
}

// Set canvas size to hero
function resizeCanvas() {
  canvas.width = hero.offsetWidth;
  canvas.height = hero.offsetHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// Utility to generate random colors
function randomColors(count) {
  return Array.from({ length: count }, () =>
    `hsl(${Math.floor(Math.random() * 360)}, 80%, 65%)`
  );
}

// Initialize TubesCursor
const app = TubesCursor(canvas, {
  tubes: {
    colors: ["#6B5BFF", "#2FA4FF", "#9B6CFF"], // darker for white bg
    lights: {
      intensity: 90,
      colors: ["#C7D2FF", "#BEE7FF", "#E2CCFF", "#D9F3FF"]
    }
  }
});

// Optional: show cursor only on hover
hero.addEventListener("mouseenter", () => {
  canvas.style.opacity = "1";
});
hero.addEventListener("mouseleave", () => {
  canvas.style.opacity = "0";
});

// Optional: change colors on click
hero.addEventListener("click", () => {
  if (!app?.tubes) return;
  app.tubes.setColors(randomColors(3));
  app.tubes.setLightColors(randomColors(4));
});