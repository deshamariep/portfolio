(function(){
    'use strict';
    console.log("reading js");

    const sections = document.querySelectorAll('.spaceBtwn');
    // This creates a "trigger zone" between 25% and 75% of the viewport height
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          entry.target.classList.toggle('active', entry.isIntersecting);
        });
      }, {
        root: null,
        rootMargin: '-40% 0px -40% 0px', // Top -25%, Bottom -25% leaves center 50%
        threshold: 0 // Trigger as soon as any pixel enters this zone
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

    document.addEventListener('DOMContentLoaded', function() {
        const images = document.querySelectorAll('.popup-img');
        const overlay = document.createElement('div');
        overlay.className = 'overlay';
        document.body.appendChild(overlay);
    
        images.forEach(function(img) {
            img.addEventListener('click', function() {
                overlay.style.display = 'flex';
                img.classList.add('selected');
            });
    
            overlay.addEventListener('click', function() {
                overlay.style.display = 'none';
                img.classList.remove('selected');
            });
        });
    });
}());