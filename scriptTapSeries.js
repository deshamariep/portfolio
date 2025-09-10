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

    const sections = document.querySelectorAll('.spaceBtwn');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          entry.target.classList.toggle('active', entry.isIntersecting);
        });
      }, {
        root: null,
        rootMargin: '-40% 0px -40% 0px',
        threshold: 0 
    });
    sections.forEach(section => observer.observe(section));

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