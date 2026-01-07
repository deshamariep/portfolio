import TubesCursor from "https://cdn.jsdelivr.net/npm/threejs-components@0.0.19/build/cursors/tubes1.min.js";

const hero = document.getElementById("hero");
const canvas = document.getElementById("hero-cursor");

if (hero && canvas && window.innerWidth >= 1024) {

    function randomColors(count) {
      return Array.from({ length: count }, () =>
        `hsl(${Math.random() * 360}, 80%, 65%)`
      );
    }
  
    const app = TubesCursor(canvas, {
      tubes: {
        colors: ["#6B5BFF", "#2FA4FF", "#9B6CFF"],
        lights: {
            intensity: 90,
            colors: ["#C7D2FF", "#BEE7FF", "#E2CCFF", "#D9F3FF"]
        }
      }
    });
  
    hero.addEventListener("mouseenter", () => {
      canvas.style.opacity = "1";
    });
  
    hero.addEventListener("mouseleave", () => {
      canvas.style.opacity = "0";
    });
  
    hero.addEventListener("click", () => {
      app.tubes.setColors(randomColors(3));
      app.tubes.setLightColors(randomColors(4));
    });
  
}