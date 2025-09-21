(function(){
    'use strict';
    console.log("reading js");

    let snapped = false;
    document.addEventListener("scroll", function () {
      // if user is at the very top, reset snapped
      if (window.scrollY === 0) {
        snapped = false;
      }
  
      // only snap if user starts at top and scrolls past 8px
      if (!snapped && window.scrollY > 8) {
        snapped = true;
        window.scrollTo({
        top: 800,
        behavior: "smooth"
        });
      }
    });

    document.addEventListener("DOMContentLoaded", () => {
      const faders = document.querySelectorAll(".spaceBtwn");
    
      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
            obs.unobserve(entry.target); // fade-in happens once
          }
        });
      }, { threshold: 0.4 }); // trigger when 20% visible
    
      faders.forEach(el => observer.observe(el));
    });

    document.addEventListener("DOMContentLoaded", () => {
        const footer = document.querySelector("footer");
        const footTitle = document.getElementById("footTitle");
    
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                footTitle.style.animationPlayState = "running";
              }
            });
          },
          { threshold: 0.2 } // you can adjust this
        );
    
        observer.observe(footer);
    });
}());