(function(){
    'use strict';
    console.log('running js');

    const sections = document.querySelectorAll('.spaceBtwn');
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
        const offset = 0; // Adjust offset as needed
    
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
        var pElement = document.querySelector('#center p');
        var text = pElement.textContent;
        var newText = text.replace(/(How might we)/, '<strong>$1</strong>');
        pElement.innerHTML = newText;
    });
    
    document.addEventListener("DOMContentLoaded", function () {

        const videos = document.querySelectorAll("video");

        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            const video = entry.target;
            if (entry.isIntersecting) {
              video.play();
            } else {
              video.pause();
            }
          });
        }, { threshold: 0.5 });
      
        videos.forEach((video) => {
          video.autoplay = false;
          video.pause();
          observer.observe(video);
        });
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