(function(){
    'use strict';
    console.log("reading js");


    document.addEventListener("DOMContentLoaded", function() {
        const segments = document.querySelectorAll(".data > div");
        const windowHeight = window.innerHeight;
        const offset = -1000; // Adjust offset as needed
    
        function isElementInViewport(el) {
            const rect = el.getBoundingClientRect();
            return (
                rect.top >= offset &&
                rect.bottom <= windowHeight
            );
        }
    
        function handleScroll() {
            segments.forEach((segment, index) => {
                const svg = segment.querySelector("svg");
                if (svg) { // Check if svg element exists before manipulating classList
                    if (isElementInViewport(segment)) {
                        svg.classList.add("animate");
                        window.removeEventListener("scroll", handleScroll);
                    }
                }
            });
        }
    
        window.addEventListener("scroll", handleScroll);
    });

    const topBG = document.getElementById('topBG');
    
    window.addEventListener('scroll', function() {
        // Calculate the scroll percentage
        const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;

        // Calculate the new background position
        const newBackgroundPosition = `center ${scrollPercentage}%`;

        // Set the background position dynamically
        topBG.style.backgroundPositionY = newBackgroundPosition;
    });
}());