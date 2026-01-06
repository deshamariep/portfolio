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
        colors: ["#f967fb", "#53bc28", "#6958d5"],
        lights: {
          intensity: 200,
          colors: ["#83f36e", "#fe8a2e", "#ff008a", "#60aed5"]
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