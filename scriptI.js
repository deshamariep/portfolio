(function(){
    'use strict';
    console.log("reading js");

    window.addEventListener('load', () => {
        const heroText = document.querySelector('.hero-heading-anim');
        heroText.style.opacity = 1;
        heroText.style.animation = 'gradientSwipe 10s ease-in-out forwards';
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