(function(){
    'use strict';
    console.log("running js");

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
                    startStrokeAnimation(svg); // Start the stroke animation
                }
            });
        }
    
        function startStrokeAnimation(svg) {
            const circles = svg.querySelectorAll("circle");
            circles.forEach(circle => {
                const id = circle.id;
                if (id) {
                    circle.style.animationPlayState = "running";
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