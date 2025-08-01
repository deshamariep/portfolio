(function(){
    'use strict';
    console.log("reading js");

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

    document.addEventListener("DOMContentLoaded", function() {
        const waitElement = document.getElementById('wait');
        const segments = waitElement.querySelectorAll("div");
    
        const windowHeight = window.innerHeight;
        const offset = -75; // Adjust offset as needed
    
        function isElementInViewport(el) {
            const rect = el.getBoundingClientRect();
            return (
                rect.top >= offset &&
                rect.top <= windowHeight
            );
        }
    
        function handleScroll() {
            segments.forEach((segment, index) => {
                const svg = segment.querySelector("svg");
                if (isElementInViewport(segment)) {
                    svg.classList.add("animate");
                }
            });
        }
    
        window.addEventListener("scroll", handleScroll);
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